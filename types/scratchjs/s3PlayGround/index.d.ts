declare interface S3PgImage {
    /** ロード処理 */
    load(path:string, name:string);
} 
declare interface S3PgSound {
    /** ロード処理 */
    load(path:string, name:string);
} 

declare interface S3StageControl {
    // 全て停止
    stopAll(): void;
}

/** PlayGround */
export interface S3PlayGround {
    /** タイトル */
    title: string;
    /** 事前ロード処理をするところ */
    preload(m:S3PlayGround) : void | Promise<any>;
    /** 事前準備処理をするところ */
    prepare(m:S3PlayGround) : void | Promise<any>;
    /** 動作セッティングをするところ */
    setting(m:S3PlayGround) : void | Promise<any>;
    /** イメージ処理 */
    Image: S3PgImage;
    /** サウンド処理 */
    Sound: S3PgSound;
    /** 制御処理 */
    Control: S3StageControl;
}