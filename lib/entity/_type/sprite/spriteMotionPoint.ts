import { Sprite } from '../sprite';

export class SpriteMotionPoint {
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
    toTarget(target: Sprite): void {
        this.entity.$pointToTarget(target);
    }
};