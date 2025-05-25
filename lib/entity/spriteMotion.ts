import { Sprite } from './sprite';
import { RotationStyle } from './rotationStyle';

/**
 * Sprite Motion(動き)
 */
export interface ISpriteMotion {
    /**
     * 位置
     * ```ts
     * // X座標を取得
     * const posX = this.Motion.Position.x;
     * // Y座標を取得
     * const posY = this.Motion.Position.y;
     * ```
     * ```ts
     * // X座標を設定
     * this.Motion.Position.x = 150;
     * // Y座標を設定
     * this.Motion.Position.y = -100;
     * ```
     * ```ts
     * // X座標を10だけ増やす
     * this.Motion.Position.x += 10;
     * ```
     * @returns { x: number, y: number} - 座標
     */
    get Position(): {x:number, y:number};
    /**
     * 向き
     * ```ts
     * // 向きを取得
     * const degree = this.Motion.Direction.degree;
     * ```
     * ```ts
     * // 向きを設定
     * this.Motion.Direction.degree = 45; // 45度
     * ```
     * ```ts
     * // 向きを増やす
     * this.Motion.Direction.degree += 15; // 15度回転
     * ```
     * @returns {number} - 向き
     */
    get Direction(): {degree: number};
    /**
     * 現在座標
     * ```ts
     * // 現在の座標
     * const pos = this.Motion.getCurrentPosition();
     * console.log(pos.x, pos.y);
     * ```
     * @returns {x:number, y:number} - 座標
     */
    getCurrentPosition(): {x:number, y:number};
    /**
     * 現在の向き
     * ```ts
     * const degree = this.Motion.getCurrentDirection();
     * ```
     * @returns {number} - 向き
     */
    getCurrentDirection(): number;
    /**
     * 現在の向きへ距離数分進む
     * ```ts
     * // 10歩進む
     * const STEPS = 10;
     * this.Motion.moveSteps( STEPS );
     * ```
     * @param steps {number} - 距離
     */
    moveSteps(steps: number): void ;
    /**
     * 座標の位置へ移動する
     * ```ts
     * // 座標(100, 150)の位置へ移動
     * this.Motion.moveTo( 100, 150 );
     * ```
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    moveTo(x: number, y:number): void;
    /**
     * もし端に触れたら跳ね返る
     * ```ts
     * for(;;) {
     *  // 10歩進む
     *  this.Motion.moveSteps(10);
     *  //端に触れたら跳ね返る
     *  this.Motion.ifOnEdgeBounds();
     * }
     * ```
     */
    ifOnEdgeBounds(): void;
    /**
     * ランダムな位置へ移動する
     * ```ts
     * this.Motion.gotoRandomPosition();
     * ```
     */
    gotoRandomPosition():void;
    /**
     * マウスカーソルの位置へ移動する
     * ```ts
     * this.Motion.gotoMousePosition();
     * ```
     */
    gotoMousePosition() : void;
    /**
     * 指定スプライトの位置へ移動する
     * 
     * ```ts
     * let cat:Sprite, ball:Sprite;
     * cat.Event.whenFlag(async function(this:S3Sprite){
     *  // スプライト(ball)の位置へ移動する
     *  this.Motion.gotoSprite(ball);
     * });
     * ```
     * @param target - 指定スプライト.
     */
    gotoSprite(target: Sprite): void;
    /**
     * 指定位置へ指定秒数だけかけて移動する
     * ```ts
     * // 5秒で座標(100,100)へ移動する
     * await this.Motion.glideToPosition(5, 100, 100);
     * ```
     * @param sec {number} - 秒数
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    glideToPosition(sec:number, x:number, y:number): Promise<void>;
    /**
     * マウスカーソルへ向く
     * ```ts
     * // マウスカーソルの方向へ向く
     * this.Motion.pointToMouse();
     * ```
     */
    pointToMouse() : void;
    /**
     * ターゲットの位置へ向く
     * @param target {Sprite} - ターゲット
     * ```ts
     * let cat:Sprite, ball:Sprite;
     * cat.Event.whenFlag(async function(this:S3Sprite){
     *  // スプライト(ball)の位置へ向く
     *  this.Motion.pointToTarget(ball);
     * });
     * ```
     */
    pointToTarget(target: Sprite) : void;
    /**
     * 指定した向きへ向く
     * @param direction {number} - 向き
     * ```ts
     * // 45度へ向ける
     * this.Motion.pointInDerection(45);
     * ```
     */
    pointInDerection(direction: number): void;
    /**
     * 回転方向を指定する
     * @param rotationStyle {string} - 回転方向
     * ```ts
     * this.Motion.setRotationStyle(Lib.RotationStyle.LEFT_RIGHT);
     * ```
     */
    setRotationStyle(rotationStyle: RotationStyle) : void;
    /**
     * 指定座標へ行く
     * ```ts
     * // 座標(100,100)へ行く
     * this.Motion.gotoXY(100,100);
     * ```
     * @param x {number} - X座標
     * @param y {number} - Y座標
     * 
     */
    gotoXY(x: number, y:number): void;
    /**
     * 右向きに回転する
     * ```ts
     * // 右向きに15度回転
     * this.Motion.turnRightDegrees(15);
     * ```
     * @param degree {number} - 角度
     */
    turnRightDegrees(degree: number): void;
    /**
     * 左向きに回転する
     * ```ts
     * // 左向きに15度回転
     * this.Motion.turnLeftDegrees(15);
     * ```
     * @param degree {number} - 角度
     */
    turnLeftDegrees(degree: number): void;
    /**
     * X座標を設定する
     * ```ts
     * // X座標を 100にする(Y座標は変えない)
     * this.Motion.setX(100);
     * ```
     * @param x {number} - X座標
     */
    setX( x: number ): void;
    /**
     * Y座標を設定する
     * ```ts
     * // Y座標を 100にする(X座標は変えない)
     * this.Motion.setY(100);
     * ```
     * @param y {number} - Y座標
     */
    setY( y: number ): void;
    /**
     * X座標を指定量だけ変える
     * ```ts
     * // X座標を 10だけ変える(Y座標は変えない)
     * this.Motion.changeX(10);
     * ```
     * @param dx {number} - X座標差分
     */
    changeX(dx: number): void;
    /**
     * Y座標を指定量だけ変える
     * ```ts
     * // Y座標を 10だけ変える(X座標は変えない)
     * this.Motion.changeY(10);
     * ```
     * @param dy {number} - Y座標差分
     */
    changeY(dy: number): void;
};

export class SpriteMotion implements ISpriteMotion {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    get Position(): {x:number, y:number} {
        return this.entity.Position;
    }
    get Direction(): {degree: number} {
        return this.entity.Direction;
    }
    getCurrentPosition(): {x:number, y:number} {
        return this.entity.$getCurrentPosition();
    }
    getCurrentDirection(): number {
        return this.entity.$getCurrentDirection();
    }
    /**
     * 現在の向きへ距離数分進む
     * ```ts
     * // 10歩進む
     * const STEPS = 10;
     * this.Motion.moveSteps( STEPS );
     * ```
     * @param steps {number} - 距離
     */
    moveSteps(steps: number): void {
        this.entity.$moveSteps(steps);
    }
    /**
     * 座標の位置へ移動する
     * ```ts
     * // 座標(100, 150)の位置へ移動
     * this.Motion.moveTo( 100, 150 );
     * ```
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    moveTo(x: number, y:number): void {
        this.entity.$moveTo(x, y);
    }
    /**
     * もし端に触れたら跳ね返る
     * ```ts
     * for(;;) {
     *  // 10歩進む
     *  this.Motion.moveSteps(10);
     *  //端に触れたら跳ね返る
     *  this.Motion.ifOnEdgeBounds();
     * }
     * ```
     */
    ifOnEdgeBounds(): void {
        this.entity.$ifOnEdgeBounds();
    }
    /**
     * ランダムな位置へ移動する
     * ```ts
     * this.Motion.gotoRandomPosition();
     * ```
     */
    gotoRandomPosition() : void {
        this.entity.$gotoRandomPosition();
    }
    /**
     * マウスカーソルの位置へ移動する
     * ```ts
     * this.Motion.gotoMousePosition();
     * ```
     */
    gotoMousePosition() : void {
        this.entity.$gotoMousePosition();
    }
    /**
     * 指定スプライトの位置へ移動する
     * 
     * ```ts
     * let cat:Sprite, ball:Sprite;
     * cat.Event.whenFlag(async function(this:S3Sprite){
     *  // スプライト(ball)の位置へ移動する
     *  this.Motion.gotoSprite(ball);
     * });
     * ```
     * @param target - 指定スプライト.
     */
    gotoSprite(target: Sprite): void {
        this.entity.$gotoSprite(target);
    }
    /**
     * 指定位置へ指定秒数だけかけて移動する
     * ```ts
     * // 5秒で座標(100,100)へ移動する
     * await this.Motion.glideToPosition(5, 100, 100);
     * ```
     * @param sec {number} - 秒数
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    async glideToPosition(sec:number, x:number, y:number): Promise<void>{
        await this.entity.$glideToPosition(sec, x, y);
    }
    /**
     * マウスカーソルへ向く
     * ```ts
     * // マウスカーソルの方向へ向く
     * this.Motion.pointToMouse();
     * ```
     */
    pointToMouse() : void {
        this.entity.$pointToMouse();
    }
    /**
     * ターゲットの位置へ向く
     * @param target {Sprite} - ターゲット
     * ```ts
     * let cat:Sprite, ball:Sprite;
     * cat.Event.whenFlag(async function(this:S3Sprite){
     *  // スプライト(ball)の位置へ向く
     *  this.Motion.pointToTarget(ball);
     * });
     * ```
     */
    pointToTarget(target: Sprite) : void {
        this.entity.$pointToTarget(target);
    }
    /**
     * 指定した向きへ向く
     * @param direction {number} - 向き
     * ```ts
     * // 45度へ向ける
     * this.Motion.pointInDerection(45);
     * ```
     */
    pointInDerection(direction: number): void {
        this.entity.$pointInDerection(direction);
    }
    /**
     * 回転方向を指定する
     * @param rotationStyle {string} - 回転方向
     * ```ts
     * this.Motion.setRotationStyle(Lib.RotationStyle.LEFT_RIGHT);
     * ```
     */
    setRotationStyle(rotationStyle: RotationStyle) : void{
        this.entity.$setRotationStyle(rotationStyle);
    }
    /**
     * 指定座標へ行く
     * ```ts
     * // 座標(100,100)へ行く
     * this.Motion.gotoXY(100,100);
     * ```
     * @param x {number} - X座標
     * @param y {number} - Y座標
     * 
     */
    gotoXY(x: number, y:number): void {
        this.entity.Motion.gotoXY(x,y);
    }
    /**
     * 右向きに回転する
     * ```ts
     * // 右向きに15度回転
     * this.Motion.turnRightDegrees(15);
     * ```
     * @param degree {number} - 角度
     */
    turnRightDegrees(degree: number): void {
        this.entity.$turnRight(degree);
    }
    /**
     * 左向きに回転する
     * ```ts
     * // 左向きに15度回転
     * this.Motion.turnLeftDegrees(15);
     * ```
     * @param degree {number} - 角度
     */
    turnLeftDegrees(degree: number): void {
        this.entity.$turnLeft(degree);
    }
    /**
     * X座標を設定する
     * ```ts
     * // X座標を 100にする(Y座標は変えない)
     * this.Motion.setX(100);
     * ```
     * @param x {number} - X座標
     */
    setX( x: number ): void {
        this.entity.$setX(x);
    }
    /**
     * Y座標を設定する
     * ```ts
     * // Y座標を 100にする(X座標は変えない)
     * this.Motion.setY(100);
     * ```
     * @param y {number} - Y座標
     */
    setY( y: number ): void {
        this.entity.$setY(y);
    }
    /**
     * X座標を指定量だけ変える
     * ```ts
     * // X座標を 10だけ変える(Y座標は変えない)
     * this.Motion.changeX(10);
     * ```
     * @param dx {number} - X座標差分
     */
    changeX(dx: number): void {
        this.entity.$changeX(dx);
    }
    /**
     * Y座標を指定量だけ変える
     * ```ts
     * // Y座標を 10だけ変える(X座標は変えない)
     * this.Motion.changeY(10);
     * ```
     * @param dy {number} - Y座標差分
     */
    changeY(dy: number): void {
        this.entity.$changeY(dy);
    }
};