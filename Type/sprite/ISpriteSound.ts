import type { IEntitySound } from "../entity/IEntitySound";
/**
 * Sprite Sound(サウンド)
 */
export interface ISpriteSound extends IEntitySound {

    /**
     * 音を追加する
     * @param soundName 
     */
    set(soundName: string) : void;

}