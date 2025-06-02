import type { ISpriteMotionPosition } from './ISpriteMotionPosition';
import { ISpriteMotionMove } from './ISpriteMotionMove';
import { ISpriteMotionPoint } from './ISpriteMotionPoint';
import { ISpriteMotionDirection} from './ISpriteMotionDirection';
import { ISpriteMotionRotation } from './ISpriteMotionRotation';
export interface ISpriteMotion {

    get Position(): ISpriteMotionPosition;

    get Direction(): ISpriteMotionDirection;
    
    get Rotation() : ISpriteMotionRotation;

    get Move(): ISpriteMotionMove;

    get Point(): ISpriteMotionPoint;

};