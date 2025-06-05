import { EntityEvent } from '../entity/entityEvent';
import { TextSprite } from './textSprite';
/**
 * Sprite Event(イベント)
 */
export class TextSpriteEvent extends EntityEvent {
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
        super(entity);
        this.entity = entity;
    }
};