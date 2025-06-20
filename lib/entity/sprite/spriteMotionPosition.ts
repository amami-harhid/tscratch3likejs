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
    set xy( xy: {x:number, y:number} | {} | TPositionArray)  {
        if(Array.isArray(xy)){
            this.entity.$setXY(xy[0], xy[1]);
        }else if('x' in xy && 'y' in xy && xy.x && xy.y){
            this.entity.$setXY(xy.x, xy.y);       
        }else if('x' in xy && xy.x){
            this.entity.$setXY(xy.x, 0);       
        }else if('y' in xy && xy.y){
            this.entity.$setXY(0, xy.y);       
        }else {
            this.entity.$setXY(0, 0);
        }
    }

};