/** 画像データ格納用オブジェクト */
export interface S3ExtensionsFunctions {
    /** スピーチする */
    speech(words:string, properties:any, gender:string, locale:string): void;
    /** スピーチして終わるまで待つ */
    speechAndWait(words, properties:any, gender:string, locale:string) : Promise<any>;
    /** スピーチを全て停止する */
    speechStopAll(): void;
}
