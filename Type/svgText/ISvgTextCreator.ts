export interface ISvgTextCreator {
    /**
     * 文字の配列をSVG化する
     * @param textArr 
     * @param color 
     * @param fontSize 
     * @param fontStyle 
     * @param padding 
     * @param fontFamily 
     */
    toSvg( textArr: string[], color?: string, fontSize?: number, fontStyle?: string, padding?:number, fontFamily?:string): string;

}