export interface ISvgText {

    add( svgText: string, fontFamily?: string): Promise<void>;
    mesure(texts:string[], fontSize:number, fontStyle?:string, fontFamily?: string): {w:number, h:number}
    toSvg(textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string;
}