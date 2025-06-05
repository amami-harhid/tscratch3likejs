import { ISpriteMotionDirection } from '@Type/sprite/ISpriteMotionDirection';
import { TextSprite } from './textSprite';

export class TextSpriteMotionDirection implements ISpriteMotionDirection {
    private entity: TextSprite;
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
        this.entity = entity;
    }
    /**
     * 向き
     * @returns {number} - 向き
     */
    get degree() : number {
        return this.entity.$getCurrentDirection();
    }
    /**
     * 向き
     * @param degree {number} - 向き
     */
    set degree(degree: number) {
        this.entity.$pointInDirection(degree);
    }
};