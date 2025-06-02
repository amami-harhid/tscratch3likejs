/** メッセージ送受信 */
export interface IEntityBroadCast {

    /**
     * メッセージを送る
     * @param messageId 
     * @param args 
     */
    broadcast(messageId: string, ...args:unknown[]): void;

    /**
     * メッセージを送り終わるまで待つ
     * @param messageId 
     * @param args 
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
     */
    whenBroadcastReceived(messageId:string, func: CallableFunction): void;
}