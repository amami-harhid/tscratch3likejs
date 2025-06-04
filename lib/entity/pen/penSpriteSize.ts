import { MathUtil } from '../../util/math-util';
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
        // Penサイズを範囲内にする
        const _thickness = MathUtil.clamp(thickness, 
                PenSpriteSize.PEN_SIZE_RANGE.min, 
                PenSpriteSize.PEN_SIZE_RANGE.max);

        this.sprite._penSize = _thickness;
        this.sprite._penAttributes.diameter = _thickness;
        this.sprite.convertAttribues2Rgb();
    }
    /** Pen Size Range */
    static get PEN_SIZE_RANGE() : {min:number, max:number}{
        return {min: 1, max: 1200};
    }
}
