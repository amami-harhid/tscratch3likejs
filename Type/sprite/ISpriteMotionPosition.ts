import { TPositionArray } from "../common/typeCommon";

/**
 * Sprite-Motion-Position
 */
export interface ISpriteMotionPosition {
    /** 
     * X座標 
     */
    get x() : number;
    /** 
     * Y座標 
     */
    get y() : number;
    /** 
     * XY座標 
     */
    get xy() : {x:number, y:number};
    /** 
     * X座標 
     */
    set x(x: number);
    /** 
     * Y座標 
     */
    set y(y: number);
    /** 
     * XY座標 
     */
    set xy( xy: {x?:number, y?:number}|TPositionArray);
};