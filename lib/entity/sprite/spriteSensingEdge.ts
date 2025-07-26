import { Sprite } from '../sprite';
import type { ISprite } from '@Type/sprite';
import type { ISpriteSensing } from '@Type/sprite/ISpriteSensing';
import type { ISpriteDragMode } from '@Type/sprite/ISpriteDragMode';
import type { IEntitySensingTimer } from '@Type/entity/IEntitySensingTimer';
import { SpriteSensingTimer } from './spriteSensingTimer';
import type { ISpriteSensingMouse } from '@Type/sprite/ISpriteSensingMouse';
import { SpriteSensingMouse } from './spriteSensingMouse';
import type { ISpriteSensingDistance } from '@Type/sprite/ISpriteSensingDistance';
import type { IEntitySensingKey } from '@Type/entity/IEntitySensingKey';
import { SpriteSensingKey } from './spriteSensingKey';
import type { ISpriteSensingEdge } from '@Type/sprite/ISpriteSensingEdge';
/**
 * Sprite Sensing(調べる) Edge
 */
export class SpriteSensingEdge implements ISpriteSensingEdge {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 枠に触っていることの判定
     * @returns 
     */
    get isTouching() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingEdge();
    }
    /**
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    get isTouchingVirtical() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingVirticalEdge();
    }
    /**
     * 水平方向の枠に触っていることを判定する
     */
    get isTouchingHorizontal(): boolean {
        if( this.entity.$isAlive() != true ) return false;
        this.entity.update();
        return this.entity.$isTouchingHorizontalEdge();
    }
};