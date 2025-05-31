import type { ISpriteDragMode } from '@Type/sprite/ISpriteDragMode';
import { DragSprite } from '../drag/dragSprite';

/** サイズ */
export class SpriteDragMode implements ISpriteDragMode{

    private dragSprite: DragSprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(dragSprite: DragSprite){
        this.dragSprite = dragSprite;
    }
    get dragging() : boolean {
        return this.dragSprite.dragging;
    }

    get draggable() : boolean {
        return this.dragSprite.draggable;
    }

    set draggable(draggable: boolean) {
        this.dragSprite.draggable = draggable;
    }

}
