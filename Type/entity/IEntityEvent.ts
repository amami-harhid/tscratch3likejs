import { IEntityBroadCast } from '../entity/IEntityBroadcast';
/** イベント */
export interface IEntityEvent extends IEntityBroadCast {

    /**
     * 旗が押されたときの動作を定義
     * @param func 
     */
    whenFlag(func: CallableFunction) : void;

    /**
     * 指定したキーが押されたときの動作を定義
     * @param key 
     * @param func 
     */
    whenKeyPressed( key: string, func: CallableFunction ): void;

    whenClicked(func: CallableFunction): void;

    /**
     * 背景が〇〇になったときの動作を定義
     * @param {*} backdropName 
     * @param {*} func 
     */
    whenBackdropSwitches(backdropName: string, func: CallableFunction): void;
}