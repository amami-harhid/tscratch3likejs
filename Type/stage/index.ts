/**
 * Stage
 */
import { IEntity } from '@Type/entity/IEntity';
import { TEntityOptions } from '@Type/entity/TEntityOptions';
//import { ISprite } from '@Type/sprite';
import { IStageLooks } from './IStageLooks';
import { IStageControl } from './IStageControl';
import { IStageSensing } from './IStageSensing';
import { IStageEvent } from './IStageEvent';
import { IStageImage } from './IStageImage';
import { IStageSound } from './IStageSound';
import { ISvgText } from '@Type/svgText/ISvgText';
import { IStageFont } from './IStageFont';

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