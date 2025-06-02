import type { IStageBackdrop } from './IStageBackdrop';
import { IStageEffect } from '@Type/stage/IStageEffect';
/**
 * Sprite Looks(見た目)
 */
export interface IStageLooks {
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     * ```ts
     *  // 次の背景にする
     *  this.Looks.Backdrop.next();
     * ```
     */
    get Backdrop(): IStageBackdrop;

    /**
     * 効果
     * ```ts
     *  // （例）色の効果を50にする
     *  this.Looks.Effect.set(ImageEffective.COLOR, 50);
     * ```
     */
    get Effect() : IStageEffect;

};

