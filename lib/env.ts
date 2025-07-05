import type { TEnv } from "@Type/common/env";
import type { FPS } from "../Type/common/fps";
const fps:FPS = 30;
export const Env: TEnv = {
    /**
     * FPS値
     */
    fps : fps,
    /**
     * 吹き出しサイズをスプライト側と連動させる
     */    
    bubbleScaleLinkedToSprite : false,
    /**
     * モニター表示数（縦）
     */
    MonitorMaxRowSize: 8,
    /**
     * ウィンドウサイズ
     */
    WindowSize : {w: innerWidth, h: innerHeight} as const,

    /**
     * ステージサイズ
     */
    StageSize : { W: 480, H: 360} as const,
};