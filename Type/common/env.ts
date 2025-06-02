/**
 * Env
 */
export type TEnv = {
    /**
     * FPS Pace
     */
    readonly pace : number,
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
};