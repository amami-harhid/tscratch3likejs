import { Stage} from '../stage';
import type { IStageSensing } from '@Type/stage/IStageSensing';
import type { IEntitySensingMouse } from '@Type/entity/IEntitySensingMouse';
import type { IEntitySensingKey } from '@Type/entity/IEntitySensingKey';
/**
 * Stage Sensing(調べる) Key
 */
export class StageSensingKey implements IEntitySensingKey {
    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        this.entity = entity;
    }

    /**
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isDown(key: string) : boolean {
        return this.entity.$isKeyDown(key);
    }
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isNotDown(key: string) : boolean {
        return this.entity.$isKeyNotDown(key);
    }

};