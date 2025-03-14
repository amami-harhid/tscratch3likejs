/** イベント系メソッド */
export interface S3EventFunctions {
    /** すぐに実行する */
    whenRightNow(func:CallableFunction) :void;
    /** 旗が押されたら実行する */
    whenFlag(func:CallableFunction) :void;
    /** クリックされたときに実行する */
    whenClicked(func:CallableFunction) :void;
    /** メッセージを受け取ったときに実行する */
    whenBroadcastReceived(messageId:string, func:CallableFunction):void;
    /** メッセージを送る */
    broadcast(messageId:string, ...args?:any[]): void;
    /** メッセージを送って待つ */
    broadcastAndWait(messageId:string, ...args?:any[]): Promise<any>;
}
