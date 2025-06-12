import { PlayGround } from '../../playGround';
import { SvgTextError } from './svgTextError';
import { SvgTextMesure } from './svgTexMesure';
import type { ISvgTextCreator } from '@Type/svgText/ISvgTextCreator';
import { lineBreaker } from './svgTexUtil';
export class SvgTextCreator implements ISvgTextCreator {
    private static instance : SvgTextCreator;
    static getInstance() : SvgTextCreator {
        if( SvgTextCreator.instance == undefined ) {
            SvgTextCreator.instance = new SvgTextCreator();
        }
        //console.log('SvgTextCreator.instance',SvgTextCreator.instance);
        return SvgTextCreator.instance;
    }
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param color 
     * @param fontSize 
     * @param fontStyle 
     * @param fontFamily 
     */
    toSvg( textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string) : string {
        const svgStr = svgTextCreator(textArr, fontSize, fontStyle, color, fontFamily );
        return svgStr;
    }

}

/**
 * SVG テキスト
 * @param texts - 文字列配列
 * @param fontSize 
 * @param fontStyle
 * @param color 
 * @param fontFamily 
 * @returns 
 */
export const svgTextCreator = function(texts: string[], fontSize?:number, fontStyle?:string, color?: string, fontFamily?:string): string {
    const p = PlayGround.getInstance();
    const renderRate = p.Libs.renderRate;
    //console.log('renderRate', renderRate)
    const _fontSize = (fontSize)? fontSize: 12;
    //console.log('_fontSize', _fontSize);
    const _fontStyle = (fontStyle)? fontStyle: 'normal';        
    const mesurer = SvgTextMesure.getInstance();
    // 小さい文字のサイズを取得する
    const mesure_small = mesurer.mesure(['.'], _fontSize, _fontStyle, fontFamily);
    // 大きい文字のサイズを取得する
    const mesure_large = mesurer.mesure(['あ'], _fontSize, _fontStyle, fontFamily);
    const _rateH = mesure_large.h / mesure_small.h;
    const _rateW = mesure_large.w / mesure_small.w;
    //console.log('_rateH', _rateH, '_rateW', _rateW);
    const _texts = lineBreaker(texts);
    const mesure = mesurer.mesure(_texts, _fontSize, _fontStyle, fontFamily);
    //console.log('mesure', mesure);
    
    // 余白はフォントサイズぐらいがちょうど良さげ。
    const _padding = Math.ceil(_fontSize);
    const _color = (color)? color: '#000';
    if( mesure.w ==0 || mesure.h == 0 ) {
        return SvgTextError();
    }
    // console.log('mesure', mesure)
    // console.log('_texts.length ', _texts.length )
    // console.log( '_texts', _texts );
    // console.log( '_padding', _padding);
    // console.log( 'renderRate', renderRate);
    const _mesure = {w: (mesure.w*_rateW+ _padding*2)*renderRate.x, h: ((mesure.h*_rateH) * _texts.length + _padding*2)*renderRate.y};
    // console.log('_mesure', _mesure );

    let svg1 = `
<svg xmlns="http://www.w3.org/2000/svg" width="${_mesure.w}" height="${_mesure.h}" viewBox="0 0 ${_mesure.w} ${_mesure.h}">
    <defs><style>
        .top {
            position:absolute;
            width:100%;
            height:100%;
            padding:0;
            text-align:center;
            justify-content: center;
            align-items: center;
            line-height:0;
            display:table;
        }
        .subdiv {
            display: table-cell;
            vertical-align: middle;
            margin:0;
            line-height:0;
        }
        .text {
            border: none;
            display:block;
            color: ${_color};
            height:${_mesure.h};
            line-height:${_fontSize*_rateH}px;
            width: ${_mesure.w};
`;
            
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
            line-height:0;
        }
    </style></defs>
    <dummy/>
    <foreignObject x="0" y="0" width="${_mesure.w}" height="${_mesure.h}" transform="translate(0,0)">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <div class="top"><div class="subdiv">
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