import {S3Entity} from "../s3Entity";
import {S3Point} from "../s3Point";
import {S3Scale } from "../s3Scale";
import {S3Effect} from "../s3Effect";
//import {S3EventFuncsions} from "../s3EventFunctions";
import {S3ImageFunctions} from "../s3ImageFunctions";
import {S3ControlFunctions} from "../s3ControlFunctions";
import {S3ExtensionsFunctions} from "../s3ExtensionsFunctions";
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
    /** クローンを作る */
    clone(option?:S3CloneOption): void;
    /** クローンを作る */
    cloneAndWait(option?:S3CloneOption): Promise<S3Sprite>
    /** クローンされたとき */
    whenCloned( func: CallableFunction ): void;
    /** 削除する */
    remove() : void;
    /** クローンを全て削除する */
    removeAllClones() : void;
    /** スプライトが生きている */
    alive() : boolean;
    /** スプライトの他のスクリプトを止める */
    stopOtherScripts(): void;

}

declare interface S3CloneOption {
    /** 位置指定 */
    position?: S3Point;
    /** 向き指定 */
    direction?: number;
    /** 大きさ指定 */
    scale?: S3Scale;
    /** 表示効果 */
    effect?: S3Effect;    
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
    /** スプライト座標 */
    Position: S3SpritePosition;
    /** スプライト向き */
    Direction: S3SpriteDirection;
    /** 現在の位置を取得する */
    getCurrentPosition(): {x: number, y: number};
    /** 現在の向きを取得する */
    getCurrentDirection(): number,
    /** 指定した距離分移動させる（向きの方向へ） */
    moveSteps(step: number): void;
    /** 端にふれていたら跳ね返る */
    ifOnEdgeBounds() : void;
    /** どこかへ移動する */
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
    changeSizeBy(w: number | SizeProperty, h?:number ):void;
    /** 大きさを取得する */
    getSize() : SizeProperty;
    /** 大きさを設定する */
    setSize(w: number | SizeProperty, h?: number): void;
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
    drawLine(): void;
    /** 点をうつ */
    drawPoint(): void;
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
export interface S3Sprite extends S3Entity{
    new(...args:any[]): S3Sprite;
    Image: S3ImageFunctions;
    Motion: S3MotionFunctions;
    Event: S3SpriteEventFunctions;
    Control: S3SpriteControlFunctions;
    Extensions: S3ExtensionsFunctions;
    Sensing: S3SpriteSensingFunctions;
    Sound: S3SoundFunctions;
    Looks: S3SpriteLooksFunctions;
    

    /** 次のコスチュームにする */
    nextCostume(): void;
    /** 表示非表示を設定する(trueのとき表示) */
    setVisible(condition:boolean): void;
    /** 
     * 大きさを変える(縦横をx,yで指定、100が初期値)
     * 第二引数省略時は 縦横ともに第一引数を充てる 
     */
    setScale(x:number,y?:number): void;
    /** ステージ内でランダムな位置を返す */
    randomPoint: S3Point;
    /** 生きている秒数(マイナス値になったら死亡) */
    life : number;
    /** 指定した秒数をかけて指定した座標(x,y)へ移動する (await必須) */
    glideToPosition(second:number, x:number, y:number): Promise<any>;
    /** ペン */
    Pen: S3Pen;
    
}