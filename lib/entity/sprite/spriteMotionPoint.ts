import { Sprite } from '../sprite';
import { ISprite } from '@Type/sprite';
import { ISpriteMotionPoint } from '@Type/sprite/ISpriteMotionPoint';
export class SpriteMotionPoint implements ISpriteMotionPoint{
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * マウスカーソルへ向く
     */
    toMouse(): void {
        this.entity.$pointToMouse();
    }
    /**
     * ターゲットの位置へ向く
     * @param target {Sprite} - ターゲット
     */
    toTarget(target: ISprite): void {
        const _target : Sprite = target as unknown as Sprite;
        this.entity.$pointToTarget(_target);
    }
};