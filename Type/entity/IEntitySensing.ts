import type { IEntitySensingMouse } from './IEntitySensingMouse';
import type { IEntitySensingKey } from './IEntitySensingKey';
import type { IEntitySensingTimer } from './IEntitySensingTimer';
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
     * マウス関連
     */
    readonly Mouse: IEntitySensingMouse;

    /**
     * キーボード関連
     */
    readonly Key : IEntitySensingKey;
    /**
     * タイマー関連
     */
    readonly Timer : IEntitySensingTimer;
};