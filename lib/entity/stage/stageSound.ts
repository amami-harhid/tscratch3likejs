import { Stage } from '../stage';
import { EntitySound } from '../entity/entitySound';
import { IStageSound } from '@Type/stage/IStageSound';
/**
 * Stage Sound(サウンド)
 */
export class StageSound extends EntitySound implements IStageSound {

    protected entity: Stage;

    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        super(entity);
        this.entity = entity;
    }

    set(name:string) : void {
        this.entity.$setSound(name);
    }
};