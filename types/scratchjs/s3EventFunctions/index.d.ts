/** イベント系メソッド */
export interface S3EventFunctions {
    /** すぐに実行する */
    whenRightNow(func:CallableFunction) :void;
    /** 旗が押されたら実行する */
    whenFlag(func:CallableFunction) :void;
    /** 指定キーが押されたときに実行する */
    whenKeyPressed(key: string,  func:CallableFunction) : void;
    /** クリックされたときに実行する */
    whenClicked(func:CallableFunction) :void;
    /** 背景が切り替わったときに実行する */
    whenBackdropSwitches(backdropName:string, func:CallableFunction): void;
    /** メッセージを受け取ったときに実行する */
    whenBroadcastReceived(messageId:string, func:CallableFunction):void;
    /** メッセージを送る */
    broadcast(messageId:string, ...args?:any[]): void;
    /** メッセージを送って待つ */
    broadcastAndWait(messageId:string, ...args?:any[]): Promise<any>;
}
