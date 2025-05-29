import { Sprite } from '../sprite';
import { RotationStyle } from '../rotationStyle';
import { SpriteMotionMove } from './spriteMotionMove';
import { SpriteMotionPoint } from './spriteMotionPoint';
import { SpriteMotionDirection} from './spriteMotionDirection';
import { SpriteMotionRotation } from './spriteMotionRotation';
export class SpriteMotion {
    private entity: Sprite;
    private move: SpriteMotionMove;
    private point: SpriteMotionPoint;
    private direction: SpriteMotionDirection;
    private rotation: SpriteMotionRotation;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
        this.move = new SpriteMotionMove(entity);
        this.point = new SpriteMotionPoint(entity);
        this.direction = new SpriteMotionDirection(entity);
        this.rotation = new SpriteMotionRotation(entity);
    }
    get Position(): {x:number, y:number, xy:{x:number,y:number}} {
        return this.entity.Position;
    }
    get Direction(): SpriteMotionDirection {
        return this.direction;
    }
    get Rotation() {
        return this.rotation;
    }
    get Move(): SpriteMotionMove {
        return this.move;
    }
    get Point(): SpriteMotionPoint {
        return this.point;
    }
};