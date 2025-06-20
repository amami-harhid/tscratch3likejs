import type { ISprite } from ".";
import type { ISpriteSensingDistance } from "./ISpriteSensingDistance";
import type { ISpriteDragMode } from "./ISpriteDragMode";
import type { IEntitySensing } from "@Type/entity/IEntitySensing";
/**
 * Sprite Sensing(調べる)
 */
export interface ISpriteSensing extends IEntitySensing{
 
    /**
     * 距離
     * 使用例：マウスポインターとの距離 
     * this.Sensing.Distance.mousePointer
     * 使用例：他スプライトとの距離
     * this.Sensing.Distance.to( otherSprite )
     */
    get Distance() : ISpriteSensingDistance;

     /**
     * 枠に触っていることの判定
     * @returns 
     */
    isTouchingEdge() : boolean;

    /**
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    isTouchingVirticalEdge() : boolean;

    /**
     * 水平方向の枠に触っていることを判定する
     */
    isTouchingHorizontalEdge(): boolean;

    isTouchingToSprites(sprites: ISprite[]): boolean;

    /**
     * マウスタッチしていないことの判定
     * @returns 
     */
    isNotMouseTouching() : boolean;

    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    isMouseTouching(): boolean;

    /**
     * 自分に触れているスプライトを配列にして返す
     * @param targets 
     * @returns 
     */
    getTouchingSprites() : ISprite[];

    /**
     * 指定した色に触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouchingToColor(target: string): boolean;

    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @param mask {string} - 色,先頭#,16進数
     * @returns 
     */
    colorIsTouchingToColor(target: string, mask: string): boolean;

    /**
     * Drag Mode
     */
    get DragMode() :ISpriteDragMode;
};