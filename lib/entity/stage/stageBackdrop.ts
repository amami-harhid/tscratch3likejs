import { IStageBackdrop } from '@Type/stage/IStageBackdrop';
import { Stage } from '../stage';

/** サイズ */
export class StageBackdrop implements IStageBackdrop {

    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
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
        return this.entity.backdrops.currentSkinNo();
    }
    /**
     * 背景番号
     * ```ts
     *  // 背景番号
     *  this.Looks.Backdrop.no = 1;
     * ```
     */
    set no(no:number) {
        this.entity.$switchBackDrop(no);
    }
    /**
     * 背景名
     * ```ts
     *  // 背景名
     *  const name = this.Looks.Backdrop.name;
     * ```
     */
    get name(): string {
        return this.entity.backdrops.currentSkinName();
    }
    /**
     * 背景名
     * ```ts
     *  // 背景名
     *  this.Looks.Backdrop.name = "backdrop";
     * ```
     */
    set name(name:string) {
        this.entity.$switchBackDrop(name);
    }
    /**
     * 背景を切り替えて待つ
     * @param name 
     */
    async switchAndWait(name: string) : Promise<void>{
        await this.entity.$switchBackdropAndWait(name);
    }

    /**
     * 次の背景にする
     * ```ts
     *  this.Looks.Backdrop.nextBackdrop();
     * ```
     */
    next() : void {
        this.entity.$nextBackDrop();
    }
    /**
     * 次の背景にして待つ
     */
    async nextAndWait(): Promise<void> {
        await this.entity.$nextBackDropAndWait();
    }
    /**
     * 前の背景にする
     */
    previous() : void {
        this.entity.$prevBackdrop();
    }
    /**
     * 前の背景にして待つ。
     */
    async previousAndWait() : Promise<void> {
        await this.entity.$prevBackdropAndWait();
    }
    /**
     * どれかの背景にする
     */
    random(): void {
        this.entity.$randomBackdrop();
    }
    /**
     * どれかの背景にして待つ
     */
    async randomAndWait() : Promise<void>{
        await this.entity.$randomBackdropAndWait();
    }
}
