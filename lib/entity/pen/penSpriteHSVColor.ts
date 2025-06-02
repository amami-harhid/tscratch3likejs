import { PenSprite } from './penSprite';
/**
 * PenSpriteHSVColor
 */
export class PenSpriteHSVColor {
    private sprite: PenSprite;
    /**
     * @constructor
     * @param sprite { PenSprite } 
     */
    constructor(sprite: PenSprite){
        this.sprite = sprite;
    }
    /**
     * 色相
     */
    get hue() : number {
        return this.sprite._penAttributes.color4f[0];
    }
    /**
     * 色相
     * @param hue {number} - 色相 [0 - 360]
     */
    set hue(hue: number) {
        this.sprite.setPenHue(hue);
    }
    /**
     * 彩度
     */
    get saturation() : number {
        return this.sprite._penAttributes.color4f[1];
    }
    /**
     * 彩度
     * @param saturation {number} - 彩度 [0 - 100]
     */
    set saturation(saturation: number) {
        this.sprite.setPenSaturation(saturation);
    }
    /**
     * 明度
     */
    get brightness() : number {
        return this.sprite._penAttributes.color4f[2];
    }
    /**
     * 明度
     * @param brightness {number} - 明度 [0 - 100]
     */
    set brightness(brightness: number) {
        this.sprite.setPenBrightness(brightness);
    }
    /**
     * 透明度
     */
    get transparency() : number {
        return this.sprite._penAttributes.color4f[3];
    }
    /**
     * 透明度
     * @param transparency {number} - 透明度 [0 - 100]
     */
    set transparency(transparency: number) {
        this.sprite.setPenTransparency(transparency);
    }
}