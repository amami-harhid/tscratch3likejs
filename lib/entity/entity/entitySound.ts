import { Entity } from '../entity';
import type { IEntitySound } from '../../../Type/entity/IEntitySound';
import { SoundOption } from '../../../Type/entity/SoundOption';
/** イベント */
export class EntitySound implements IEntitySound {

    protected entity: Entity;
    /**
     * @internal
     * @param entity {Entity}
     */
    constructor(entity:Entity){
        this.entity = entity;
    }
    /**
     * 音を追加する
     * @param soundName {string} - 音の名前
     */
    add(soundName: string) : void {
        this.entity.$setSound(soundName);
    }
    
    /**
     * 音を鳴らす
     * @param soundName {string} - 音の名前
     */
    play(soundName: string): void {
        this.entity.$soundPlay(soundName);
    }
    /**
     * 終わるまで音を鳴らす
     * @param soundName {string} - 音の名前
     */
    async playUntilDone(soundName: string): Promise<void> {
        await this.entity.$startSoundUntilDone(soundName);
    }
    /**
     * サウンドオプションを設定する
     * @param key {SoundOption} - サウンドオプションキー
     * @param value {number} - オプション値
     * 
     * {@link SoundOption}
     */
    setOption(key: SoundOption, value:number): void{
        this.entity.$setOption(key, value);
    }
    /**
     * サウンドオプションを指定値ずつ変える
     * @param key {SoundOption} - サウンドオプションキー
     * @param value {number} - オプション値
     * 
     * {@link SoundOption}
     */
    async changeOptionValue(key: SoundOption, value:number): Promise<void>{
        await this.entity.$changeOptionValue(key,value);
    }
    /**
     * サウンドオプションをクリアする
     */
    async clearEffects(): Promise<void> {
        await this.entity.$clearSoundEffect();
    }
    /**
     * 鳴っている音を止める
     */
    stop(): void {
        this.entity.$soundStop();
    }
    /**
     * 鳴っている音を「すぐに」止める
     */
    stopImmediately(): void {
        this.entity.$soundStopImmediately();
    }
}