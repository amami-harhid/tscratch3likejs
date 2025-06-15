/** 階層 */
export interface ISpriteLayer {
 
    /**
     * 最前面にする
     */
    gotoFront() : void;
    /**
     * 最背面にする
     */
    gotoBack() : void;
    /**
     * 手前に出す
     * @param nLayer {number} - 階層数 
     */
    goForwardLayers(nLayer: number) : void;

    /**
     * 奥に下げる
     * @param nLayer {number} - 階層数
     */
    goBackwardLayers(nLayer: number) : void;

}