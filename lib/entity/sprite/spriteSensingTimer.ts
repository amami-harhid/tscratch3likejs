import { Sprite } from '../sprite';
import type { IEntitySensingTimer } from '@Type/entity/IEntitySensingTimer';
/**
 * Sprite Sensing(調べる) Timer
 */
export class SpriteSensingTimer implements IEntitySensingTimer {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * タイマー値
     */
    get timer() {
        return this.entity.$timer;
    }
    /**
     * タイマーリセット
     */
    reset() {
        this.entity.$resetTimer();
    }
};