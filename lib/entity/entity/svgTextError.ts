export const SvgTextError = function(textStr:string="Error", fontSize:number=15, mesure:{w:number,h:number}={w:200,h:50}, padding:number=0, fontFamily:string="sans-serif") {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${mesure.w+padding}" height="${mesure.h+padding}" viewBox="0 0 ${mesure.w+padding} ${mesure.h+padding}">
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
            font: ${fontSize}px ${fontFamily};
            margin:0;
        }
    </style></defs>
    <dummy/>
    <foreignObject x="0" y="${padding}" width="100%" height="100%">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <div class="top">
                <div><text class="${textStr}" x="0" y="0">ERROR</text></div>
            </div>
        </html>
    </foreignObject>
</svg> 
`;
}