import { IPenSpriteSize } from './IPenSpriteSize';
import { IPenSpriteHSVColor } from './IPenSpriteHSVColor';
/**
 * PenSprite
 * @internal
 */
export interface IPenSprite {
    /**
     * ペン描画をクリアする
     */
    penClear(): void;

    penUp(): void;

    penDown(): void;

    isPenDown() : boolean;

    get HSVColor() : IPenSpriteHSVColor;

    stamp(): void;

    get Size(): IPenSpriteSize;
}