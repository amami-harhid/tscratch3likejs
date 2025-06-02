/**
 * PenSpriteHSVColor
 */
export interface IPenSpriteHSVColor {
    /**
     * 色相
     */
    get hue() : number;
    /**
     * 色相
     * @param hue {number} - 色相 [0 - 360]
     */
    set hue(hue: number);
    /**
     * 彩度
     */
    get saturation() : number;
    /**
     * 彩度
     * @param saturation {number} - 彩度 [0 - 100]
     */
    set saturation(saturation: number);
    /**
     * 明度
     */
    get brightness() : number;
    /**
     * 明度
     * @param brightness {number} - 明度 [0 - 100]
     */
    set brightness(brightness: number);
    /**
     * 透明度
     */
    get transparency() : number;
    /**
     * 透明度
     * @param transparency {number} - 透明度 [0 - 100]
     */
    set transparency(transparency: number);
}