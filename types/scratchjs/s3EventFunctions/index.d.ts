/** イベント系メソッド */
export interface S3EventFunctions {
    /** 
     * 旗が押されたときの動作を定義
     * @param func {CallableFunction} - 実行する関数
     * ```ts
     * stage.Event.whenFlag(async function(this:Stage){
     *  console.log('旗が押された');
     * });
     * sprite.Event.whenFlag(async function(this:Sprite){
     *  console.log('旗が押された');
     * });
     * ``` 
     */
    whenFlag(func:CallableFunction) :void;
    /** 
     * 指定キーが押されたときに実行する
     * @param key {string} - 指定キー文字列
     * @param func {CallableFunction} - 実行する関数
     * ```ts
     *  stage.Event.whenKeyPressed(Lib.Keyboard.SPACE, async function(this:Stage){
     *      console.log('スペースキーが押された');
     *  });
     *  sprite.Event.whenKeyPressed(Lib.Keyboard.SPACE, async function(this:Sprite){
     *      console.log('スペースキーが押された');
     *  });
     * ``` 
     */
    whenKeyPressed(key: string,  func:CallableFunction) : void;
    /** 
     * クリックされたときに実行する 
     * @param func {CallableFunction} - 実行する関数
     * ```ts
     * stage.Event.whenClicked(async function(this:Stage){
     *  console.log('ステージが押された');
     * });
     * sprite.Event.whenClicked(async function(this:Sprite){
     *  console.log('このスプライトが押された');
     * });
     * ``` 
     */
    whenClicked(func:CallableFunction) :void;
    /** 
     * 背景が切り替わったときに実行する
     * @param backdropName {string} - 背景名
     * @param func {CallableFunction} - 実行する関数
     * ```ts
     * const backdropName = "BackdropName";
     * stage.Event.whenBackdropSwitches(backdropName, async function(this:Stage){
     *  console.log(`背景(${backdropName})に切り替わった`);
     * });
     * sprite.Event.whenBackdropSwitches(backdropName, async function(this:Sprite){
     *  console.log(`背景(${backdropName})に切り替わった`);
     * });
     * ``` 
     */
    whenBackdropSwitches(backdropName:string, func:CallableFunction): void;
    /** 
     * メッセージを受け取ったときに実行する 
     * @param messageId {string} - メッセージＩＤ
     * @param func {CallableFunction} - 実行する関数、受け取る引数を第二パラメータ以降に記述する
     * ```ts
     * const EventId = "message01";
     * stage.Event.whenBroadcastReceived(EventId, async function(this:Stage){
     *  console.log(`メッセージ(${EventId})を受け取った`);
     * });
     * sprite.Event.whenBroadcastReceived(EventId, async function(this:Sprite){
     *  console.log(`メッセージ(${EventId})を受け取った`);
     * });
     * ``` 
     */
    whenBroadcastReceived(messageId:string, func:CallableFunction):void;
    /** 
     * メッセージを送る 
     * @param messageId {string} - メッセージＩＤ
     * @param args {...any} - 渡す引数
     * ```ts
     *  const EventId01 = "message01";
     *  stage.Event.whenFlag(async function(this:Stage){
     *      this.Event.broadcast(EventId01);
     *  });
     *  const EventId02 = "message02";
     *  sprite.Event.whenBroadcastReceived(EventId01, async function*(this:Sprite){
     *      console.log(`メッセージ(${EventId})を受け取った`);
     *      let counter = 0;
     *      for(;;) {
     *          counter += 1;
     *          // 5秒待つ
     *          await this.Control.wait(5);
     *          // メッセージを送る（引数付）
     *          this.Event.broadcast(EventId02, counter);
     *          yield;
     *      }
     *  });
     *  // EventId02 を受け取る都度、実行される(引数を受け取る)
     *  stage.Event.whenBroadcastReceived(EventId02, async function(this:Stage, counter){
     *      console.log(`メッセージ(${EventId02})を受け取った`);
     *      console.log(`引数 counter(${counter})を受け取った`);
     *  });
     * ``` 
     */
    broadcast(messageId:string, ...args?:any[]): void;
    /** 
     * メッセージを送って待つ
     * @param messageId {string} - メッセージＩＤ
     * @param args {...any} - 渡す引数
     * ```ts
     *  const EventId = "message";
     *  stage.Event.whenFlag(async function(this:Stage){
     *      // message を受け取った処理が終わるまで待つ。
     *      await this.Event.broadcastAndWait(EventId);
     *  });
     *  sprite.Event.whenBroadcastReceived(EventId, async function*(this:Sprite){
     *      let counter = 0;
     *      for(;;) {
     *          counter += 1;
     *          // 5秒待つ
     *          await this.Control.wait(5);
     *          if(counter > 100) {
     *              break;
     *          }
     *          yield;
     *      }
     *      // 5秒×100 = 500秒経過したら終了する
     *  });
     */
    broadcastAndWait(messageId:string, ...args?:any[]): Promise<any>;
}
