import type { ISprite } from "./ISprite";
/** 距離 */
export interface ISpriteSensingDistance {

    /**
     * マウスカーソルとの距離
     * @returns 
     */
    mousePointer(): number;
    /**
     * 他スプライトとの距離
     * @param otherSprite 
     * @returns 
     */
    to(otherSprite:ISprite) : number;
}
