import { Sprite } from '../sprite';
import { SpriteMotionDirection} from '../sprite/spriteMotionDirection';
import { SpriteMotionRotation } from '../sprite/spriteMotionRotation';
import { ISpriteMotion } from '@Type/sprite/ISpriteMotion';
import type { ISpriteMotionMove } from '@Type/sprite/ISpriteMotionMove';
import type { ISpriteMotionPoint } from '@Type/sprite/ISpriteMotionPoint';
import { ISpriteMotionPosition } from '@Type/sprite/ISpriteMotionPosition';
import { TextSprite } from './textSprite';
import { TextSpriteMotionMove } from './textSpriteMotionMove';
import { TextSpriteMotionPosition } from './textSpriteMotionPosition';
import { TextSpriteMotionDirection } from './textSpriteMotionDirection';
import { ITextSpriteMotion } from '@Type/text/ITextSpriteMotion';
import { ITextSpriteMotionMove } from '@Type/text/ITextSpriteMotionMove';
import { ISpriteMotionDirection } from '@Type/sprite/ISpriteMotionDirection';
import { ISpriteMotionRotation } from '@Type/sprite/ISpriteMotionRotation';
export class TextSpriteMotion implements ITextSpriteMotion {
    private move: ITextSpriteMotionMove;
    private position: ISpriteMotionPosition;
    private direction: ISpriteMotionDirection;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:TextSprite){
        this.move = new TextSpriteMotionMove(entity);
        this.direction = new TextSpriteMotionDirection(entity);
        this.position = new TextSpriteMotionPosition(entity);
    }
    get Position(): ISpriteMotionPosition {
        return this.position;
    }
    get Direction(): ISpriteMotionDirection {
        return this.direction;
    }
    get Move(): ITextSpriteMotionMove {
        return this.move;
    }
};