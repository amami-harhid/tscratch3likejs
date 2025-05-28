/** 制御処理 */
export interface S3ControlFunctions {
    /**
     * 指定した秒数分、待つ。
     * @param second {number}
     * ```ts
     * // 1秒待つ
     * await sprite.Control.wait(1);
     * ```
     */
    wait(second: number) : Promise<any>;
    /**
     * 条件が成立するまで待つ
     * @param condition 
     * ```ts
     * // スペースキーが押される迄待つ
     * await sprite.Control.waitUntil(Lib.keyIsDown(Lib.Keyboard.SPACE));
     * console.log('Spaceキーが押された');
     * ```
     */
    waitUntil(condition: Function) : Promise<any>;
    /**
     * 指定した条件が成立する間、待つ
     * @param condition 
     * ```ts
     * // スペースキーが押されている間、待つ
     * await sprite.Control.waitWhile(Lib.keyIsDown(Lib.Keyboard.SPACE));
     * console.log('Spaceキーが押されていない');
     * ```
     */
    waitWhile(condition: Function) : Promise<any>;
    /**
     * このスクリプトを止める
     * ```ts
     * sprite.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      this.Motion.moveSteps(10);
     *      if(Lib.keyIsDown(Lib.Keyboard.ESCAPE)) {
     *          this.Control.stopThisScript();
     *      }
     *      yield;
     *  }
     * });
     * ```
     * ```ts
     * // break でループを抜けることでも同じ。
     * sprite.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      this.Motion.moveSteps(10);
     *      if(Lib.keyIsDown(Lib.Keyboard.ESCAPE)) {
     *          break;
     *      }
     *      yield;
     *  }
     * });
     * ```
     */
    stopThisScript(): void;
    /**
     * このスプライトの他のスクリプトを止める。
     * ```ts
     * stage.whenFlag(async function*(this:Stage){
     *  for(;;) {
     *      // Chill を終わるまで鳴らす
     *      this.Sound.playUntilDone(Chill);
     *      yield;
     *  }
     * });
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      // 15度回転
     *      this.Motion.Direction.degree += 15;
     *      yield;
     *  }
     * });
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      if(Lib.keyIsDown(Lib.Keyboard.ESCAPE)) {
     *          break;
     *      }
     *      yield;
     *  }
     *  // スプライト(cat)の他のスクリプトを止める。
     *  // 「繰返して回転する」動きが止まるが、
     *  // ステージの音の繰返しは止まらない。
     *  this.Control.stopOtherScripts();
     * });
     * 
     * ```
     */
    stopOtherScripts(): void;
    /**
     * 全てを止める
     * ```ts
     * stage.whenFlag(async function*(this:Stage){
     *  for(;;) {
     *      // Chill を終わるまで鳴らす
     *      this.Sound.playUntilDone(Chill);
     *      yield;
     *  }
     * });
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      // 15度回転
     *      this.Motion.Direction.degree += 15;
     *      yield;
     *  }
     * });
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      if(Lib.keyIsDown(Lib.Keyboard.ESCAPE)) {
     *          break;
     *      }
     *      yield;
     *  }
     *  // 全てのスプライトのスクリプトを止める
     *  // スプライト(cat)の繰返して回転する動作が止まり、
     *  // ステージの繰返し音がなる動作も止まる。
     *  this.Control.stopAll();
     * });
     * ```
     */
    stopAll() : void;
}
