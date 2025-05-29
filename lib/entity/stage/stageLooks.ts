import { Stage } from '../stage';
import { StageEffect } from './stageEffect';
import { StageBackdrop } from './stageBackdrop';
/**
 * Sprite Looks(見た目)
 */
export class StageLooks {
    private effect: StageEffect;
    private backdrop: StageBackdrop;
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
    get Backdrop(){
        return this.backdrop
    }
    /**
     * 効果
     */
    get Effect() : StageEffect {
        return this.effect;
    }

};

