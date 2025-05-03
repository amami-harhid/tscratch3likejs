import {S3Point} from "../s3Point";
declare interface S3Monitor {
    /** モニターＩＤ */
    monitorId: number;
    /** 位置 */
    position: {x: number, y: number};
    /** 大きさ */
    scale: {w:number, h:number};
    /** 変数の値(数値) */
    value: number;
    /** 変数の値(文字列) */
    text: string;
    /** 描画されている大きさ */
    getDrawingDimension(): {w:number, h:number};
    /** 表示する */
    show(): void;
    /** 隠す */
    hide(): void;
}
/** Monitors*/
export interface S3Monitors {
    /** コンストラクター */
    new(): S3Monitors;
    /** 名前をつけてモニターを追加 */
    add(monitorId:string, label:string): void;
    /** 
     * モニターＩＤでモニターを取得する
     * 存在しないときは例外発生。
     */
    get(monitorId:string): S3Monitor;
    /** 
     * モニターＩＤで指定するモニターを表示する
     * 存在しないときは例外発生。
     */
    show(monitorId:string): void;
    /** 
     * モニターＩＤで指定するモニターを隠す
     * 存在しないときは例外発生。
     */
    hide(monitorId:string): void;

}