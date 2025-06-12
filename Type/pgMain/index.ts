export declare interface IPgImage {
    /** ロード処理 */
    load(path:string, name:string, translate?:{x:number,y:number}): Promise<void>;
} 
export declare interface IPgSound {
    /** ロード処理 */
    load(path:string, name:string): Promise<void>;
} 
export declare interface IPgFont {
    /** ロード処理 */
    load(path:string, name:string): Promise<void>;
} 

/** PlayGround */
export interface IPgMain {
    /** タイトル */
    title: string;
    /** 事前ロード処理をするところ */
    preload?() : Promise<void>;
    /** 事前準備処理をするところ */
    prepare?() : Promise<void>;
    /** 動作セッティングをするところ */
    setting?() : Promise<void>;
    /** ﾄﾞﾛｰ処理 */
    draw?(): Promise<void>;
    /** イメージ処理 */
    Image: IPgImage;
    /** サウンド処理 */
    Sound: IPgSound;
    /** フォント処理 */
    Font: IPgFont;
}