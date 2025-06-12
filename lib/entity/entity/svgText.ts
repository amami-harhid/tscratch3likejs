import { ISvgText } from '@Type/svgText/ISvgText';
import { Entity } from '../entity';
import { Sprite } from '../sprite';
import { Stage } from '../stage';
import { SvgTextError } from './svgTextError';
import { SvgTextCreator } from './svgTextCreator';
import { SvgTextMesure } from './svgTexMesure';
import type { ISvgTextCreator } from '@Type/svgText/ISvgTextCreator';
import type { ISvgTextMesure } from '@Type/svgText/ISvgTextMesure';

const SVG_NS = "http://www.w3.org/2000/svg";
export class SvgText implements ISvgText {
    private _entity : Entity;
    private _svgTextMesure: ISvgTextMesure;
    private _svgTextCreator: ISvgTextCreator;
    constructor(entity: Entity) {
        this._entity = entity;
        this._svgTextMesure = SvgTextMesure.getInstance();
        this._svgTextCreator = SvgTextCreator.getInstance();
        //console.log('this._svgTextCreator', this._svgTextCreator);
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
        let svgDom = parser.parseFromString(svgString, 'text/xml');
        if(svgDom.childNodes.length < 1 ||
            svgDom.documentElement.localName !== 'svg') {
            const svgTextError = SvgTextError();
            await this.addImage(name, svgTextError);
            return;
            //throw 'SVGではないですよ';
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
                const dummys = svgTag.getElementsByTagName('dummy');
                if(dummys && dummys.length > 0){
                    svgTag.insertBefore(defs, dummys[0]);
                    for(const dummy of dummys){
                        dummy.remove();
                    }
                }
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
            //console.log(svgText);
            await this.addImage(name, svgText);

        }else{
            const serializer = new XMLSerializer();
            const svgText = serializer.serializeToString(svgTag);
            //console.log(svgText);
            await this.addImage(name, svgText);
        }
    }
    mesure(texts:string[], fontSize?:number, fontStyle?:string, fontFamily?: string): {w:number, h:number}{
        //console.log('fontStyle', fontStyle);
        return this._svgTextMesure.mesure(texts, fontSize, fontStyle, fontFamily);
    }

    toSvg(textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string {
        //console.log(this);
        return this._svgTextCreator.toSvg(textArr, fontSize, fontStyle, color, fontFamily);
    }
}