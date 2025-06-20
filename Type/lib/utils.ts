import type { TPosition } from "../common/typeCommon";
import type { IEntity } from "../entity/IEntity";
/**
 * Utils
 */
export type IUtils = {
    /**
     * 距離を計算する
     * @param obj1 
     * @param obj2 
     */
    distance(obj1: TPosition, obj2: TPosition): number;
    /**
     * min,max の範囲でランダム値を取得する
     * min,max 両方とも整数の場合、min,maxを含む整数のランダム値を返す
     * 上記以外の場合は minを含みmaxを含まない範囲で小数値のランダム値を返す。
     * min,max のどちらかが数値でない場合は 0 を返す
     * 
     * @param min 
     * @param max 
     * @param forceAsDecimal 
     */
    randomizeInRange(min: number, max: number, forceAsDecimal?: boolean): number;
    /**
     * 数値判定
     * @param val 
     */
    isNumber( val: object ): boolean;
    /**
     * 整数判定
     * @param val 
     */
    isInteger( val: object ): boolean;
    /**
     * ミリ秒間待つ
     * @param milliSecond 
     */
    wait (milliSecond?: number): Promise<void>;
    /**
     * 条件式が成立するまで待つ
     * @param condition - 条件式
     * @param pace - 条件判定間隔( ミリ秒 )
     * @param bind - 条件式内の this に相当するインスタンス
     */
    waitUntil ( condition: CallableFunction, pace: number, bind: IEntity ) :Promise<void>
    /**
     * UUID を得る
     */
    generateUUID (): string;
};