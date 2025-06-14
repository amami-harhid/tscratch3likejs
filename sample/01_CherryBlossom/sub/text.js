const color = 'red';
const fontSize = 24;
const fontStyle = 'normal';
export const addSvg = async function(entity, name, texts, fontFamily){
    const svg = entity.SvgText.toSvg(texts, fontSize, fontStyle, color, fontFamily);
    const add = await entity.SvgText.add(name, svg, fontFamily);
    return add;
}
