import type { ITextSpriteControl } from '@Type/text/ITextSpriteControl';
import { TextSprite } from './textSprite';
/**
 * TextSprite Control(制御)
 */
export class TextSpriteControl implements ITextSpriteControl {
    private entity: TextSprite;
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
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
     * 全てのスプライトの動作を停止する
     */
    stopAll() : void {
        this.entity.$stopAll();
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
    stopOtherScripts() : void {
        this.entity.$stopOtherScripts();
    }

};