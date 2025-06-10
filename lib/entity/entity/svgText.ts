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
        console.log('this._svgTextCreator', this._svgTextCreator);
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

    toSvg(textArr: string[], color?: string, fontSize?: number, fontStyle?: string, padding?:number, fontFamily?:string): string {
        console.log(this);
        return this._svgTextCreator.toSvg(textArr, color, fontSize, fontStyle, padding, fontFamily);
    }
}

class SvgTextMesure2 {
    private dummyCanvas : HTMLCanvasElement;
    //private dummyCtx: CanvasRenderingContext2D|null; 
    constructor() {
        this.dummyCanvas = document.createElement('canvas');
        //this.dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
    }
    mesure(texts:string[], fontSize:number, fontStyle:string='normal', fontFamily?: string): {w:number, h:number} {
        if(fontFamily){
            //console.log('fontFamily', fontFamily);
            this.dummyCanvas.style.fontFamily = `${fontSize}px '${fontFamily}', sans-serif`;
        }
        const dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
        if(dummyCtx == null) throw 'Error';
        if(fontFamily){
            const font = `${fontStyle} ${fontSize}px '${fontFamily}',sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }else{
            const font = `${fontStyle} ${fontSize}px sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }
        //console.log(this.dummyCanvas);
        //console.log(dummyCtx);
        if(texts.length > 0) {
            let maxLength = texts[0].length;
            let maxLengthStr: string = texts[0]; 
            for(let i=1 ; i<texts.length;i++) {
                const text = texts[i];
                const _length = text.length;
                if( maxLength < _length ) {
                    maxLength = _length;
                    maxLengthStr = text;
                }
            }
            const mesure = dummyCtx.measureText(maxLengthStr);
            const width = mesure.width;
            const height = mesure.actualBoundingBoxAscent+mesure.actualBoundingBoxDescent 
            return {w:width, h: height};
        }
        return {w:0, h: 0};
    }

    static instance:SvgTextMesure;
    static getInstance(): SvgTextMesure {
        if(SvgTextMesure.instance == undefined){
            SvgTextMesure.instance = new SvgTextMesure();
        }
        return SvgTextMesure.instance;
    }

}