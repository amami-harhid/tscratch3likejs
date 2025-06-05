/** 階層 */
export interface ITextSpriteLayer {
 
    /**
     * @internal
     * 最前面にする
     */
    gotoFront() : void;
    /**
     * @internal
     * 最背面にする
     */
    gotoBack() : void;
    /**
     * @internal
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