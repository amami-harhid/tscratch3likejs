import { Sprite } from '../sprite';
import { PenSprite } from '../pen/penSprite';

/** サイズ */
export class SpritePen {

    private penSprite: PenSprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(penSprite: PenSprite){
        this.penSprite = penSprite;
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

}
