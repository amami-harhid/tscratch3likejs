/**
 * Sprite Control(制御)
 */
export interface IStageControl {
    /**
     * 指定秒数分、待つ。
     * @param sec - 秒数
     * 
     * ```ts
     *  // 5秒待つ
     *  await this.Control.wait(5);
     * ```
     */
    wait(sec: number): Promise<void>;
    /**
     * 条件が成立する迄、待つ。
     * ```ts
     *  const condition = ()=>{
     *      // マウスの押下を判定
     *      return Lib.mouseIsPressed() === true;
     *  };
     *  // マウスが押されるまで待つ
     *  await this.Control.waitUntil(condition);
     * 
     * ```
     * @param condition {CallableFunction} - 条件結果を返す関数
     */
    waitUntil(condition: CallableFunction): Promise<void>;
    /**
     * 条件が成立する間、待つ。
     * ```ts
     *  const condition = ()=>{
     *      // マウスの押下を判定
     *      return Lib.mouseIsPressed() === true;
     *  };
     *  // マウスが押されている間、待つ
     *  await this.Control.waitWhile(condition);
     * 
     * ```
     * @param condition {CallableFunction} - 条件結果を返す関数
     */
    waitWhile(condition: CallableFunction): Promise<void>;
    /**
     * 全てのスプライトの動作を停止する
     * ```ts
     *  // すべてを停止する
     *  this.Control.stopAll();
     * ```
     */
    stopAll() : void;
    /**
     * このスクリプトを停止する
     * @deprecated (推奨: break文)
     * ```ts
     *  // このスクリプトを停止する
     *  this.Control.stopThisScript();
     * ```
     */
    stopThisScript() : void;
    /**
     * このスプライトの他のスクリプトを停止する
     * ```ts
     *  // 同じスプライトの他のスクリプトを停止する
     *  this.Control.stopOtherScripts();
     * ```
     */
    stopOtherScripts() : void;

};