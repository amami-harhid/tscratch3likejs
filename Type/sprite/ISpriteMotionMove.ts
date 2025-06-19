import { ISprite } from '.';

export interface ISpriteMotionMove {
    /**
     * ステップ数分、進ませる
     * @param steps {number} - ステップ数
     */
    steps(steps: number): void;
    /**
     * 指定座標へ移動する
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    toXY(x:number, y:number): void;
    /**
     * もし端に振れたら跳ね返る
     */
    ifOnEdgeBounce(): void;
    /**
     * ステージ上のランダムな位置へ移動する
     */
    randomPosition(): void;
    /**
     * マウスカーソルの位置へ移動する
     */
    mousePosition() : void;
    /**
     * 指定したスプライトの位置へ移動する
     * @param target {Sprite} - 指定スプライト
     */
    toSprite(target: ISprite) : void;
    /**
     * 指定秒数かけて指定座標へ移動する
     * @param sec {number} - 秒数
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    glideTo(sec:number, x: number, y:number): Promise<void>;

};