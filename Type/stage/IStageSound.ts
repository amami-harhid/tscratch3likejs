import type { IEntitySound } from "../entity/IEntitySound";
/**
 * Stage Sound(サウンド)
 */
export interface IStageSound extends IEntitySound {

    /**
     * 音を追加する
     * @param soundName 
     */
    set(soundName: string) : void;

}