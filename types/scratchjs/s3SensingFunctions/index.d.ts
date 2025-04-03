/** 調べる系マウスメソッド */
declare interface S3SensingMouse {
    /** マウスＸ座標 */
    readonly x : number;
    /** マウスＹ座標 */
    readonly y : number;
}
/** 調べる系メソッド */
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
    Mouse : S3SensingMouse;
    /** タイマー値 */
    timer: number;
    /** タイマーリセット */
    resetTimer(): void;    
}
