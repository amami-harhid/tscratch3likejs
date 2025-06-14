/**
 * ブロック（四角形)
 */
const w = 30;
const h = 20;
export const Block = function(color) {
    console.log('Block', color);
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${color}" />
</svg>
`;
}
