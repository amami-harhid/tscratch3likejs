import type { ISpriteMotionPosition } from '../sprite/ISpriteMotionPosition';
import type { ITextSpriteMotionMove } from './ITextSpriteMotionMove';
import type { ISpriteMotionDirection} from '../sprite/ISpriteMotionDirection';
export interface ITextSpriteMotion {

    get Position(): ISpriteMotionPosition;

    get Direction(): ISpriteMotionDirection;
    
    get Move(): ITextSpriteMotionMove;

};