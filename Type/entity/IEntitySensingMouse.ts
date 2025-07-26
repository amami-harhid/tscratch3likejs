/**
 * Entity Sensing(調べる) Mouse
 */
export interface IEntitySensingMouse {
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    readonly isDown : boolean;
    /**
     * マウス情報( x座標 )
     */
    readonly x : number;
    /**
     * マウス情報( y座標 )
     */
    readonly y : number;

};