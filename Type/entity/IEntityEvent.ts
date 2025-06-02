import { IEntityBroadCast } from '../entity/IEntityBroadcast';
/** イベント */
export interface IEntityEvent extends IEntityBroadCast {

    /**
     * 旗が押されたときの動作を定義
     * @param func 
     * ```ts
     *  stage.whenFlag(async function(this:Stage){
     *      console.log('旗が押された');
     *  });
     * ```
     */
    whenFlag(func: CallableFunction) : void;

    /**
     * 指定したキーが押されたときの動作を定義
     * @param key 
     * @param func 
     * ```ts
     *  // スペースキーが押されたときの動作
     *  stage.whenKeyPressed(Lib.Keyboard.SPACE, async function(this:Stage){
     *      console.log('スペースキーが押された');
     *  });
     * ```
     */
    whenKeyPressed( key: string, func: CallableFunction ): void;

    /**
     * クリック（タッチ）されたときの動作を定義
     * @param func 
     * ```ts
     *  // クリックされたときの動作
     *  stage.whenClicked(async function(this:Stage){
     *      console.log('クリックされた');
     *  });
     * ```
     */
    whenClicked(func: CallableFunction): void;

    /**
     * 背景が切り替わったときの動作を定義
     * @param {*} backdropName 
     * @param {*} func 
     * ```ts
     *  // 背景がJurassicに切り替わったときの動作
     *  stage.whenBackdropSwitches('Jurassic', async function(this:Stage){
     *      console.log('背景がJurassicになった');
     *  });
     * ```
     */
    whenBackdropSwitches(backdropName: string, func: CallableFunction): void;
}