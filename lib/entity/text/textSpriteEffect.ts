import { Sprite } from '../sprite';
import { EntityEffect } from '../entity/entityEffect';
import type {ISpriteEffect} from '@Type/sprite/ISpriteEffect';
import { TextSprite } from './textSprite';
import { IEntity } from '@Type/entity/IEntity';

/** 効果 */
export class TextSpriteEffect extends EntityEffect implements ISpriteEffect {

    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:TextSprite){
        const _entity:IEntity = entity as unknown as IEntity;
        super(_entity);
    }

}