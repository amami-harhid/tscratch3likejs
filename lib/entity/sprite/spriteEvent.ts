import { Sprite } from '../sprite';
import { EntityEvent } from '../entity/entityEvent';
/**
 * Sprite Event(イベント)
 */
export class SpriteEvent extends EntityEvent {
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        super(entity);
        this.entity = entity;
    }
};