import { TextSprite } from './textSprite';

/** サイズ */
export class TextSpriteSize {

    private entity: TextSprite;
    private drawingDimension: {w: number, h: number};
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
        this.entity = entity;
        this.drawingDimension = {w:0, h:0};
    }
    /**
     * 横サイズ
     * ```ts
     *  const width = this.Looks.Size.w;
     * ```
     */
    get w () : number {
        const {w} = this.entity.$getCurrentSize();
        return w;
    }
    /**
     * 横サイズ
     * ```ts
     *  this.Looks.Size.w = 150; // 150%
     *  this.Looks.Size.w += 10; // 10ずつ増やす
     * ```
     */
    set w (width: number) {
        const {h} = this.entity.$getCurrentSize();
        this.entity.$setScale(width, h);
    }
    /**
     * 縦サイズ
     * ```ts
     *  const height = this.Looks.Size.h;
     * ```
     */
    get h () : number {
        const {h} = this.entity.$getCurrentSize();
        return h;
    }
    /**
     * 縦サイズ
     * ```ts
     *  this.Looks.Size.h = 150; // 150%
     *  this.Looks.Size.h += 10; // 10ずつ増やす
     * ```
     */
    set h (height: number) {
        const {w} = this.entity.$getCurrentSize();
        this.entity.$setScale(w, height);
    }
    /**
     * 縦横サイズ
     * ```ts
     *  // 横150%, 縦100% にする
     *  const scale = this.Looks.Size.scale;
     *  console.log('横', scale.w);
     *  console.log('縦', scale.h);
     * ```
     */
    get scale() : {w:number,h:number} {
        const {w, h} = this.entity.$getCurrentSize();
        return {w:w,h:h};
    }
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
    set scale(scale:{w:number,h:number}) {
        this.entity.$setScale(scale.w, scale.h);
    }

    /**
     * 自分自身の縦横表示サイズを得る
     * @returns dimensions {w: number, h: number}
     * ```ts
     *  // スプライトの表示サイズを得る
     *  const {w,h} = this.Looks.Size.drawingSize;
     * ```
     */
    get drawingSize() : {w: number, h: number}{
        return this.entity.$getDrawingDimensions();
    }

}
