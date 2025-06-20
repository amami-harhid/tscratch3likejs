import type { ISpriteMotionPosition } from './ISpriteMotionPosition';
import type { ISpriteMotionMove } from './ISpriteMotionMove';
import type { ISpriteMotionPoint } from './ISpriteMotionPoint';
import type { ISpriteMotionDirection} from './ISpriteMotionDirection';
import type { ISpriteMotionRotation } from './ISpriteMotionRotation';
export interface ISpriteMotion {

    get Position(): ISpriteMotionPosition;

    get Direction(): ISpriteMotionDirection;
    
    get Rotation() : ISpriteMotionRotation;

    get Move(): ISpriteMotionMove;

    get Point(): ISpriteMotionPoint;

};