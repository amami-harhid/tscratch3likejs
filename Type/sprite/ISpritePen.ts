import { IPenSpriteSize } from '@Type/sprite/pen/IPenSpriteSize';
import { IPenSpriteHSVColor } from '@Type/sprite/pen/IPenSpriteHSVColor';
/** 
 * SpritePen 
 */
export interface ISpritePen {
    /**
     * ペン描画をクリアする
     */
    clear(): void;
    /**
     * ペンを上げる
     */
    up(): void;
    /**
     * ペンを下げる
     */
    down(): void;
    /**
     * スプライトをスタンプする
     */
    stamp(): void;
    /**
     * カラー(HSV)
     * ```ts
     *  this.Pen.HSVColor.hue = 120;
     * ```
     */
    get HSVColor(): IPenSpriteHSVColor;
    /**
     * ペンのサイズ
     */
    get Size() : IPenSpriteSize;

}
