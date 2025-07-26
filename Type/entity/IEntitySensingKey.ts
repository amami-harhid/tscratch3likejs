/**
 * Entity Sensing(調べる) Key
 */
export interface IEntitySensingKey {
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

};