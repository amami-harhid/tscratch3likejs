import type { IPenSpriteHSVColor } from './pen/IPenSpriteHSVColor';
import type { IPenSpriteSize } from './pen/IPenSpriteSize';
/** DragMode */
export interface ISpriteDragMode {

    clear(): void;

    up(): void;

    down(): void;

    stamp(): void;

    get HSVColor(): IPenSpriteHSVColor;

    get Size() : IPenSpriteSize;

    get dragging(): boolean;

    get draggable(): boolean;

    set draggable(draggable: boolean);
}
