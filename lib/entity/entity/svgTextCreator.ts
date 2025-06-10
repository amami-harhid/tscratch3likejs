import { SvgTextError } from './svgTextError';
import { SvgTextMesure } from './svgTexMesure';
import type { ISvgTextCreator } from '@Type/svgText/ISvgTextCreator';
import { lineBeaker } from './svgTexUtil';
export class SvgTextCreator implements ISvgTextCreator {
    private static instance : SvgTextCreator;
    static getInstance() : SvgTextCreator {
        if( SvgTextCreator.instance == undefined ) {
            SvgTextCreator.instance = new SvgTextCreator();
        }
        console.log('SvgTextCreator.instance',SvgTextCreator.instance);
        return SvgTextCreator.instance;
    }
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param color 
     * @param fontSize 
     * @param fontStyle 
     * @param padding 
     * @param fontFamily 
     */
    toSvg( textArr: string[], color?: string, fontSize?: number, fontStyle?: string, padding?:number, fontFamily?:string) : string {
        const svgStr = svgTextCreator(textArr, fontSize, fontStyle, color, padding, fontFamily );
        return svgStr;
    }

}

/**
 * SVG テキスト
 * @param texts - 文字列配列
 * @param fontSize 
 * @param fontStyle
 * @param color 
 * @param padding 
 * @param fontFamily 
 * @returns 
 */
export const svgTextCreator = function(texts: string[], fontSize?:number, fontStyle?:string, color?: string, padding?:number, fontFamily?:string): string {

    const _texts = lineBeaker(texts);
    const mesurer = SvgTextMesure.getInstance();
    const mesure = mesurer.mesure(_texts, fontSize, fontStyle, fontFamily);

    const _fontSize = (fontSize)? fontSize: 12;
    const _fontStyle = (fontStyle)? fontStyle: 'normal';        
    const _padding = (padding)? padding: _fontSize; // デフォはフォントサイズがちょうどよい。
    const _color = (color)? color: '#000';
    if( mesure.w ==0 || mesure.h == 0 ) {
        return SvgTextError();
    }

    const _mesure = {w: mesure.w+ _padding*2, h: mesure.h * _texts.length + _padding*2};
    let svg1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${_mesure.w}" height="${_mesure.h}" viewBox="0 0 ${_mesure.w} ${_mesure.h}">
    <defs><style>
        svg {
            fill: red;
            stroke: black;
            transform-box:fill-box;
            transform-origin:center;
        }
        .top {
            width:100%;
            height:100%;
            padding:0;
            text-align:center;
            justify-content: center;
            align-items: center;
            line-height:0;
        }
        .top > div {
            position:absolute;
            padding:0;
            margin:0;
            width:100%;
        }
        .text {
            display:block;
            color: ${_color};
            height:${_mesure.h};`;
    if(fontFamily) {
        svg1 += ` 
            font: ${_fontStyle} ${_fontSize}px "${fontFamily}", sans-serif;
`;
    }else{
        svg1 += ` 
            font: ${_fontStyle} ${_fontSize}px sans-serif;
`;
    }
    const svg2 =`
            }
        .spacer {
            display: block;
            height: 0px;
        }
    </style></defs>
    <dummy/>
    <foreignObject x="0" y="0" width="100%" height="100%">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <div class="top"><div style="margin:0;">
                <text class="text" x="0" y="0">`;
    let str = '';
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const text of _texts){
        str +=`${text}<br/>`;
    }
    const svg3 = str.replace(/<br\/>$/, "").replaceAll('<br/>', '<span class="spacer"></span>');
    const svg4 =`
                </text>
            </div></div>
        </html>
    </foreignObject>
</svg>`;
    return svg1+svg2+svg3+svg4;
}