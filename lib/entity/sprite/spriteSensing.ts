import { Sprite } from '../sprite';
import type { ISprite } from '@Type/sprite';
import type { ISpriteSensing } from '@Type/sprite/ISpriteSensing';
import type { ISpriteDragMode } from '@Type/sprite/ISpriteDragMode';
/**
 * Sprite Sensing(調べる)
 */
export class SpriteSensing implements ISpriteSensing {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 質問をして答えを待つ
     * @param question {string} - 質問テキスト
     * @returns {Promise<string>} - answer
     */
    async askAndWait(question:string): Promise<string>{
        const answer = await this.entity.$askAndWait(question);
        return answer;
    }
    /**
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyDown(key: string) : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isKeyDown(key);
    }
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyNotDown(key: string) : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isKeyNotDown(key);
    }
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    isMouseDown() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isMouseDown();
    }
    /**
     * マウス情報
     */
    get Mouse() {
        return this.entity.Mouse;
    }
    /**
     * 距離
     * 使用例：マウスポインターとの距離 
     * this.Sensing.Distance.mousePointer
     * 使用例：他スプライトとの距離
     * this.Sensing.Distance.to( otherSprite )
     */
    get Distance() {
        return this.entity.Distance;
    }

    /**
     * タイマー値
     */
    get timer() {
        return this.entity.$timer;
    }
    /**
     * タイマーリセット
     */
    resetTimer() {
        this.entity.$resetTimer();
    }
    /**
     * 枠に触っていることの判定
     * @returns 
     */
    isTouchingEdge() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingEdge();
    }
    /**
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    isTouchingVirticalEdge() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingVirticalEdge();
    }
    /**
     * 水平方向の枠に触っていることを判定する
     */
    isTouchingHorizontalEdge(): boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingHorizontalEdge();
    }
    isTouchingToSprites(sprites: ISprite[]): boolean {
        if( this.entity.$isAlive() != true ) return false;
        const _sprites = sprites as unknown as Sprite[];
        return this.entity.$isTouchingTarget(_sprites);
    }
    /**
     * マウスタッチしていないことの判定
     * @returns 
     */
    isNotMouseTouching() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isNotMouseTouching();
    }
    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    isMouseTouching(): boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isMouseTouching();
    }
    /**
     * 自分に触れているスプライトを配列にして返す
     * @param targets 
     * @returns 
     */
    getTouchingSprites() : ISprite[] {
        if( this.entity.$isAlive() != true ) return [];
        const targets: Sprite[] = [this.entity];
        const entities = this.entity.$getTouchingTarget(targets);
        const touchings:Sprite[] = [];
        for(const entity of entities){
            touchings.push( entity as Sprite );
        }
        const _touchings = touchings as unknown as ISprite[];
        return _touchings;
    }
    /**
     * 指定した色に触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouchingToColor(target: string): boolean {
        if( this.entity.$isAlive() == true ){
            this.entity.update();
            return this.entity.$isTouchingColor(target);
        }
        return false;
    }
    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @param mask {string} - 色,先頭#,16進数
     * @returns 
     */
    colorIsTouchingToColor(target: string, mask: string):  boolean {
        if( this.entity.$isAlive() == true ){
            this.entity.update();
            return this.entity.$colorIsTouchingColor(target, mask);
        }
        return false;
    }
    /**
     * Drag Mode
     */
    get DragMode() :ISpriteDragMode{
        return this.entity.DragMode;
    }
};