/**
 * ブロック（四角形)
 */
const w = 30;
const h = 30;
const r = 15;
export const Ball = function(color) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <circle cx="${r}" cy="${r}" r="${r}" fill="${color}"/>
</svg>
`;
}
