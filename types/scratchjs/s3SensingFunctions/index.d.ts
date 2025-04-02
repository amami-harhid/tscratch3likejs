/** 調べる系メソッド */
declare interface S3Mouse {
    /** マウスＸ座標 */
    readonly x : number;
    /** マウスＹ座標 */
    readonly y : number;
}
export interface S3SensingFunctions {
    /** 質問をして待つ */
    askAndWait(question: string): Promise<string>;
    /**
     * キーが押された？
     * @param key キーの名前
     */
    isKeyDown(key?:string) : boolean;
    /** マウス押された */
    isMouseDown(): boolean;
    /** マウス */
    Mouse : S3Mouse;
    /** タイマー値 */
    timer: number;
    /** タイマーリセット */
    resetTimer(): void;    
}
