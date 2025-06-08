export interface ISvgText {

    add( svgText: string, fontFamily?: string): Promise<void>;
    mesure(text:string, fontSize:number, fontStyle?:string, fontFamily?: string): {w:number, h:number}
}