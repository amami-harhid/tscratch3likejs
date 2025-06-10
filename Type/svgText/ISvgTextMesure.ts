
/**
 * 文字列の長さ、高さを取り出す
 */
export interface ISvgTextMesure {
    mesure(texts:string[], fontSize?:number, fontStyle?:string, fontFamily?: string): {w:number, h:number};
}