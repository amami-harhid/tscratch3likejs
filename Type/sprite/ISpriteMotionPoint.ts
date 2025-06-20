import type { ISprite } from '.';
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