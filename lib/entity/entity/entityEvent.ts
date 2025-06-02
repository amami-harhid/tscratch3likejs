import { Entity } from '../entity';
import { EntityBroadCast } from './entityBroadcast';
/** イベント */
export class EntityEvent extends EntityBroadCast{

    /**
     * @internal
     * @param entity {Entity}
     */
    constructor(entity:Entity){
        super(entity);
    }
    /**
     * 旗が押されたときの動作を定義
     * @param func 
     */
    whenFlag(func: CallableFunction) : void {
        this.entity.$whenFlag(func);
    }
    /**
     * 指定したキーが押されたときの動作を定義
     * @param key 
     * @param func 
     */
    whenKeyPressed( key: string, func: CallableFunction ): void {
        this.entity.$whenKeyPressed(key, func);
    }

    whenClicked(func: CallableFunction): void {
        this.entity.$whenClicked(func);
    }
    /**
     * 背景が〇〇になったときの動作を定義
     * @param {*} backdropName 
     * @param {*} func 
     */
    whenBackdropSwitches(backdropName: string, func: CallableFunction): void {
        this.entity.$whenBackdropSwitches(backdropName, func);
    }
}