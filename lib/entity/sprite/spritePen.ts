import { PenSprite } from '../pen/penSprite';
import type { IPenSprite } from '@Type/sprite/pen/IPenSprite';
import type { ISpritePen } from '@Type/sprite/ISpritePen';

/** 
 * SpritePen 
 */
export class SpritePen implements ISpritePen{

    private penSprite: PenSprite;
    private _isPenDown: boolean;
    private _isPenUp: boolean;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(penSprite: IPenSprite){
        this.penSprite = penSprite as unknown as PenSprite;
        this._isPenDown = false;
        this._isPenUp = false;
    }
    prepare(): void {
        this.penSprite.prepare();
    }
    dispose(): void {
        this.penSprite.dispose();
    }

    isPrepareDone(): boolean {
        return this.penSprite.isPrepareDone();
    }
    clear(): void {
        this.penSprite.penClear();
    }
    up(): void {
        if( this._isPenDown == true){
            this.penSprite.penUp();
        }
        this._isPenDown = false;
    }
    down(): void {
        if( this._isPenDown == false){
            this.penSprite.penDown();
        }
        this._isPenDown = true;
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
