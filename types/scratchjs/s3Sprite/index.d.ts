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
     *      if(Lib.isKeyDown(Lib.Keyboard.SPACE)){
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
     *          this.Motion.Move.moveSteps(10);
     *          // もし端に触れたら跳ね返る
     *          this.Motion.Move.ifOnEdgeBounds();
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
     *          this.Motion.Move.moveSteps(10);
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
     *              this.Motion.Move.moveSteps(10);
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
    /** スプライト(x,y)座標 */
    xy: {x:number, y:number},
}
declare interface S3SpriteDirection {
    /** 向き */
    degree: number;
}
declare interface S3SpriteMotionMove {
    /** 
     * 指定した距離分移動させる（向きの方向へ）
     * ```ts
     *  // 現在の向きへ、10歩進む
     *  this.Motion.Move.moveSteps(10);
     * ``` 
     */
    moveSteps(step: number): void;
    /** 
     * 端にふれたら跳ね返る
     * ```ts
     *  // 10歩進む
     *  this.Motion.Move.moveSteps(10);
     *  // 端に触れたら跳ね返る
     *  this.Motion.Move.ifOnEdgeBounds();
     * ``` 
     */
    ifOnEdgeBounds() : void;
    /** 
     * 指定した位置へ移動
     * @param x {number} - x座標 
     * @param y {number} - y座標
     * ```ts
     *  // 座標( X:100, Y:150 )へ移動する
     *  this.Motion.Move.gotoXY(100, 150);
     * ```
     */
    gotoXY(x: number , y:number) : void;
    /** 
     * どこかへ移動する
     * ```ts
     *  // ステージ上のどこかへ移動する
     *  this.Motion.Move.randomPosition();
     * ``` 
     */
    randomPosition(): void;
    /** 
     * マウスカーソルの場所へ移動する
     * ```ts
     *  this.Motion.Move.gotoMousePosition();
     * ``` 
     */
    gotoMousePosition(): void;
    /** 
     * 指定したスプライトの位置へ移動する
     * @param target {Sprite} - 他スプライト
     * ```ts
     *  // 他スプライトの位置へ移動する
     *  this.Motion.Move.gotoSprite(otherSprite);
     * ``` 
     */
    gotoSprite(target:S3Sprite): void;
    /** 
     * 〇秒で指定した場所へ移動する
     * @param secs {number} - 秒数
     * @param x {number} - x座標
     * @param y {number} - y座標
     */
    glideToPosition(secs: number, x: number, y:number): Promise<any>;

}
declare interface S3SpriteMotionStyle {
    /** 
     * 回転方法
     * ```ts
     *  this.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
     * ``` 
     * RotationStyle {@link S3RotationStyle }
     */
    style: string;
}
declare interface S3SpriteMotionPoint {
    /** 
     * マウスの位置へ向く
     * ```ts
     *  this.Motion.Point.pointToMouse();
     * ``` 
     */
    pointToMouse() : void;
    /** 
     * 指定したターゲットの位置へ向く 
     * ```ts
     *  this.Motion.Point.pointToTarget(targetSprite);
     * ```
     */
    pointToTarget(target: S3Sprite): void;
    /** 
     * 〇度へ向ける 
     * ```ts
     *  // 45度に向ける
     *  this.Motion.Point.pointInDirection(45);
     * ```
     */
    pointInDirection(degree: number) : void;
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
    // /** 
    //  * 現在の位置を取得する
    //  * ```ts
    //  *  const pos = this.Motion.getCurrentPosition();
    //  *  console.log(pos.x, pos.y);
    //  * ``` 
    //  */
    // getCurrentPosition(): {x: number, y: number};
    // /** 
    //  * 現在の向きを取得する
    //  * ```ts
    //  *  // 向き
    //  *  const direction = this.Motion.getCurrentDirection();
    //  *  console.log('direction=', direction);
    //  * ``` 
    //  */
    // getCurrentDirection(): number,

    /**
     * 移動する
     */
    Move: S3SpriteMotionMove;

    Point: S3SpriteMotionPoint;
    // /** 右側回転 */
    // turnRightDegrees(degree:number): void;
    // /** 左側回転 */
    // turnLeftDegrees(degree:number): void;
    // /** X座標を〇ずつ変える */
    // changeX( x: number) : void;
    // /** Y座標を〇ずつ変える */
    // changeY( y: number) : void;
    /**
     * 回転方法
     * ```ts
     *  this.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
     * ``` 
     * RotationStyle {@link S3RotationStyle }
     */
    Rotation: S3SpriteMotionStyle,
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
    /** 
     * 距離
     * ```ts
     *  // マウスポインターまでの距離
     *  const toMousePointerDistance = this.Sensing.Distance.toMousePointer;
     * ``` 
     * ```ts
     *  // 指定したスプライトまでの距離
     *  const toSpriteDistance = this.Sensing.Distance.to(otherSprite);
     * ``` 
     */
    Distance: S3SpriteDistance;
    /** 
     * 端に触れたとき 
     * ```ts
     *  for(;;) {
     *      if( this.Sensing.isTouchingEdge()){
     *          break;
     *      }
     *      yield;
     *  }
     *  console.log('端に触れた');
     * ``` 
     */
    isTouchingEdge(): boolean;
    /** 
     * 左右の端に触れたとき 
     * ```ts
     *  for(;;) {
     *      if( this.Sensing.isTouchingVirticalEdge()){
     *          break;
     *      }
     *      yield;
     *  }
     *  console.log('左右の端に触れた');
     * ``` 
     */
    isTouchingVirticalEdge(): boolean;
    /** 
     * 上下の端に触れたとき
     * ```ts
     *  for(;;) {
     *      if( this.Sensing.isTouchingHorizontalEdge()){
     *          break;
     *      }
     *      yield;
     *  }
     *  console.log('上下の端に触れた');
     * ``` 
     */
    isTouchingHorizontalEdge(): boolean;
    /** 
     * マウスポインター触れていないとき
     * ```ts
     *  if( this.Sensing.isMouseTouching()) {
     *      console.log('このスプライトがマウスポインターに触れた！');
     *      // マウスポインターが離れるまで待つ。
     *      await this.Control.waitUntil( this.Sensing.isNotMouseTouching );
     *  }
     */
    isNotMouseTouching(): boolean;
    /** 
     * マウスポインターに触れたとき
     * ```ts
     *  if( this.Sensing.isMouseTouching()) {
     *      console.log('このスプライトがマウスポインターに触れた！');
     *  }
     * ``` 
     */
    isMouseTouching(): boolean;
    /** 
     * 指定したスプライトが触れたとき
     * @param sprites {Sprite[]} - スプライトの配列
     * ```ts
     *  let cat = new Lib.Sprite('cat');
     *  cat.Image.add(Cat);
     *  let ball01 = new Lib.Sprite('ball01');
     *  ball01.Image.add(Ball);
     *  let ball02 = new Lib.Sprite('ball02');
     *  ball02.Image.add(Ball);
     * 
     *  cat.Event.whenClicked(async function(this:Sprite){
     *      const sprites = [ball01, ball02];
     *      if( this.Sensing.isTouchingToSprite( sprites )) {
     *          console.log( '触れています' );
     *      }
     *  });
     *  
     * ```
     */
    isTouchingToSprite(sprites: S3Sprite[]): boolean;
    /** 
     * 触れているスプライトを取得する
     * ```ts
     *  const sprites: Sprite[] = this.Sensing.getTouchingSprites();
     *  console.log('このスプライトが触れている他スプライトの数', sprites.length);
     * ```
     */
    getTouchingSprites(): S3Sprite[];
    /**
     * 相手の色に触れていることを判定する
     * @param targetRGB #始まりのRGB文字列(#始まりの16進数)
     * ```ts
     *  const targetRGB = '#ff0000'; // 赤色
     *  if( await this.Sensing.isTouchingToColor(targetRGB) ) {
     *      console.log('赤色に触れた！');
     *  }
     * 
     * ```
     */
    isTouchingToColor(targetRGB: string): Promise<boolean>;
    /**
     * 自身の色が相手の色に触れていることを判定する
     * @param targetRGB 相手のRGB文字列 (#始まりの16進数)
     * @param maskRGB 自身のRGB文字列 (#始まりの16進数)
     * ```ts
     *  const targetRGB = '#ff0000'; // 赤色
     *  const maskRGB = '#0000ff'; // 青色
     *  if( await this.Sensing.colorIsTouchingToColor(targetRGB,maskRGB) ) {
     *      console.log('青色が赤色に触れた！');
     *  }
     * ```
     */
    colorIsTouchingToColor(targetRGB: string, maskRGB: string): Promise<boolean>;
    /** 
     * ドラッグモード
     * ```ts
     *  // Drag可能にする
     *  this.Sensing.DragMode.draggable = true;
     * ``` 
     */
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
/**
 * スプライトのサイズ
 * ```ts
 *  const width = this.Looks.Size.w;
 *  const height = this.Looks.Size.h;
 *  const scale = this.Looks.Size.scale;
 *  console.log(scale.w, scale.h); 
 * ```
 * ```ts
 *  this.Looks.Size.w = 150; // 150%
 *  this.Looks.Size.h = 200; // 200%
 *  this.Looks.Size.scale = {w:150, h:200};
 *  this.Looks.Size.w += 10; // 10ずつ増やす
 *  this.Looks.Size.h -= 10; // 10ずつ減らす
 * ```
 * ```ts
 *  const width = this.Looks.Size.w;
 *  const height = this.Looks.Size.h;
 *  this.Looks.Size.scale = {w:width+10, h:height+10};// w,h を10ずつ増やす
 * ```
 */
declare interface S3SpriteSize {
    /** 横 */
    w: number;
    /** 縦 */
    h: number;
    /** スケール */
    scale : S3SpriteScale;
}
declare interface S3SpriteScale {
    /** 横 */
    w: number;
    /** 縦 */
    h: number;
}
declare interface S3SpriteLooksFunctions extends S3LooksFunctions{
    /** コスチューム */
    Costume : S3Costume;
    /** 
     * 次のコスチュームにする 
     * ```ts
     *  cat = new Lib.Sprite('cat');
     *  // 画像CAT01を追加
     *  await cat.Image.add(CAT01);
     *  // 画像CAT02を追加
     *  await cat.Image.add(CAT02);
     *  
     *  cat.Event.whenFlag(async function*(this:Sprite){
     *      for(;;) {
     *          // 次のコスチュームにする
     *          this.Looks.nextCostume();
     *          // 0.5秒待つ
     *          await this.Control.wait(0.5);
     *          yield;
     *      }
     *  });
     * ```
     */
    nextCostume(): void;
    /** 
     * 指定した名前(または番号)でコスチュームを切り替える 
     * ```ts
     *  cat = new Lib.Sprite('cat');
     *  // 画像CAT01を追加
     *  await cat.Image.add(CAT01);
     *  // 画像CAT02を追加
     *  await cat.Image.add(CAT02);
     * ```
     * ```ts
     *  // 旗を押したときの動作
     *  cat.Event.whenFlag(async function*(this:Sprite){
     *      for(;;) {
     *          // CAT01にする
     *          this.Looks.switchCostume(CAT01);
     *          // 0.5秒待つ
     *          await this.Control.wait(0.5);
     *          // CAT02にする
     *          this.Looks.switchCostume(CAT02);
     *          // 0.5秒待つ
     *          await this.Control.wait(0.5);
     *          yield;
     *      }
     *  });
     * ```
     * ```ts
     *  // 旗を押したときの動作
     *  cat.Event.whenFlag(async function*(this:Sprite){
     *      for(;;) {
     *          // CAT01にする
     *          this.Looks.switchCostume(0);
     *          // 0.5秒待つ
     *          await this.Control.wait(0.5);
     *          // CAT02にする
     *          this.Looks.switchCostume(1);
     *          // 0.5秒待つ
     *          await this.Control.wait(0.5);
     *          yield;
     *      }
     *  });
     * ```
     */
    switchCostume(costume: string | number): void;
    /** 話す */
    say(/** 話すテキスト */text?: string, properties?: SayProperty): void;
    /** 指定した秒数だけ話す(await 必須) */
    sayForSecs(/** 話すテキスト */text: string, secs: number, properties?: SayProperty): Promise<any>;
    /** 
     * 考える
     * @param text? {string} - フキダシへ表示する文字列、省略時はフキダシを消す
     * @param properties? {SayProperty} - フキダシのプロパティ（サイズ） 
     * 
     */
    think(text?: string, properties?: SayProperty):void;
    /** 
     * 指定した秒数だけ考える
     * @param text {string} - フキダシへ表示する文字列
     * @param secs {number} - フキダシを表示する秒数
     * @param properties? {SayProperty} - フキダシのプロパティ（サイズ）
     */
    thinkForSecs(text: string, secs: number, properties?: SayProperty): Promise<any>;
    /**
     *  大きさ
     * ```ts
     *  this.Looks.Size.w = 150; //幅を150%にする
     *  this.Looks.Size.h = 150; //高さを150%にする
     *  this.Looks.Size.w += 10; //幅を10ずつ変える
     *  this.Looks.Size.h += 10; //高さを10ずつ変える
     *  const w = this.Looks.Size.w; // 幅を取り出す
     *  const h = this.Looks.Size.h; // 高さを取り出す
     * ``` 
     * ```ts
     *  this.Looks.Size.scale = {w: 200, h: 100};//幅を200%, 高さを100%にする
     *  const {w,h} = this.Looks.Size.scale; // w,hを取り出す
     *  this.Looks.Size.scale = {w: w+10, h: h+10}; // w,h を10ずつ変える
     * ``` 
     */
    Size: S3SpriteSize;
    // /** 
    //  * 大きさを変える 
    //  */
    // changeSizeBy(w: number, h:number ):void;
    /** 
     * 表示する
     * ```ts
     *  // 表示する
     *  this.Looks.show();
     * ``` 
     */
    show(): void;
    /** 
     * 隠す
     * ```ts
     *  // 隠す
     *  this.Looks.hide();
     * ``` 
     */
    hide(): void;
    /** 
     * 最前面にする
     * ```ts
     *  this.Looks.goToFront();
     * ``` 
     */
    goToFront(): void;
    /** 
     * 最背面にする
     * ```ts
     *  this.Looks.goToBack();
     * ``` 
     */
    goToBack(): void;
    /** 
     * 指定階層分、前にする
     * @param layers {number} - 移動する階層数
     * ```ts
     *  // 1階層分、前面にする
     *  this.Looks.goForwardLayers(1);
     * ```
     */
    goForwardLayers(layers: number): void;
    /** 
     * 指定階層分、背面にする 
     * @param layers {number} - 移動する階層数
     * ```ts
     *  // 1階層分、背面にする
     *  this.Looks.goBackwardLayers(1);
     * ```
     */
    goBackwardLayers(layers: number): void;
    /** 
     * 自分自身の縦横表示サイズを得る
     * @returns {{w: number, h: number}} - サイズ
     * ```ts
     *  // 表示サイズ
     *  const dimensions = this.Looks.drawingDimensions();
     *  console.log('横幅',dimensions.w); 
     *  console.log('縦幅',dimensions.h); 
     * ```
     */
    drawingDimensions() : {w: number, h: number};
}
declare interface S3PenSize {
    /**
     * ペンの太さ
     * ```ts
     *  this.Pen.Size.thickness
     * ```
     */
    thickness: number,
}
/**
 * HSV色空間
 */
declare interface S3PenHSVColor {
    /**
     * 色相[0 - 360]
     * ```ts
     *  this.Pen.HSVColor.hue;
     * ```
     */
    hue: number,
    /**
     * 彩度[0-100]
     * ```ts
     *  this.Pen.HSVColor.saturation;
     * ```
     */
    saturation: number,
    /**
     * 明度[0-100]
     * ```ts
     *  this.Pen.HSVColor.brightness
     * ```
     */
    brightness: number,
    /**
     * 透明度[0-100]
     * ```ts
     *  this.Pen.HSVColor.transparency;
     * ```
     */
    transparency: number,
}
declare interface S3Pen {
    /** 
     * ペンクリア
     * ```ts
     *  this.Pen.penClear();
     * ```
     */
    penClear(): void;
    /** 
     * ペンを上げる 
     * ```ts
     *  this.Pen.penUp();
     * ```
     */
    penUp(): void;
    /** 
     * ペンを下げる 
     * ```ts
     *  this.Pen.penDown();
     * ```
     */
    penDown(): void;
    /** 
     * スタンプ
     * ```ts
     *  this.Pen.stamp();
     * ```
     */
    stamp(): void;
    /** 
     * HSV色空間
     * @property {number} hue
     * @property {number} saturation
     * @property {number} brightness
     * @property {number} transparency
     */
    HSVColor: S3PenHSVColor;
    /** 
     * Pen サイズ 
     * @property {number} thickness
     */
    Size: S3PenSize,
} 
/** スプライト（実体[Entity]を継承）*/
export interface Sprite extends Entity{
    /**
     * @constructor
     * @param name {string} - 名前
     * @param option? {S3SpriteOption} - オプション
     * @example
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
    /** 
     * 生きている秒数(マイナス値になったら死亡)
     */
    life : number;
    
}