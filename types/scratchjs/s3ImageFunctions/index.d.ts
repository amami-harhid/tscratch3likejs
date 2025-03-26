/** 画像データ格納用オブジェクト */
export interface S3ImageFunctions {
    /** 画像追加 */
    add(image: any) : Promise<any>;
    /** イメージ名の配列 */
    names(): string[];
}
