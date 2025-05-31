import type { IStageBackdrop } from './IStageBackdrop';
import { IStageEffect } from '@Type/stage/IStageEffect';
/**
 * Sprite Looks(見た目)
 */
export interface IStageLooks {
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): IStageBackdrop;

    /**
     * 効果
     */
    get Effect() : IStageEffect;

};

