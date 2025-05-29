import { Sprite } from '../sprite';

export class SpriteMotionDirection {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
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