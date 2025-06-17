import { Sprite } from '../sprite';
import type { TPositionArray } from '@Type/common/typeCommon';
import type { ISpriteMotionPosition } from '@Type/sprite/ISpriteMotionPosition';

export class SpriteMotionPosition implements ISpriteMotionPosition {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    get x() : number {
        return this.entity.$_position.x;
    }
    get y() : number {
        return this.entity.$_position.y;
    }
    get xy() : {x:number, y:number} {
        const pos = this.entity.$_position;
        return {x: pos.x, y: pos.y };
    }
    set x(x: number) {
        this.entity.$setX(x)
    }
    set y(y: number) {
        this.entity.$setY(y)
    }
    set xy( xy: {x:number, y:number} | TPositionArray)  {
        if('x' in xy) {
            this.entity.$setXY(xy.x, xy.y);
        }else{
            this.entity.$setXY(xy[0], xy[1]);            
        }
    }

};