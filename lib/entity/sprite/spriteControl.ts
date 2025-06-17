import { Sprite } from '../sprite';
import type { TEntityOptions } from '@Type/entity/TEntityOptions';
import type { ISpriteControl } from '@Type/sprite/ISpriteControl';
/**
 * Sprite Control(制御)
 */
export class SpriteControl implements ISpriteControl {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 指定秒数分、待つ。
     * @param sec 
     */
    async wait(sec: number): Promise<void>{
        await this.entity.$waitSeconds(sec);
    }
    /**
     * 条件が成立する迄、待つ。
     * ```ts
     * const condition = ()=>{
     *  // マウスの押下を判定
     *  return Lib.mouseIsPressed() === true;
     * };
     * // マウスが押されるまで待つ
     * await this.Control.waitUntil(condition);
     * 
     * ```
     * @param condition {CallableFunction} - 条件結果を返す関数
     */
    async waitUntil(condition: CallableFunction): Promise<void> {
        await this.entity.$waitUntil(condition);
    }
    /**
     * 条件が成立する間、待つ。
     * ```ts
     * const condition = ()=>{
     *  // マウスの押下を判定
     *  return Lib.mouseIsPressed() === true;
     * };
     * // マウスが押されている間、待つ
     * await this.Control.waitWhile(condition);
     * 
     * ```
     * @param condition {CallableFunction} - 条件結果を返す関数
     */
    async waitWhile(condition: CallableFunction): Promise<void> {
        await this.entity.$waitWhile(condition);
    }
    /**
     * クローンを作る
     * @param options? {TEntityOptions} - オプション 
     */
    clone(options?:TEntityOptions): void{
        return this.entity.$clone(options);
    }
    /**
     * クローンを全て削除する
     */
    removeAllClones() : void {
        this.entity.$removeClones();
    }
    /**
     * クローンされたときの動作を定義する
     * @param func {CallableFunction} 動作を記述する関数
     */
    whenCloned(func: CallableFunction): void {
        this.entity.$whenCloned(func);
    }
    /**
     * 全てのスプライトの動作を停止する
     */
    stopAll() : void {
        this.entity.$stopAll();
    }
    /**
     * スプライトを抹消する
     */
    remove() : void {
        this.entity.$remove();
    }
    /**
     * 生存確認結果
     * @returns {boolean} - 生存確認結果
     */
    isAlive() : boolean {
        return this.entity.$isAlive();
    }
    /**
     * このスクリプトを停止する
     */
    stopThisScript() : void {
        this.entity.$stopThisScript();
    }
    /**
     * このスプライトの他のスクリプトを停止する
     */
    stopOtherScripts(proxy:Sprite) : void {
        const stopOtherScripts = this.entity.$stopOtherScripts.bind(proxy);
        stopOtherScripts();
    }

};