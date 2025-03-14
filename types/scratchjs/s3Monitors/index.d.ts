declare interface S3Monitor {
    /** 表示する */
    show(): void;
    /** 隠す */
    hide(): void;
    /** モニターサイズ */
    size: {w: number, h:number};
    /** 位置を設定 */
    setPosition({x:number, y:number}):void;
    /** テキスト設定 */
    balloonText: string;
    /** モニターラベル設定 */
    label: string;
    /** 表示文字の最大長(デフォルト=5) */
    maxSize: number;
    /** 表示文字 */
    value: string;


}
/** Monitors*/
export interface S3Monitors {
    /** コンストラクター */
    new(): S3Monitors;
    /** 名前をつけてモニターを追加 */
    add(label:string, scale?:{w:number, h:number}): void;
    /** 
     * 名前でモニターを取得する
     * 存在しないときは例外発生。
     */
    get(label:string): S3Monitor;
    /** 表示位置を自動で整列する */
    automatic(): void;
}