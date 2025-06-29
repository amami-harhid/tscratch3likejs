import type { IEntitySensing } from "@Type/entity/IEntitySensing";
/**
 * Stage Sensing(調べる)
 */
export interface IStageSensing extends IEntitySensing {

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

}