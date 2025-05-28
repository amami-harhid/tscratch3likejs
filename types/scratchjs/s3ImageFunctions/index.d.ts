/** 画像データ格納用オブジェクト */
export interface S3ImageFunctions {
    /** 
     * 画像追加 
     * @param image {string} - イメージ名
     * ```ts
     *  const Cat = 'cat';
     *  this.Image.add( Cat );
     * ```
     */
    add(image: string) : Promise<any>;
    /** 
     * イメージ名の配列 
     * @returns {string[]} - addされたイメージ名の配列
     * ```ts
     *  const imageNames:string[] = this.Image.names();
     * ```
     */
    names(): string[];
}
