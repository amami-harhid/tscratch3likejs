/**
 * Stage
 */
import { IEntity } from '@Type/entity/IEntity';
import { TEntityOptions } from '@Type/entity/TEntityOptions';
import { ISprite } from '@Type/sprite';
import { IStageLooks } from './IStageLooks';
import { IStageBackdrop } from './IStageBackdrop';
import { IStageControl } from './IStageControl';
import { IStageSensing } from './IStageSensing';
import { IStageEvent } from './IStageEvent';
import { IStageImage } from './IStageImage';
import { IStageSound } from './IStageSound';

export type IStage = Stage;
export interface Stage extends IEntity {
    new(options?:TEntityOptions):IStage;
    get sprites (): ISprite[];
    removeSprite ( sprite: ISprite ): void;
    update(): void;
    draw(): void;
    /**
     * 背景
     */
    get Backdrop(): IStageBackdrop;
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
};