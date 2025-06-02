/**
 * Entity Sensing(調べる)
 */
export interface IEntitySensing {
    /**
     * 質問をして答えを待つ
     * @param question {string} - 質問テキスト
     * @returns {Promise<string>} - answer
     */
    askAndWait(question:string): Promise<string>;
    /**
     * キーが押されていることの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyDown(key: string) : boolean;
    /**
     * キーが押されていないことの判定
     * @param key {string}
     * @returns {boolean} キー押下判定
     */
    isKeyNotDown(key: string) : boolean;
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    isMouseDown() : boolean;
    /**
     * マウス情報
     */
    get Mouse() : {x:number, y:number};

    /**
     * タイマー値
     */
    get timer() : number;
    /**
     * タイマーリセット
     */
    resetTimer(): void;

};