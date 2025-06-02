import { Stage } from '../stage';
import { EntityEffect } from '../entity/entityEffect';
import { IStageEffect } from '@Type/stage/IStageEffect';

/** 効果 */
export class StageEffect extends EntityEffect implements IStageEffect{

    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        super(entity);
    }

}