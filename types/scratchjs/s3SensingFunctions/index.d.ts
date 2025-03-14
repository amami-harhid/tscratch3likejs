/** 調べる系メソッド */
export interface S3SensingFunctions {
    /** 質問をして待つ */
    askAndWait(question: string): Promise<any>;
    /** キーが押された */
    isKeyDown(key?:string) : boolean;
    /** マウス押された */
    isMouseDown(): boolean;
    /** マウスカーソルのＸ座標 */
    mouseX(): number;
    /** マウスカーソルのＹ座標 */
    mouseY(): number;
    /** タイマー値 */
    timer(): number;
    /** タイマーリセット */
    resetTimer(): void;
}
