import { Sprite } from '../sprite';
import { PenSprite } from '../pen/penSprite';
import type { ISpriteDragMode } from '@Type/sprite/ISpriteDragMode';
import { IPenSprite } from '@Type/sprite/pen/IPenSprite';

/** サイズ */
export class SpriteDragMode implements ISpriteDragMode{

    private penSprite: PenSprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(penSprite: IPenSprite){
        this.penSprite = penSprite as unknown as PenSprite;
    }
    clear(): void {
        this.penSprite.penClear();
    }
    up(): void {
        this.penSprite.penUp();
    }
    down(): void {
        this.penSprite.penDown();
    }
    stamp(): void {
        this.penSprite.stamp();
    }
    get HSVColor() {
        return this.penSprite.HSVColor;
    }
    get Size() {
        return this.penSprite.Size;
    }

    get dragging() : boolean {
        return this.dragging;
    }

    get draggable() : boolean {
        return this.draggable;
    }

    set draggable(draggable: boolean) {
        this.draggable = draggable;
    }

}
