import { SvgTextError } from './svgTextError';
/**
 * SVG テキスト
 * @param textArr - 文字列配列
 * @param fontSize 
 * @param color 
 * @param mesure 
 * @param padding 
 * @param fontFamily 
 * @returns 
 */
export const SvgTextCreator = function(textArr: string[], fontSize:number, color: string, mesure:{w:number, h:number}, padding:number, fontFamily:string): string {

    if( mesure.w ==0 || mesure.h == 0 ) {
        return SvgTextError();
    }

    const _mesure = {w: mesure.w+ padding*2, h: mesure.h * textArr.length + padding*2};
    const svg = `
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
            color: ${color};
            height:${_mesure.h};
            font: normal ${fontSize}px "${fontFamily}", sans-serif;
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
    for(const text of textArr){
        str +=`${text}<br/>`;
    }
    const svg2 = str.replace(/<br\/>$/, "").replaceAll('<br/>', '<span class="spacer"></span>');
    const svg3 =`
                </text>
            </div></div>
        </html>
    </foreignObject>
</svg>`;
    console.log(svg2);
    return svg+svg2+svg3;
}