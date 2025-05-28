import { Sprite } from './sprite';
import { RotationStyle } from './rotationStyle';

export class SpriteMotion {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    get Position(): {x:number, y:number, xy:{x:number,y:number}} {
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
    get Rotation() {
        const method = {style : RotationStyle.ALL_AROUND};
        const me = this.entity;
        Object.defineProperty(method, "style", {
            get : function() {
                return me.$getRotationStyle();
            },
            set : function(style) {
                me.$setRotationStyle(style);
            }
        })

        return method;
    }
    get Move() {
        const move = {
            moveSteps: this.entity.$moveSteps.bind(this.entity),
            //moveTo: this.entity.$moveTo.bind(this.entity),
            gotoXY: this.entity.$goToXY.bind(this.entity),
            ifOnEdgeBounds: this.entity.$ifOnEdgeBounds.bind(this.entity),
            gotoRandomPosition: this.entity.$gotoRandomPosition.bind(this.entity),
            gotoMousePosition: this.entity.$gotoMousePosition.bind(this.entity),
            gotoSprite: this.entity.$gotoSprite.bind(this.entity),
            glideToPosition: this.entity.$glideToPosition.bind(this.entity),

        };
        return move;
    }
    get Point() {
        const point = {
            pointToMouse: this.entity.$pointToMouse.bind(this.entity),
            pointToTarget: this.entity.$pointToTarget.bind(this.entity),
            pointInDirection: this.entity.$pointInDirection.bind(this.entity),
        }
        return point;
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
    pointInDirection(direction: number): void {
        this.entity.$pointInDirection(direction);
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
        this.entity.$goToXY(x,y);
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