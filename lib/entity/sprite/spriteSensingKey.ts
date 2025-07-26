import type { IEntitySensingKey } from '@Type/entity/IEntitySensingKey';
import { Sprite } from '../sprite';
/**
 * Sprite Sensing(調べる) Key
 */
export class SpriteSensingKey implements IEntitySensingKey {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }

    /**
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isDown(key: string) : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isKeyDown(key);
    }
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isNotDown(key: string) : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isKeyNotDown(key);
    }
};