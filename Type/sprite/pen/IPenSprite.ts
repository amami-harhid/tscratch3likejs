import { IPenSpriteSize } from './IPenSpriteSize';
import { IPenSpriteHSVColor } from './IPenSpriteHSVColor';
export interface IPenSprite {
    penClear(): void;

    penUp(): void;

    penDown(): void;

    isPenDown() : boolean;

    get HSVColor() : IPenSpriteHSVColor;

    stamp(): void;

    get Size(): IPenSpriteSize;
}