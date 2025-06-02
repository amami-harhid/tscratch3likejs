/**
 * Bubble
 */
export declare type BubbleProperties = {
    /** スケール */
    scale?: {w: number, h:number},
}

export type BubbleState = {
    drawableID : number,
    skinId: number,
    text : string,
    type : 'say'|'think',
    onSpriteRight : boolean,
    uid : string, // <--- 使用用途不明
}
