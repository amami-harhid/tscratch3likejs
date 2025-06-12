import type { ISpriteMotionPosition } from '../sprite/ISpriteMotionPosition';
import { ITextSpriteMotionMove } from './ITextSpriteMotionMove';
import { ISpriteMotionDirection} from '../sprite/ISpriteMotionDirection';
export interface ITextSpriteMotion {

    get Position(): ISpriteMotionPosition;

    get Direction(): ISpriteMotionDirection;
    
    get Move(): ITextSpriteMotionMove;

};