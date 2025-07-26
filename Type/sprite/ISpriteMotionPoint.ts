import type { ISprite } from '.';
/**
 * スプライトの動き（向かせる）
 */
export interface ISpriteMotionPoint {
    /**
     * マウスカーソルへ向く
     */
    toMouse(): void;
    /**
     * ターゲットの位置へ向く
     * @param target {Sprite} - ターゲット
     */
    toTarget(target: ISprite): void;
};