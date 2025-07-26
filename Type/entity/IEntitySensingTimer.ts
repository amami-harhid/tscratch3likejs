/**
 * Entity Sensing(調べる) Timer
 */
export interface IEntitySensingTimer {

    /**
     * タイマー値
     */
    readonly timer : number;
    /**
     * タイマーリセット
     */
    reset(): void;
};