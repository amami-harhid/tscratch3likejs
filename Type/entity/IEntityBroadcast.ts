/** メッセージ送受信 */
export interface IEntityBroadCast {

    /**
     * メッセージを送る
     * @param messageId - メッセージID
     * @param args - 引数
     * ```ts
     *  const count: number = 100;
     *  const mouseDown: boolean = false;
     *  this.Event.broadcast('Start', count, mouseDown );
     * ```
     */
    broadcast(messageId: string, ...args:unknown[]): void;

    /**
     * メッセージを送り終わるまで待つ
     * @param messageId - メッセージID
     * @param args - 引数
     * ```ts
     *  const count: number = 100;
     *  const mouseDown: boolean = false;
     *  await this.Event.broadcastAndWait('Start', count, mouseDown );
     * ```
     */
    broadcastAndWait(messageId: string, ...args:unknown[]): Promise<void>;

    /**
     * messageId を使い EventEmitter.on を宣言する
     * （他方からemitされたとき受け付け func を実行するため）
     * なお、本メソッドが呼び出される都度、funcを配列に蓄積し、
     * emitされたときは 蓄積したfuncをPromiseとして実行する。
     * 
     * @param messageId 
     * @param func 
     * ```ts
     *  stage.Event.whenBroadcastReceived('Start', 
     *                  async function(this:Stage, count:number, mouseDown:boolean ){
     *      console.log('count', count);
     *      console.log('mouseDown', mouseDown);
     *      // 5秒経過したあとに終了する
     *      await Lib.await(5); 
     *  });
     * ```
     */
    whenBroadcastReceived(messageId:string, func: CallableFunction): void;
}