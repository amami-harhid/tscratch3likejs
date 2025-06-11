import { Sprite } from '../sprite';
import type { ISpriteCostume } from '@Type/sprite/ISpriteCostume';

/** サイズ */
export class SpriteCostume implements ISpriteCostume {

    private entity: Sprite;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }

    get names() : string[] {
        if(this.entity.costumes){
            return this.entity.costumes.names;
        }
        return [];
    }

    /**
     * コスチューム番号
     * ```ts
     *  // コスチューム番号
     *  const no = this.Looks.Costume.no;
     * ```
     */
    get no(): number {
        if(this.entity.costumes){
            return this.entity.costumes.currentSkinNo();
        }
        return -1;
    }
    /**
     * コスチューム番号
     * ```ts
     *  // コスチューム番号
     *  this.Looks.Costume.no = 1;
     * ```
     */
    set no(no:number) {
        this.entity.$switchCostume(no);
    }
    /**
     * コスチューム名
     * ```ts
     *  // コスチューム名
     *  const name = this.Looks.Costume.name;
     * ```
     */
    get name(): string {
        if(this.entity.costumes){
            return this.entity.costumes.currentSkinName();
        }
        return "";
    }
    /**
     * コスチューム名
     * ```ts
     *  // コスチューム名
     *  this.Looks.Costume.name = "Cat01";
     * ```
     */
    set name(name:string) {
        this.entity.$switchCostume(name);
    }
    /**
     * 次のコスチュームにする
     * ```ts
     *  this.Looks.Costume.next();
     * ``
     */
    next(): void {
        this.entity.$nextCostume();
    }

}
