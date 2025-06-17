/**
 * Entity Image(イメージ)
 */
export interface IEntityImage {
    /**
     * 画像を追加する
     * @param name 
     * ```ts
     *  // スプライトへ画像を追加
     *  // Cat01の名前の画像を追加する
     *  await sprite.Image.add('Cat01');
     * ```
     * ```ts
     *  // ステージへ画像を追加
     *  // Jurassicの名前の画像を追加する
     *  await stage.Image.add('Jurassic');
     * ```
     */
    add(name: string): void;
    /**
     * 追加されている画像名を配列で受け取る
     * ```ts
     *  // this がスプライトのとき
     *  const costumeNames = this.Image.names();
     *  console.log( costumeNames ); // --> ['Cat01','Cat02']
     * ```
     * ```ts
     *  // this がステージのとき
     *  const backdropNames = this.Image.names();
     *  console.log( backdropNames ); // --> ['Jurassic','Backdrops']
     * ```
     */
    names(): string[];
};