import { Stage} from '../stage';
import { EntityEvent } from '../entity/entityEvent';
/**
 * Stage Event(イベント)
 */
export class StageEvent extends EntityEvent {
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        super(entity);
        this.entity = entity;
    }
};