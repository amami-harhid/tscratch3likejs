import {S3Entity} from "@typeJS/scratchjs/s3Entity";
import {S3Point} from "@typeJS/scratchjs/s3Point";
import {S3Scale } from "@typeJS/scratchjs/s3Scale";
import {S3Effect} from "@typeJS/scratchjs/s3Effect";
import {S3EventFuncsions} from "@typeJS/scratchjs/"
import {S3ImageFunctions} from "@typeJS/scratchjs/s3ImageFunctions";
import {S3ControlFunctions} from "@typeJS/scratchjs/s3ControlFunctions";
import {S3ExtensionsFunctions} from "@typeJS/scratchjs/s3ExtensionsFunctions";
import {S3SensingFunctions} from "@typeJS/scratchjs/s3SensingFunctions";
import {S3EventFunctions} from "@typeJS/scratchjs/s3EventFunctions";
import {S3SoundFunctions} from "@typeJS/scratchjs/s3SoundFunctions";
import {S3LooksFunctions} from "@typeJS/scratchjs/s3LooksFunctions";
import {S3LotationStyle} from "@typeJS/scratchjs/s3Libs";

/** イベント処理 */
declare interface S3SpriteEventFunctions extends S3EventFunctions{

}
/** スプライトの制御用 */
declare interface S3SpriteControlFunctions extends S3ControlFunctions{
    /** クローンを作る */
    clone(option?:S3CloneOption): Promise<S3Sprite>
    /** クローンされたとき */
    whenCloned( func: CallableFunction ): void;
    /** 削除する */
    remove() : void;
    /** スプライトが生きている */
    alive() : boolean;
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
declare interface S3MotionFunctions {
    /** 現在位置を取得する */
    getCurrentPosition(): {x: number, y: number};
    /** 指定した距離分移動させる（向きの方向へ） */
    moveSteps(step: number): void;
    /** 指定した位置へ移動させる */
    moveTo(x: number | {x:number,y:number}, y?: number): void;
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
    setRotationStyle(rotationStyle: S3LotationStyle  ) : void;
    /** 指定した位置へ移動 */
    gotoXY(x: number | {x:number,y:number}, y?:number) : void;
    /** 右側回転 */
    turnRightDegrees(degree:number): void;
    /** 左側回転 */
    turnLeftDegrees(degree:number): void;
    /** 位置を指定する */
    setXY(x:number|{x:number,y:number}, y?:number): void;
    /** X座標を指定する */
    setX(x: number) : void;
    /** Y座標を指定する */
    setY(y: number) : void;
    /** X座標を〇ずつ変える */
    changeX( x: number) : void;
    /** Y座標を〇ずつ変える */
    changeY( y: number) : void;

}
/** 調べる系メソッド */
declare interface S3SpriteSensingFunctions extends S3SensingFunctions {
    /** 端に触れたとき */
    isTouchingEdge(): boolean;
    /** 左右の端に触れたとき */
    isTouchingVirticalEdge(): boolean;
    /** 上下の端に触れたとき */
    isTouchingHorizontalEdge(): boolean;
    /** マウスカーソルが触れていないとき */
    isNotMouseTouching(): boolean;
    /** マウスカーソルが触れたとき */
    isMouseTouching(): boolean;
    /** 指定したスプライトが触れたとき */
    isTouchingTargetToTarget(sprite:S3Sprite): boolean;
    /** 触れているスプライトを取得する */
    getTouchingTarget(): S3Sprite[];
    /** 指定したターゲットに触れているか否かを返す */
    isTouchingTarget(target: S3Sprite): boolean;

}

/** フキダシのプロパティ */
declare interface SayProperty {
    /** フキダシのサイズ */
    scale: {x: number, y: number};
}
/** サイズプロパティ */
declare interface SizeProperty {
    /** サイズ横 */
    x: number, 
    /** サイズ縦 */
    y: number;
}
declare interface S3SpriteLooksFunctions extends S3LooksFunctions{
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
    /** 大きさを変える */
    changeSizeBy(x: number | SizeProperty, y?:number ):void;
    /** サイズを取得する */
    getSize() : SizeProperty;
    /** サイズを設定する */
    setSize(x: number | SizeProperty, y?: number): void;
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
    
}