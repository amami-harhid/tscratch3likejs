export interface ISvgTextCreator {
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param fontSize 
     * @param fontStyle 
     * @param color 
     * @param fontFamily 
     */
    toSvg( textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string;

}