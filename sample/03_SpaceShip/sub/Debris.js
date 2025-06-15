/**
 * ブロック（四角形)
 */
const w = 50;
const h = 50;
export const Debris = function(color) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${color}" />
</svg>
`;
}
