declare interface PgImage {
    /** ロード処理 */
    load(path:string, name:string);
} 
declare interface PgSound {
    /** ロード処理 */
    load(path:string, name:string);
} 

/** PlayGround */
export interface PlayGround {
    /** タイトル */
    title: string;
    /** 事前ロード処理をするところ */
    preload(m:PlayGround) : Promise<void>;
    /** 事前準備処理をするところ */
    prepare(m:PlayGround) : Promise<void>;
    /** 動作セッティングをするところ */
    setting(m:PlayGround) : Promise<void>;
    /** イメージ処理 */
    Image: PgImage;
    /** サウンド処理 */
    Sound: PgSound;
}