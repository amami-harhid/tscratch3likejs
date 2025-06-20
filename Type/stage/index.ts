/**
 * Stage
 */
import type { IEntity } from '@Type/entity/IEntity';
import type { TEntityOptions } from '@Type/entity/TEntityOptions';
//import { ISprite } from '@Type/sprite';
import type { IStageLooks } from './IStageLooks';
import type { IStageControl } from './IStageControl';
import type { IStageSensing } from './IStageSensing';
import type { IStageEvent } from './IStageEvent';
import type { IStageImage } from './IStageImage';
import type { IStageSound } from './IStageSound';
import type { ISvgText } from '@Type/svgText/ISvgText';
import type { IStageFont } from './IStageFont';

export type TStage = IStage;
export interface SStage extends IStage{
    new(options?:TEntityOptions):IStage;
}
export interface IStage extends IEntity {
    // /**
    //  * 全てのスプライトを配列で受け取る
    //  */
    // get sprites (): ISprite[];
    // /**
    //  * スプライトを削除する
    //  * @interface
    //  * @param sprite 
    //  */
    // removeSprite ( sprite: ISprite ): void;
    // update(): void;
    // draw(): void;

    /**
     * 見た目
     */
    readonly Looks : IStageLooks;
    /**
     * 制御
     */
    readonly Control : IStageControl;
    /**
     * 調べる
     */
    readonly Sensing : IStageSensing;
    /**
     * イベント
     */
    readonly Event : IStageEvent;
    /**
     * イメージ
     */
    readonly Image : IStageImage;

    /**
     * サウンド
     */
    readonly Sound : IStageSound;
    /**
     * Font
     */
    readonly Font : IStageFont;
    /**
     * SvgText
     */
    readonly SvgText: ISvgText;
};