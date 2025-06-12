import { PenSprite } from '../pen/penSprite';
import type { IPenSprite } from '@Type/sprite/pen/IPenSprite';
import type { ISpritePen } from '@Type/sprite/ISpritePen';

/** 
 * SpritePen 
 */
export class SpritePen implements ISpritePen{

    private penSprite: PenSprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(penSprite: IPenSprite){
        this.penSprite = penSprite as unknown as PenSprite;
    }
    prepare(): void {
        this.penSprite.prepare();
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
    stampStage(): void {
        this.penSprite.stampStage();
    }
    get HSVColor() {
        return this.penSprite.HSVColor;
    }
    get Size() {
        return this.penSprite.Size;
    }

}
