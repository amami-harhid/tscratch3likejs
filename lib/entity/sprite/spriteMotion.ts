import { Sprite } from '../sprite';
import { SpriteMotionMove } from './spriteMotionMove';
import { SpriteMotionPoint } from './spriteMotionPoint';
import { SpriteMotionDirection} from './spriteMotionDirection';
import { SpriteMotionRotation } from './spriteMotionRotation';
import { ISpriteMotion } from '@Type/sprite/ISpriteMotion';
import type { ISpriteMotionMove } from '@Type/sprite/ISpriteMotionMove';
import type { ISpriteMotionPoint } from '@Type/sprite/ISpriteMotionPoint';
import { ISpriteMotionPosition } from '@Type/sprite/ISpriteMotionPosition';
import { SpriteMotionPosition } from './spriteMotionPosition';
export class SpriteMotion implements ISpriteMotion {
    private entity: Sprite;
    private move: SpriteMotionMove;
    private point: SpriteMotionPoint;
    private position: SpriteMotionPosition;
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
        this.position = new SpriteMotionPosition(entity);
        this.direction = new SpriteMotionDirection(entity);
        this.rotation = new SpriteMotionRotation(entity);
    }
    get Position(): ISpriteMotionPosition {
        return this.position;
    }
    get Direction(): SpriteMotionDirection {
        return this.direction;
    }
    get Rotation() {
        return this.rotation;
    }
    get Move(): ISpriteMotionMove {
        return this.move;
    }
    get Point(): ISpriteMotionPoint {
        return this.point;
    }
};