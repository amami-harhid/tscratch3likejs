import { Sprite } from '../sprite';
import { EntityEffect } from '../entity/entityEffect';
import type { ISprite } from '@Type/sprite/ISprite';
import type {ISpriteEffect} from '@Type/sprite/ISpriteEffect';

/** 効果 */
export class SpriteEffect extends EntityEffect implements ISpriteEffect {

    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:ISprite){
        super(entity);
    }

}