export type TSvgOptionFont = {
    fontFamily: string,
    fontUrl: string[],
}
export type TSvgOption = {
    font?: TSvgOptionFont,
    fontStyle?: string,
    fontSize?: number,
    color?: string,
    
}
export interface ISvgTextCreator {
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param fontSize 
     * @param fontStyle 
     * @param color 
     * @param fontFamily 
     */
    toSvg2( textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string;
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param option 
     */
    toSvg( textArr: string[], option?: TSvgOption): string;

}