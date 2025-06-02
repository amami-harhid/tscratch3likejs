import { PenSprite } from './penSprite';
export class PenSpriteSize {
    private sprite: PenSprite;
    /**
     * @constructor
     * @param sprite { PenSprite } 
     */
    constructor(sprite: PenSprite){
        this.sprite = sprite;
    }
    /** 
     * ペンの太さ 
     */
    get thickness() : number {
        return this.sprite._penSize;
    }
    /**
     * ペンの太さ
     */
    set thickness(thickness: number) {
        this.sprite._penSize = thickness;
        this.sprite._penAttributes.diameter = thickness;
        this.sprite.convertAttribues2Rgb();
    }
}