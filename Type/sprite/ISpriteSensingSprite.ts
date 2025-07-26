import type { ISprite } from ".";
/**
 * Sprite Sensing(調べる)Sprite
 */
export interface ISpriteSensingSprite{
 
    /**
     * スプライトに触れていることを判定する
     * @param sprites 
     */
    isTouching(sprites: ISprite[]): boolean;

    /**
     * 自分に触れているスプライトを配列にして返す
     * @param targets 
     * @returns 
     */
    getTouching() : ISprite[];

    /**
     * 指定したスプライトまでの距離
     * @param to 
     */
    distance(to: ISprite): number;

    /**
     * 指定したスプライトへの向き
     * @param to
     */
    degree( to: ISprite ): number;

};