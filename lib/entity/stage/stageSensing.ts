import { Stage} from '../stage';
/**
 * Stage Sensing(調べる)
 */
export class StageSensing {
    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        this.entity = entity;
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
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyDown(key: string) : boolean {
        return this.entity.$isKeyDown(key);
    }
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyNotDown(key: string) : boolean {
        return this.entity.$isKeyNotDown(key);
    }
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    isMouseDown() : boolean {
        return this.entity.$isMouseDown();
    }
    /**
     * マウス情報
     */
    get Mouse() {
        return this.entity.Mouse;
    }
    /**
     * タイマー値
     */
    get timer() {
        return this.entity.$timer;
    }
    /**
     * タイマーリセット
     */
    resetTimer() {
        this.entity.$resetTimer();
    }

        /**
     * マウスタッチしていないことの判定
     * @returns 
     */
    isNotMouseTouching() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isNotMouseTouching();
    }
    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    isMouseTouching(): boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isMouseTouching();
    }

};