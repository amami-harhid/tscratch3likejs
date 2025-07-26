import { Sprite } from '../sprite';
import type { ISpriteSensingColor } from '@Type/sprite/ISpriteSensingColor';
/**
 * Sprite Sensing(調べる) Color
 */
export class SpriteSensingColor implements ISpriteSensingColor {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 指定した色に触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouching(target: string): boolean {
        if( this.entity.$isAlive() == true ){
            this.entity.update();
            return this.entity.$isTouchingColor(target);
        }
        return false;
    }
    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param mask {string} - 色,先頭#,16進数
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouchingBy(mask: string, target: string):  boolean {
        if( this.entity.$isAlive() == true ){
            this.entity.update();
            return this.entity.$colorIsTouchingColor(target, mask);
        }
        return false;
    }
};