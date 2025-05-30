import { Sprite } from '../sprite';
import { ISpriteBackdrop } from '@Type/sprite/ISpriteBackdrop';
/** サイズ */
export class SpriteBackdrop implements ISpriteBackdrop {

    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 背景番号
     * ```ts
     *  // 背景番号
     *  const no = this.Looks.Backdrop.no;
     * ```
     */
    get no(): number {
        const backdrops = this.entity.$getBackdrops();
        return backdrops.currentSkinNo();
    }
    /**
     * 背景番号
     * ```ts
     *  // 背景番号
     *  this.Looks.Backdrop.no = 1;
     * ```
     */
    set no(no:number) {
        this.entity.$switchBackdrop(no);
    }
    /**
     * 背景名
     * ```ts
     *  // 背景名
     *  const name = this.Looks.Backdrop.name;
     * ```
     */
    get name(): string {
        const backdrops = this.entity.$getBackdrops();
        return backdrops.currentSkinName();
    }
    /**
     * 背景名
     * ```ts
     *  // 背景名
     *  this.Looks.Backdrop.name = "backdrop";
     * ```
     */
    set name(name:string) {
        this.entity.$switchBackdrop(name);
    }
    /**
     * 次の背景にする
     * ```ts
     *  this.Looks.Backdrop.nextBackdrop();
     * ```
     */
    nextBackdrop() : void {
        this.entity.$nextBackdrop();
    }
}
