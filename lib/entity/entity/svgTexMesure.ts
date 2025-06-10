import { ISvgTextMesure } from "@Type/svgText/ISvgTextMesure";
import { lineBeaker } from "./svgTexUtil";

/**
 * 文字列の長さ、高さを取り出す
 */
export class SvgTextMesure implements ISvgTextMesure{
    private dummyCanvas : HTMLCanvasElement;
    constructor() {
        this.dummyCanvas = document.createElement('canvas');
    }
    /**
     * 文字列配列のうち最大文字列長の横幅、縦幅を測る
     * @param texts 
     * @param fontSize 
     * @param fontStyle 
     * @param fontFamily 
     * @returns 
     */
    mesure(texts:string[], fontSize?:number, fontStyle?:string, fontFamily?: string): {w:number, h:number} {
        const _texts = lineBeaker(texts);
        const _fontSize = (fontSize)? fontSize: 12;
        const _fontStyle = (fontStyle)? fontStyle: 'normal';        
        
        if(fontFamily){
            //console.log('fontFamily', fontFamily);
            this.dummyCanvas.style.fontFamily = `${_fontSize}px '${fontFamily}', sans-serif`;
        }
        
        const dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
        if(dummyCtx == null) throw 'Error';
        if(fontFamily){
            const font = `${_fontStyle} ${_fontSize}px '${fontFamily}',sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }else{
            const font = `${_fontStyle} ${_fontSize}px sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }
        //console.log(this.dummyCanvas);
        //console.log(dummyCtx);
        
        if(_texts.length > 0) {
            
            let maxLength = _texts[0].length;
            let maxLengthStr: string = _texts[0]; 
            for(let i=1 ; i<_texts.length;i++) {
                const text = _texts[i];
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