import { IPenSpriteSize } from '@Type/sprite/pen/IPenSpriteSize';
import { IPenSpriteHSVColor } from '@Type/sprite/pen/IPenSpriteHSVColor';
/** SpritePen */
export interface ISpritePen {

    clear(): void;
    up(): void;
    down(): void;
    stamp(): void;
    get HSVColor(): IPenSpriteHSVColor;
    get Size() : IPenSpriteSize;

}
