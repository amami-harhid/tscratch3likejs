export interface ITextSpriteMotionMove {
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

};