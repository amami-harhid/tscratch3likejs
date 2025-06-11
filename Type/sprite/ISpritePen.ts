import { IPenSpriteSize } from '@Type/sprite/pen/IPenSpriteSize';
import { IPenSpriteHSVColor } from '@Type/sprite/pen/IPenSpriteHSVColor';
/** 
 * SpritePen 
 */
export interface ISpritePen {
    /**
     * 準備する
     */
    prepare() : void;

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
     * ステージをスタンプする。
     */
    stampStage(): void;
    /**
     * カラー(HSV)
     * ```ts
     *  this.Pen.HSVColor.hue = 120;
     * ```
     */
    readonly HSVColor: IPenSpriteHSVColor;
    /**
     * ペンのサイズ
     */
    readonly Size : IPenSpriteSize;

}
