import type { IPenSpriteSize } from './IPenSpriteSize';
import type { IPenSpriteHSVColor } from './IPenSpriteHSVColor';
/**
 * PenSprite
 * @internal
 */
export interface IPenSprite {

    /**
     * ペンを準備する
     */
    prepare(): void;

    /**
     * ペンを破棄する
     */
    dispose(): void;

    /**
     * ペン準備済
     */
    isPrepareDone(): boolean;

    /**
     * ペン描画をクリアする
     */
    penClear(): void;
    /**
     * ペンを上げる
     */
    penUp(): void;
    /**
     * ペンを下げる
     */
    penDown(): void;
    /**
     * ペンが下がっている判定
     */
    isPenDown() : boolean;

    /**
     * HSVカラー
     */
    readonly HSVColor : IPenSpriteHSVColor;

    /**
     * スタンプ
     */
    stamp(): void;
    /**
     * ステージをスタンプする
     */
    stampStage(): void;
    /**
     * サイズ
     */
    readonly Size: IPenSpriteSize;
}