export type TAddOption = {
    fontFamily?: string,
    fontStyle?: string,
    fontSize?: number,
    color?: string,
    
}
export interface ISvgText {
    /**
     * 文字列配列をSVG化して追加する
     * @param name 
     * @param text 
     * @param option 
     */
    addTexts( name: string, text: string[], option?:TAddOption): void;
    /**
     * 文字列配列をSVG化して画像を更新する
     * @param name 
     * @param text 
     * @param option 
     */
    replaceTexts( name: string, text: string[], option?:TAddOption): void;
    /**
     * SVG文字列を追加する
     * @param name 
     * @param svg 
     */
    add( name: string, svg: string): void;
    /**
     * 文字列配列の大きさを計測する
     * @param texts 
     * @param fontSize 
     * @param fontStyle 
     * @param fontFamily 
     */
    mesure(texts:string[], fontSize:number, fontStyle?:string, fontFamily?: string): {w:number, h:number}
    /**
     * 文字列配列をSVG化する
     * @param textArr 
     * @param fontSize 
     * @param fontStyle 
     * @param color 
     * @param fontFamily 
     */
    toSvg(textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string;
}

