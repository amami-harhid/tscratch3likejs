import { EntitySound } from '../entity/entitySound';
import { Sprite } from '../sprite';
import { ISpriteSound } from '@Type/sprite/ISpriteSound';
/**
 * Sprite Sound(サウンド)
 */
export class SpriteSound extends EntitySound implements ISpriteSound {
    protected entity : Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        super(entity);
        this.entity = entity;
    }
    /**
     * 音を追加する
     * @param soundName 
     */
    set( name: string ) : void {
        this.entity.$setSound(name);
    }
};