import type { Hue, Saturation, Brightness, Transparency } from '../../common/hsv';
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
     * @param hue {Hue} - 色相 [0 - 360]
     */
    set hue(hue: Hue);
    /**
     * 彩度
     */
    get saturation() : number;
    /**
     * 彩度
     * @param saturation {number} - 彩度 [0 - 100]
     */
    set saturation(saturation: Saturation);
    /**
     * 明度
     */
    get brightness() : number;
    /**
     * 明度
     * @param brightness {Brightness} - 明度 [0 - 100]
     */
    set brightness(brightness: Brightness);
    /**
     * 透明度
     */
    get transparency() : number;
    /**
     * 透明度
     * @param transparency {Transparency} - 透明度 [0 - 100]
     */
    set transparency(transparency: Transparency);
}