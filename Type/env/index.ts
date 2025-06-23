/**
 * 動作環境
 */
export type IEnv = {
    /**
     * FPS値
     */
    fps: number,

        /**
     * 吹き出しサイズをスプライト側と連動させる
     */    
    bubbleScaleLinkedToSprite : boolean,
    /**
     * モニター表示数（縦）
     */
    MonitorMaxRowSize: number,
    /**
     * ウィンドウサイズ
     */
    readonly WindowSize : {w: number, h: number},

}