import { ISpriteMotionPosition } from '@Type/sprite/ISpriteMotionPosition';
import { TextSprite } from './textSprite';

export class TextSpriteMotionPosition implements ISpriteMotionPosition{
    private entity: TextSprite;
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
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
    set xy( xy: {x:number, y:number})  {
        this.entity.$setXY(xy.x, xy.y);
    }

};