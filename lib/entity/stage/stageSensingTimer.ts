import { Stage} from '../stage';
import type { IEntitySensingTimer } from '@Type/entity/IEntitySensingTimer';
/**
 * Stage Sensing(調べる) Timer
 */
export class StageSensingTimer implements IEntitySensingTimer {
    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
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