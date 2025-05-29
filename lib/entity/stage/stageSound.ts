import { Stage } from '../stage';
import { EntitySound } from '../entity/entitySound';
/**
 * Stage Sound(サウンド)
 */
export class StageSound extends EntitySound {
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        super(entity);
        this.entity = entity;
    }
};