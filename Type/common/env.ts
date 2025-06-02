/**
 * Env
 */
export type TEnv = {
    /**
     * FPS Pace
     */
    readonly pace : number,
    /**
     * Bubbleスケールがスプライトにリンクする（ デフォはfalse )
     * 
     */
    bubbleScaleLinkedToSprite : boolean,
    /**
     * ウインドウサイズ
     */
    readonly WindowSize : {w: number, h: number},
};