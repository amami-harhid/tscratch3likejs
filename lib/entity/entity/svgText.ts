import { ISvgText } from '@Type/svgText/svgText';
import { Entity } from '../entity';
import { Sprite } from '../sprite';
import { Stage } from '../stage';
const SVG_NS = "http://www.w3.org/2000/svg";
export class SvgText implements ISvgText {
    private _entity : Entity;
    constructor(entity: Entity) {
        this._entity = entity;
    }
    private async addImage(name:string, image:string): Promise<void> {
        //console.log(image);
        if(this._entity instanceof Sprite) {
            const sprite = this._entity as Sprite;
            const costumes = sprite.costumes;
            await this._entity._addImage(name, image, costumes);
        }else if(this._entity instanceof Stage){
            const stage = this._entity as Stage;
            const backdrops = stage.backdrops;
            await this._entity._addImage(name, image, backdrops);
        }
    }
    async add(name: string, svgString: string, fontFamily?: string): Promise<void>{
        const parser = new DOMParser();
        const svgDom = parser.parseFromString(svgString, 'text/xml');
        if(svgDom.childNodes.length < 1 ||
            svgDom.documentElement.localName !== 'svg') {
            throw 'SVGではないですよ';
        }
        const svgTag = svgDom.documentElement;

        if(fontFamily){
            // font データを取得しておく
            const font = this._entity.getFontData(fontFamily);
            if(font){
                const defs = document.createElementNS(SVG_NS, "defs");
                const style =  document.createElementNS(SVG_NS, "style");
                const fontFace = `
@font-face {
    font-family: '${fontFamily}';
    src: url('${font}');
}
`;
                style.innerHTML = fontFace;
                defs.appendChild(style);
                svgTag.appendChild(defs);
                const texts = svgTag.getElementsByTagName('text');
                if(texts){
                    for(const text of texts){
                        const textFontFamily = text.getAttribute('font-family');
                        if(textFontFamily) {
                            text.setAttribute('font-family', `"${fontFamily}", ${textFontFamily}`);
                        }else{
                            text.setAttribute('font-family', `"${fontFamily}", sans-serif`);
                        }
                    }
                }
            }
            const serializer = new XMLSerializer();
            const svgText = serializer.serializeToString(svgTag);
            await this.addImage(name, svgText);

        }else{
            await this.addImage(name, svgString);
        }

    }

}