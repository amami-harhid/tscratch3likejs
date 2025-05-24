/** 画像データ格納用オブジェクト */
export interface S3TextToSpeechFunctions {
    /** スピーチのプロパティをキー付で設定する */
    setSpeechProperties(type:string, properties:any, gender?:string, locale?:string): void;
    /** スピーチする */
    speech(words:string, type: string): void;
    /** スピーチして終わるまで待つ */
    speechAndWait(words:string, type: string) : Promise<any>;
    /** スピーチを全て停止する */
    speechStopAll(): void;
}
