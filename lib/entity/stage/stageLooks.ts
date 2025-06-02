import { Stage } from '../stage';
import { StageEffect } from './stageEffect';
import { StageBackdrop } from './stageBackdrop';
import { IStageBackdrop } from '@Type/stage/IStageBackdrop';
import { IStageEffect } from '@Type/stage/IStageEffect';
/**
 * Sprite Looks(見た目)
 */
export class StageLooks {
    private effect: IStageEffect;
    private backdrop: IStageBackdrop;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Stage){
        this.effect = new StageEffect(entity);
        this.backdrop = new StageBackdrop(entity);
    }
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): IStageBackdrop {
        return this.backdrop
    }
    /**
     * 効果
     */
    get Effect() : IStageEffect {
        return this.effect;
    }

};

