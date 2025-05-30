/** サイズ */
export interface ISpriteSize {

    /**
     * 横サイズ
     * ```ts
     *  const width = this.Looks.Size.w;
     * ```
     */
    get w () : number;
    /**
     * 横サイズ
     * ```ts
     *  this.Looks.Size.w = 150; // 150%
     *  this.Looks.Size.w += 10; // 10ずつ増やす
     * ```
     */
    set w (width: number);
    /**
     * 縦サイズ
     * ```ts
     *  const height = this.Looks.Size.h;
     * ```
     */
    get h () : number;
    /**
     * 縦サイズ
     * ```ts
     *  this.Looks.Size.h = 150; // 150%
     *  this.Looks.Size.h += 10; // 10ずつ増やす
     * ```
     */
    set h (height: number);
    /**
     * 縦横サイズ
     * ```ts
     *  // 横150%, 縦100% にする
     *  const scale = this.Looks.Size.scale;
     *  console.log('横', scale.w);
     *  console.log('縦', scale.h);
     * ```
     */
    get scale() : {w:number,h:number};
    /**
     * 縦横サイズ
     * ```ts
     *  // 横150%, 縦100% にする
     *  this.Looks.Size.scale = {w:150, h:100};
     * ```
     * ```ts
     *  // 横10,縦20 ずつ増やす
     *  const scale = this.Looks.Size.scale;
     *  this.Looks.Size.scale = {w:scale.w +10, h:scale.h +20};
     * ```
     */
    set scale(scale:{w:number,h:number});

    /**
     * 自分自身の縦横表示サイズを得る
     * @returns dimensions {w: number, h: number}
     * ```ts
     *  // スプライトの表示サイズを得る
     *  const {w,h} = this.Looks.Size.drawingSize;
     * ```
     */
    get drawingSize() : {w: number, h: number};

}
