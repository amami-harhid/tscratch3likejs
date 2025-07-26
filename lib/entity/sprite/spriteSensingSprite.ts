import { Sprite } from '../sprite';
import type { ISprite } from '@Type/sprite';
import type { ISpriteSensingSprite } from '@Type/sprite/ISpriteSensingSprite';
import type { ISpriteSensingDistance } from '@Type/sprite/ISpriteSensingDistance';
import { SpriteSensingDistance } from './spriteSensingDistance';
/**
 * Sprite Sensing(調べる) Sprite
 */
export class SpriteSensingSprite implements ISpriteSensingSprite {
    private entity: Sprite;
    private Distance: ISpriteSensingDistance;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
        this.Distance = new SpriteSensingDistance(entity);
    }
    isTouching(sprites: ISprite[]): boolean {
        if( this.entity.$isAlive() != true ) return false;
        const _sprites = sprites as unknown as Sprite[];
        return this.entity.$isTouchingTarget(_sprites);
    }
    /**
     * スプライトまでの距離
     * @param target 
     * @returns 
     */
    distance(target:ISprite) : number {
        return this.Distance.to(target)
    }
    /**
     * スプライトへの向き
     * @param target 
     */
    degree(target:ISprite): number {
        const _target:Sprite = target as unknown as Sprite;
        return this.entity.degreeToTarget(_target);
    }
    /**
     * 自分に触れているスプライトを配列にして返す
     * @param targets 
     * @returns 
     */
    getTouching() : ISprite[] {
        if( this.entity.$isAlive() != true ) return [];
        const targets: Sprite[] = [this.entity];
        const entities = this.entity.$getTouchingTarget(targets);
        const touchings:Sprite[] = [];
        for(const entity of entities){
            touchings.push( entity as Sprite );
        }
        const _touchings = touchings as unknown as ISprite[];
        return _touchings;
    }
};