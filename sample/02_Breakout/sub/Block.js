/**
 * ブロック（四角形)
 */
const w = 30;
const h = 20;
export const Block = function(color) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect x="0" y="0" rx="2" ry="2" width="${w}" height="${h}" fill="black" fill-opacity="0.2" />
    <rect x="1" y="1" rx="3" ry="3" width="${w-2}" height="${h-2}" fill="${color}" />
</svg>
`;
}
