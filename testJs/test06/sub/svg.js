export const Svg = function(textStr, fontSize, color, mesure, padding, fontFamily) {
    if( mesure.w ==0 || mesure.h == 0 ) {
        return `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
    <defs><style>
        svg {
            fill: red;
            stroke: red;
            transform-box:fill-box;
            transform-origin:center;
        }
        .top {
            background-color: rgba(250,0,0);
            width:100%;
            height:100%;
            text-align:center;
            justify-content: center;
            align-items: center;
            line-height:0;
            margin:0;
        }
        .error {
            color: white;
            width:50%;
            height:1em;
            font: ${fontSize}px sans-serif;
            margin:0;
        }
    </style></defs>
    <dummy/>
    <foreignObject x="0" y="${fontSize/2}" width="100%" height="100%">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <div class="top">
                <div><text class="error" x="0" y="0">ERROR</text></div>
            </div>
        </html>
    </foreignObject>
</svg> 
`;
    };
    const _textArr = [];
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const t of textStr) {
        const _t = t.split('<br/>');
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for(const __t of _t){
            _textArr.push(__t);
        }
    }
    const _mesure = {w: mesure.w+ padding*2, h: mesure.h * _textArr.length + padding*2};
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
    for(const text of _textArr){
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