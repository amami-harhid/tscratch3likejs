/** 画像データ格納用オブジェクト */
export interface S3ImageFunctions {
    /** 画像追加 */
    add(image: any) : Promise<any>;
}
