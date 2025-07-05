import type {FPS} from './fps';
/**
 * Env
 */
export type TEnv = {
    /**
     * FPS
     */
    fps : FPS,
    /**
     * Trueのとき、スプライトのサイズに連動してBubbleの大きさが変わる（ ディフォルト値=false )
     * ```ts
     *  Env.bubbleScaleLinkedToSprite = true;
     * ```
     */
    bubbleScaleLinkedToSprite : boolean,
    /**
     * ウインドウサイズ
     */
    readonly WindowSize : {w: number, h: number},
    /**
     * ステージサイズ
     */
    readonly StageSize: {W: number, H:number},

    /**
     * モニター表示数（縦）
     */
    MonitorMaxRowSize: number,

};