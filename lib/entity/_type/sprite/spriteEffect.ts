import { Sprite } from '../sprite';
import { EntityEffect } from '../entity/entityEffect';
import { ImageEffective } from '../entityConstant';

/** 効果 */
export class SpriteEffect extends EntityEffect {

    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        super(entity);
    }

}