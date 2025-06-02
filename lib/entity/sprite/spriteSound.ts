import { Sprite } from '../sprite';
import { EntitySound } from '../entity/entitySound';
/**
 * Sprite Sound(サウンド)
 */
export class SpriteSound extends EntitySound {
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        super(entity);
        this.entity = entity;
    }
};