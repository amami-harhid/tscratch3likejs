import { Sprite } from '../sprite';
import { ISprite } from '@Type/sprite/ISprite';
import { ISpriteMotionMove } from '@Type/sprite/ISpriteMotionMove';
export class SpriteMotionMove implements ISpriteMotionMove {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * ステップ数分、進ませる
     * @param steps {number} - ステップ数
     */
    steps(steps: number): void {
        this.entity.$moveSteps(steps);
    }
    /**
     * 指定座標へ移動する
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    toXY(x:number, y:number): void {
        this.entity.$goToXY(x, y);
    }
    /**
     * もし端に振れたら跳ね返る
     */
    ifOnEdgeBounds(): void {
        this.entity.$ifOnEdgeBounds();
    }
    /**
     * ステージ上のランダムな位置へ移動する
     */
    randomPosition(): void {
        this.entity.$gotoRandomPosition();
    }
    /**
     * マウスカーソルの位置へ移動する
     */
    mousePosition() : void {
        this.entity.$gotoMousePosition
    }
    /**
     * 指定したスプライトの位置へ移動する
     * @param target {Sprite} - 指定スプライト
     */
    toSprite(target: ISprite) : void {
        const _target: Sprite = target as unknown as Sprite;
        this.entity.$gotoSprite(_target);
    }
    /**
     * 指定秒数かけて指定座標へ移動する
     * @param sec {number} - 秒数
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    async glideTo(sec:number, x: number, y:number): Promise<void> {
        await this.entity.$glideToPosition(sec, x, y);
    }

};