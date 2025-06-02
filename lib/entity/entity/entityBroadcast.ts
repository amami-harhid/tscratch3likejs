import { Entity } from '../entity';

/** メッセージ送受信 */
export class EntityBroadCast {

    protected entity: Entity;
    /**
     * @internal
     * @param entity {Entity}
     */
    constructor(entity:Entity){
        this.entity = entity;
    }
    /**
     * メッセージを送る
     * @param messageId 
     * @param args 
     */
    broadcast(messageId: string, ...args:any[]) {
        this.entity.$broadcast(messageId, ...args);
    }
    /**
     * メッセージを送り終わるまで待つ
     * @param messageId 
     * @param args 
     */
    async broadcastAndWait(messageId: string, ...args:any[]): Promise<void>{
        await this.entity.$broadcastAndWait(messageId, ...args);
    }
    /**
     * messageId を使い EventEmitter.on を宣言する
     * （他方からemitされたとき受け付け func を実行するため）
     * なお、本メソッドが呼び出される都度、funcを配列に蓄積し、
     * emitされたときは 蓄積したfuncをPromiseとして実行する。
     * 
     * @param messageId 
     * @param func 
     */
    whenBroadcastReceived(messageId:string, func: CallableFunction): void {
        this.entity.$whenBroadcastReceived(messageId, func);
    }
}