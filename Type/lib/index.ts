import { TPosition } from "../common/typeCommon";
import { ImageEffective } from "../entity/ImageEffective";
import { RotationStyle } from "../entity/RotationStyle";
import { SoundOption } from "../entity/SoundOption";
import { I_KEYBOARD_KEYS } from "../io/IKeyboard";
import { IMonitors } from "../monitors";
import { SSprite } from "../sprite";
import { SStage } from "../stage";

/**
 * Lib
 */
export interface Lib {

    get Keyboard ():I_KEYBOARD_KEYS;
    get ImageEffective (): typeof ImageEffective;
    get SoundOption (): typeof SoundOption;
    get RotationStyle (): typeof RotationStyle;
    get Monitors (): IMonitors;
    get MathUtil ();
    /**
     * 指定したkeyが押されているとき TRUE
     * key 省略時は 何かのキーが押されているとき TRUE
     * @param {*} key 
     * @returns {boolean} TRUE/FALSE
     * @internal
     */
    keyIsDown(key?: string): boolean;
    /**
     * 指定したkeyが押されていないとき TRUE
     * key 省略時は 何かのキーが押されていないとき TRUE
     * 
     * @param {*} key 
     * @returns TRUE/FALSE
     */
    keyIsNotDown(key:string): boolean;
    /**
     * 何かのキーが押されているとき TRUE
     * @returns TRUE/FALSE
     */
    anyKeyIsDown(): boolean;
    /**
     * マウスが押されているとき TRUE
     * @returns 
     */
    mouseIsPressed(): boolean;
    /**
     * ステージ幅
     */
    get stageWidth (): number;
    /**
     * ステージ高さ
     */
    get stageHeight (): number;
    /**
     * mousePosition ( on canvas )
     */
    get mousePosition (): TPosition;
    get randomPoint (): TPosition;
    get randomDirection (): number;
    /**
     * 
     * @param from {number} ランダム範囲の最小値
     * @param to {number} ランダム範囲の最大値
     * @param forceAsDecimal {boolean} False/省略時は整数、True時は10進数
     * @returns 
     */
    getRandomValueInRange( from:number , to:number, forceAsDecimal?:boolean ): number;
    get Stage (): SStage;
    get Sprite (): SSprite;
    get Utils ();

    /**
     * 条件成立する間、待つ
     * @param condition {CallableFunction} 条件式を返す関数
     * @param entity {object} condition内のthisを指すオブジェクト
     */
    waitWhile( condition: CallableFunction, entity: object):Promise<void>;
    /**
     * 条件成立するまで待つ
     * @param condition {CallableFunction} 条件式を返す関数
     * @param entity {object} condition内のthisを指すオブジェクト
     */
    waitUntil( condition: CallableFunction , entity: object): Promise<void>;
    /**
     * 繰り返し回数のイテレーター(Generator)
     * @param n {number} - 繰り返し回数
     */
    Iterator(n:number): Generator<number>;
}