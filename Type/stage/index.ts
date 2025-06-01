/**
 * Stage
 */
import { IEntity } from '@Type/entity/IEntity';
import { TEntityOptions } from '@Type/entity/TEntityOptions';
import { ISprite } from '@Type/sprite';
import { IStageLooks } from './IStageLooks';
import { IStageControl } from './IStageControl';
import { IStageSensing } from './IStageSensing';
import { IStageEvent } from './IStageEvent';
import { IStageImage } from './IStageImage';
import { IStageSound } from './IStageSound';

export type TStage = IStage;
export interface SStage extends IStage{
    new(options?:TEntityOptions):IStage;
}
export interface IStage extends IEntity {
    get sprites (): ISprite[];
    removeSprite ( sprite: ISprite ): void;
    update(): void;
    draw(): void;
    /**
     * 見た目
     */
    get Looks(): IStageLooks;
    /**
     * 制御
     */
    get Control() : IStageControl;
    /**
     * 調べる
     */
    get Sensing() : IStageSensing;
    /**
     * イベント
     */
    get Event() : IStageEvent;
    /**
     * イメージ
     */
    get Image() : IStageImage;

    /**
     * サウンド
     */
    get Sound() : IStageSound;

    removeSprite(sprite: ISprite): void;
};