import type { ISprite } from "./ISprite";
import type { ISpriteSensingDistance } from "./ISpriteSensingDistance";
import type { ISpriteDragMode } from "./ISpriteDragMode";
/**
 * Sprite Sensing(調べる)
 */
export interface ISpriteSensing {
    /**
     * 質問をして答えを待つ
     * @param question {string} - 質問テキスト
     * @returns {Promise<string>} - answer
     */
    askAndWait(question:string): Promise<string>;
    /**
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyDown(key: string) : boolean;
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyNotDown(key: string) : boolean;
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    isMouseDown() : boolean;
    /**
     * マウス情報
     */
    get Mouse() : {x:number, y:number};
    /**
     * 距離
     * 使用例：マウスポインターとの距離 
     * this.Sensing.Distance.mousePointer
     * 使用例：他スプライトとの距離
     * this.Sensing.Distance.to( otherSprite )
     */
    get Distance() : ISpriteSensingDistance;

    /**
     * タイマー値
     */
    get timer() : number;
    /**
     * タイマーリセット
     */
    resetTimer(): void;
    /**
     * 枠に触っていることの判定
     * @returns 
     */
    isTouchingEdge() : boolean;

    /**
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    isTouchingVirticalEdge() : boolean;

    /**
     * 水平方向の枠に触っていることを判定する
     */
    isTouchingHorizontalEdge(): boolean;

    isTouchingToSprites(sprites: ISprite[]): boolean;

    /**
     * マウスタッチしていないことの判定
     * @returns 
     */
    isNotMouseTouching() : boolean;

    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    isMouseTouching(): boolean;

    /**
     * 自分に触れているスプライトを配列にして返す
     * @param targets 
     * @returns 
     */
    getTouchingSprites() : ISprite[];

    /**
     * 指定した色に触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouchingToColor(target: string): Promise<boolean>;

    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @param mask {string} - 色,先頭#,16進数
     * @returns 
     */
    colorIsTouchingToColor(target: string, mask: string): Promise<boolean>;

    /**
     * Drag Mode
     */
    get DragMode() :ISpriteDragMode;
};