import type { IEntitySensingMouse } from "../entity/IEntitySensingMouse";
/**
 * Sprite Sensing(調べる)
 */
export interface ISpriteSensingMouse extends IEntitySensingMouse{

    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    readonly isTouching: boolean;

    // /**
    //  * マウスタッチしていないことの判定
    //  * @returns 
    //  */
    // readonly isNotTouching : boolean;

    /**
     * マウスカーソルまでの距離
     */
    readonly distance : number;
    /**
     * マウスカーソルへの向き
     */
    readonly degree: number;
};