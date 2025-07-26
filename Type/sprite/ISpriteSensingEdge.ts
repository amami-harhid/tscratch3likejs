/**
 * Sprite Sensing(調べる) Edge
 */
export interface ISpriteSensingEdge{
 
     /**
     * 枠に触っていることの判定
     * @returns 
     */
    readonly isTouching : boolean;

    /**
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    readonly isTouchingVirtical : boolean;

    /**
     * 水平方向の枠に触っていることを判定する
     */
    readonly isTouchingHorizontal: boolean;

};