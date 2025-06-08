import { ISvgText } from '@Type/svgText/ISvgText';
import { Entity } from '../entity';
import { Sprite } from '../sprite';
import { Stage } from '../stage';
const SVG_NS = "http://www.w3.org/2000/svg";
export class SvgText implements ISvgText {
    private _entity : Entity;
    private _svgTextCreator:SvgTextCreator;
    constructor(entity: Entity) {
        this._entity = entity;
        this._svgTextCreator = SvgTextCreator.getInstance();

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
                    if(texts.length > 0)
                        svgTag.insertBefore(defs, texts[0]);
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
            console.log(svgText);
            await this.addImage(name, svgText);

        }else{
            const serializer = new XMLSerializer();
            const svgText = serializer.serializeToString(svgTag);
            console.log(svgText);
            await this.addImage(name, svgText);
        }
    }
    mesure(text:string, fontSize:number, fontStyle:string='normal', fontFamily?: string): {w:number, h:number}{
        console.log('fontStyle', fontStyle);
        return this._svgTextCreator.mesure(text, fontSize, fontStyle, fontFamily);
    }
}

class SvgTextCreator {
    private dummyCanvas : HTMLCanvasElement;
    //private dummyCtx: CanvasRenderingContext2D|null; 
    constructor() {
        this.dummyCanvas = document.createElement('canvas');
        //this.dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
    }
    mesure(text:string, fontSize:number, fontStyle:string='normal', fontFamily?: string): {w:number, h:number} {
        if(fontFamily){
            console.log('fontFamily', fontFamily);
            this.dummyCanvas.style.fontFamily = `${fontSize}px '${fontFamily}', sans-serif`;
        }
        const dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
        if(dummyCtx == null) throw 'Error';
        if(fontFamily){
            const font = `${fontStyle} ${fontSize}px '${fontFamily}',sans-serif`;
            console.log(font);
            dummyCtx.font = font;

        }else{
            const font = `${fontStyle} ${fontSize}px sans-serif`;
            console.log(font);
            dummyCtx.font = font;

        }
        console.log(this.dummyCanvas);
        console.log(dummyCtx);
        const mesure = dummyCtx.measureText(text);
        const width = mesure.width;
        const height = mesure.actualBoundingBoxAscent+mesure.actualBoundingBoxDescent 
        return {w:width, h: height};
    }

    static instance:SvgTextCreator;
    static getInstance(): SvgTextCreator {
        if(SvgTextCreator.instance == undefined){
            SvgTextCreator.instance = new SvgTextCreator();
        }
        return SvgTextCreator.instance;
    }

}