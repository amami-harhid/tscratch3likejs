import { Stage} from '../stage';
import { StageSensingKey } from './stageSensingKey';
import { StageSensingMouse } from './stageSensingMouse';
import { StageSensingTimer } from './stageSensingTimer';
import type { IStageSensing } from '@Type/stage/IStageSensing';
import type { IEntitySensingMouse } from '@Type/entity/IEntitySensingMouse';
import type { IEntitySensingKey } from '@Type/entity/IEntitySensingKey';
import type { IEntitySensingTimer } from '@Type/entity/IEntitySensingTimer';
/**
 * Stage Sensing(調べる)
 */
export class StageSensing implements IStageSensing {
    private entity: Stage;
    private key: IEntitySensingKey;
    private mouse: IEntitySensingMouse;
    private timer: IEntitySensingTimer;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        this.entity = entity;
        this.key = new StageSensingKey(entity);
        this.mouse = new StageSensingMouse(entity);
        this.timer = new StageSensingTimer(entity);
    }
    /**
     * 質問をする
     * @param question {string} - 質問テキスト
     * @returns {Promise<string>} - answer
     */
    async askAndWait(question:string): Promise<string>{
        const answer = await this.entity.$askAndWait(question);
        return answer;
    }
    /**
     * Key 関連
     */
    get Key() : IEntitySensingKey {
        return this.key;
    }
    /**
     * マウス関連
     */
    get Mouse(): IEntitySensingMouse {
        return this.mouse;
    }
    /**
     * タイマー関連
     */
    get Timer(): IEntitySensingTimer {
        return this.timer;
    }
};