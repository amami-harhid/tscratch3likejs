import {Entity, S3EntityOption} from "../s3Entity";
import {S3Point} from "../s3Point";
import {S3Scale } from "../s3Scale";
import {S3Effect} from "../s3Effect";
//import {S3EventFuncsions} from "../s3EventFunctions";
import {S3ImageFunctions} from "../s3ImageFunctions";
import {S3ControlFunctions} from "../s3ControlFunctions";
import {S3TextToSpeechFunctions} from "../s3TextToSpeechFunctions";
import {S3SensingFunctions} from "../s3SensingFunctions";
import {S3EventFunctions} from "../s3EventFunctions";
import {S3SoundFunctions} from "../s3SoundFunctions";
import {S3LooksFunctions} from "../s3LooksFunctions";
import {S3RotationStyle} from "../s3Libs";

/** イベント処理 */
declare interface S3SpriteEventFunctions extends S3EventFunctions{

}
/** スプライトの制御用 */
declare interface S3SpriteControlFunctions extends S3ControlFunctions{
    /**
     * クローンを作る.
     * 引数でプロパティにしたがってクローンを作る。
     * 引数省略すると本体のプロパティを引き継いだクローンが作られる。
     * @param option {S3CloneOption} 
     * ```ts
     * // 旗が押されたときの動作（cat)
     * cat.whenFlag(async function*(this:Sprite){
     *  // スペースキーが押されているとき
     *  if(Lib.keyIsDown(Lib.Keyboard.SPACE)){
     *      // クローンを作る
     *      this.Control.clone();
     *      // スペースキーが押されている間、待つ。
     *      await this.Control.waitWhile(Lib.keyIsDown(Lib.Keyboard.SPACE))    
     *  })
     *  yield;
     * })
     * ```
     * ```ts
     * import type { S3CloneOption } from '@typeS3/s3Sprite';
     * const cloneProperties:S3CloneOption  = {
     *  position: { x: 0, y: 0}, // クローン座標は (0,0)固定
     *  direction: 45,  // クローンの向きは45度
     *  scale: {x: 150, y:150}, // クローンサイズは縦横150%
     *  effect: {ghost: 50 }, // クローン幽霊効果 50
     * };
     * // クローンを作る
     * this.Control.clone(cloneProperties);
     * ```
     */
    clone(option?:S3CloneOption): void;
    /** クローンを作る */
    cloneAndWait(option?:S3CloneOption): Promise<S3Sprite>
    /**
     * クローンされたときの動作
     * @param func 
     * ```ts
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      if(Lib.isKeyDown(Lib.Keyboard.SPACE{
     *          // クローンを作る
     *          this.Control.clone();
     *      });
     *      yield;
     *  }
     * });
     * // クローンされたときの動作
     * cat.whenCloned(async function(this:Sprite){
     *      for(;;) {
     *          // 10歩進む
     *          this.Motion.moveSteps(10);
     *          // もし端に触れたら跳ね返る
     *          this.Motion.ifOnEdgeBounds();
     *          yield;
     *      }
     * });
     * ```
     */
    whenCloned( func: CallableFunction ): void;
    /** 削除する */
    /**
     * 削除する。クローンを消すときに利用する。
     * 
     * ```ts
     * cat.whenFlag(async function*(this:Sprite){
     *  for(;;) {
     *      if(Lib.isKeyDown(Lib.Keyboard.SPACE{
     *          // クローンを作る
     *          this.Control.clone();
     *      });
     *      yield;
     *  }
     * });
     * // クローンされたときの動作
     * cat.whenCloned(async function(this:Sprite){
     *      for(;;) {
     *          // 10歩進む
     *          this.Motion.moveSteps(10);
     *          // 端に触れたとき
     *          if( this.Sensing.isTouchingEdge() ){
     *              // 繰返しを抜ける
     *              break;
     *          }
     *          yield;
     *      }
     *      // クローンを削除する
     *      this.Control.remove();
     * });
     * ```
     */
    remove() : void;
    /** クローンを全て削除する */
    /**
     * クローンを全て削除する. 
     * 他スクリプト内から自分(クローン)を削除されることがあるため、
     * isAlive() と組み合わせて、クローンの生死を確認しておく必要がある。
     * 
     * ```ts
     * // クローンを作る箇所のコードは省略する
     * 
     * cat.whenCloned(async function(this:Sprite){
     *      for(;;) {
     *          // クローンが端に触れたとき
     *          if( this.Sensing.isTouchingEdge() ){
     *              // 繰返しを抜ける
     *              break;
     *          }
     *          yield;
     *      }
     *      // 全てのクローンを削除する
     *      this.Control.removeAllClones();
     * });
     * cat.whenCloned(async function(this:Sprite){
     *      for(;;) {
     *          // 生きているとき( removeされていないとき )
     *          if(this.Control.isAlive()) {
     *              // 10歩進む
     *              this.Motion.moveSteps(10);
     *          }
     *          yield;
     *      }
     * });
     * ```
     */
    removeAllClones() : void;
    /** スプライトが生きている */
    /**
     * スプライト（クローン）が生きているかを判定する
     * removeAllClones()の説明を参照すること。
     * ```ts
     *  // 他スクリプトでremoveされる可能性があるとき生死を判定
     *  // しておくほうが安全である
     *  if( this.Control.isAlive() ) {
     *      // 15度回転
     *      this.Motion.Direction.degree += 15;
     *  }
     * 
     * ```
     */
    isAlive() : boolean;

}

declare interface S3SpriteOption implements S3EntityOption {
}
declare interface S3CloneOption implements S3EntityOption {
}
declare interface S3SpritePosition {
    /** スプライトx座標 */
    x: number;
    /** スプライトy座標 */
    y: number;
}
declare interface S3SpriteDirection {
    /** 向き */
    degree: number;
}
declare interface S3MotionFunctions {
    /** 
     * スプライト座標
     * ```ts
     *  // 座標、x=10, y=15 にする
     *  this.Motion.Position.x = 10;
     *  this.Motion.Position.y = 15;
     * ``` 
     * ```ts
     *  // 座標(X)を 10 増やす
     *  this.Motion.Position.x += 10;
     * ``` 
     */
    Position: S3SpritePosition;
    /** 
     * スプライト向き 
     * ```ts
     *  // 向きを45度にする
     *  this.Motion.Direction.degree = 45;
     * ```
     * ```ts
     *  // 向きを5度,増やす
     *  this.Motion.Direction.degree += 5;
     * ```
     */
    Direction: S3SpriteDirection;
    /** 
     * 現在の位置を取得する
     * ```ts
     *  const pos = this.Motion.getCurrentPosition();
     *  console.log(pos.x, pos.y);
     * ``` 
     */
    getCurrentPosition(): {x: number, y: number};
    /** 
     * 現在の向きを取得する
     * ```ts
     *  // 向き
     *  const direction = this.Motion.getCurrentDirection();
     *  console.log('direction=', direction);
     * ``` 
     */
    getCurrentDirection(): number,
    /** 
     * 指定した距離分移動させる（向きの方向へ）
     * ```ts
     *  // 現在の向きへ、10歩進む
     *  this.Motion.moveSteps(10);
     * ``` 
     */
    moveSteps(step: number): void;
    /** 
     * 端にふれたら跳ね返る
     * ```ts
     *  // 10歩進む
     *  this.Motion.moveSteps(10);
     *  // 端に触れたら跳ね返る
     *  this.Motion.ifOnEdgeBounds();
     * ``` 
     */
    ifOnEdgeBounds() : void;
    /** 
     * どこかへ移動する
     * ```ts
     *  // ステージ上のどこかへ移動する
     *  this.Motion.gotoRandomPosition();
     * ``` 
     */
    gotoRandomPosition(): void;
    /** マウスカーソルの場所へ移動する */
    gotoMousePosition(): void;
    /** 指定したスプライトの場所へ移動する */
    gotoSprite(target:S3Sprite): void;
    /** 〇秒で指定した場所へ移動する(await必須) */
    glideToPosition(secs: number, x: number|{x:number, y:number}, y?:number): Promise<any>;
    /** マウスの位置へ向く */
    pointToMouse() : void;
    /** 指定したターゲットの位置へ向く */
    pointToTarget(target: S3Sprite): void;
    /** 〇度へ向ける */
    pointInDirection(degree: number) : void;
    /** 回転方法を〇にする */
    setRotationStyle(rotationStyle: string  ) : void;
    /** 指定した位置へ移動 */
    gotoXY(x: number , y:number) : void;
    /** 右側回転 */
    turnRightDegrees(degree:number): void;
    /** 左側回転 */
    turnLeftDegrees(degree:number): void;
    /** X座標を指定する */
    setX(x: number) : void;
    /** Y座標を指定する */
    setY(y: number) : void;
    /** X座標を〇ずつ変える */
    changeX( x: number) : void;
    /** Y座標を〇ずつ変える */
    changeY( y: number) : void;

}
/** 距離 */
declare interface S3SpriteDistance {
    /** マウスポインターまでの距離 */
    toMousePointer : number;
    /** 他スプライトまでの距離 */
    to(otherSprite:S3Sprite) : number;
}
/** ドラッグモード */
declare interface S3DragMode {
    /** ドラッグできるときTRUE,ドラッグさせないときFALSE */
    draggable : boolean;
}
/** 調べる系メソッド */
declare interface S3SpriteSensingFunctions extends S3SensingFunctions {
    /** 距離 */
    Distance: S3SpriteDistance;
    /** 端に触れたとき */
    isTouchingEdge(): boolean;
    /** 上下の端に触れたとき */
    isTouchingVirticalEdge(): boolean;
    /** 左右の端に触れたとき */
    isTouchingHorizontalEdge(): boolean;
    /** マウスポインター触れていないとき */
    isNotMouseTouching(): boolean;
    /** マウスポインターに触れたとき */
    isMouseTouching(): boolean;
    /** 指定したスプライトが触れたとき */
    isTouchingToSprite(sprites:S3Sprite | S3Sprite[]): boolean;
    /** 触れているスプライトを取得する */
    getTouchingSprites(): S3Sprite[];
    /**
     * 相手の色に触れていることを判定する
     * @param targetRGB #始まりのRGB文字列(#始まりの16進数)
     */
    isTouchingToColor(targetRGB: string): Promise<boolean>;
    /**
     * 自身の色が相手の色に触れていることを判定する
     * @param targetRGB 相手のRGB文字列 (#始まりの16進数)
     * @param maskRGB 自身のRGB文字列 (#始まりの16進数)
     */
    colorIsTouchingToColor(targetRGB: string, maskRGB: string): Promise<boolean>;
    /** ドラッグモード */
    DragMode: S3DragMode;

}

/** フキダシのプロパティ */
declare interface SayProperty {
    /** フキダシのサイズ */
    scale: {w: number, h: number};
}
/** サイズプロパティ */
declare interface SizeProperty {
    /** サイズ横 */
    w: number, 
    /** サイズ縦 */
    h: number;
}

/** コスチューム */
declare interface S3Costume {
    /** コスチューム番号 */
    readonly no : number;
    /** コスチューム名 */
    readonly name : string;
}
declare interface S3SpriteSize {
    /** 横 */
    w: number;
    /** 縦 */
    h: number;
}
declare interface S3SpriteLooksFunctions extends S3LooksFunctions{
    /** コスチューム */
    Costume : S3Costume;
    /** 次のコスチュームにする */
    nextCostume(): void;
    /** 指定した名前(または番号)でコスチュームを切り替える */
    switchCostume(costume: string | number): void;
    /** 話す */
    say(/** 話すテキスト */text?: string, properties?: SayProperty): void;
    /** 指定した秒数だけ話す(await 必須) */
    sayForSecs(/** 話すテキスト */text: string, secs: number, properties?: SayProperty): Promise<any>;
    /** 思う */
    think(/** 思うテキスト */text?: string, properties?: SayProperty):void;
    /** 指定した秒数だけ思う(await 必須) */
    thinkForSecs(/** 思うテキスト */text: string, secs: number, properties?: SayProperty): Promise<any>;
    /** 大きさ */
    Size: S3SpriteSize;
    /** 大きさを変える */
    changeSizeBy(w: number, h:number ):void;
    /** 大きさを取得する */
    getSize() : SizeProperty;
    /** 大きさを設定する */
    setSize(w: number ,h: number): void;
    /** 表示する */
    show(): void;
    /** 隠す */
    hide(): void;
    /** 最前面にする */
    goToFront(): void;
    /** 最背面にする */
    goToBack(): void;
    /** 指定階層分、前にする */
    goForwardLayers(layers: number): void;
    /** 指定階層分、後ろにする */
    goBackwardLayers(layers: number): void;
    /** 自分自身の縦横表示サイズを得る */
    drawingDimensions() : {width: number, height: number};
}
declare interface S3Pen {
    /** 線を引く */
    //drawLine(): void;
    /** 点をうつ */
    //drawPoint(): void;
    /** ペンクリア */
    penClear(): void;
    /** ペンを上げる */
    penUp(): void;
    /** ペンを下げる */
    penDown(): void;
    /** スタンプ */
    stamp(): void;
    /** 色相を設定[0 - 360] */
    setPenHue(hue: number): void;
    /** 色相を変える */
    changePenHue(hue: number): void;
    /** 彩度を設定[0 - 100] */
    setPenSaturation(saturation: number): void;
    /** 彩度を変える */
    changePenSaturation(saturation: number): void;
    /** 明度を設定[0 - 100] */
    setPenBrightness(brightness: number): void;
    /** 明度を変える */
    changePenBrightness(brightness: number): void;
    /** 透明度を設定[0 - 100] 100%で完全透明 */
    setPenTransparency(transparency: number): void;
    /** 透明度を変える */
    changePenTransparency(transparency: number): void;
    /** ペンサイズを設定 */
    setPenSize(penSize: number): void;
    /** ペンサイズを変える */
    changePenSize(penSize: number): void;
} 
/** スプライト（実体[Entity]を継承）*/
export interface Sprite extends Entity{
    /**
     * @constructor
     * @param name {string} - 名前
     * @param option? {S3SpriteOption} - オプション
     * ```ts
     * let cat : Sprite;
     * cat = new Lib.Sprite('tama');
     * ```
     */
    new(name?:string, option?: S3SpriteOption): Sprite;
    /** 
     * イメージ(画像)
     */
    Image: S3ImageFunctions;
    /** サウンド(音) */
    Sound: S3SoundFunctions;
    /** 動き */
    Motion: S3MotionFunctions;
    /** 見た目 */
    Looks: S3SpriteLooksFunctions;
    /** イベント */
    Event: S3SpriteEventFunctions;
    /** 制御 */
    Control: S3SpriteControlFunctions;
    /** 調べる */
    Sensing: S3SpriteSensingFunctions;
    /** 音声合成 */
    TextToSpeech: S3TextToSpeechFunctions;
    /** ペン */
    Pen: S3Pen;
    

    /** 次のコスチュームにする */
    //nextCostume(): void;
    /** 指定した秒数をかけて指定した座標(x,y)へ移動する (await必須) */
    //glideToPosition(second:number, x:number, y:number): Promise<any>;
    /** 表示非表示を設定する(trueのとき表示) */
    //setVisible(condition:boolean): void;
    /** 
     * 大きさを変える(縦横をx,yで指定、100が初期値)
     * 第二引数省略時は 縦横ともに第一引数を充てる 
     */
    //setScale(x:number,y?:number): void;
    /** ステージ内でランダムな位置を返す */
    //randomPoint: S3Point;
    /** 生きている秒数(マイナス値になったら死亡) */
    life : number;
    
}