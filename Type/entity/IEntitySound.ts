import { SoundOption } from "./SoundOption";
/** イベント */
export interface IEntitySound {

    /**
     * 音を追加する
     * @param soundName {string} - 音の名前
     */
    add(soundName: string) : void;

    /**
     * 音を鳴らす
     * @param soundName {string} - 音の名前
     */
    play(soundName: string): void;
    /**
     * 終わるまで音を鳴らす
     * @param soundName {string} - 音の名前
     */
    playUntilDone(soundName: string): Promise<void>;
    /**
     * サウンドオプションを設定する
     * @param key {TypeSoundOption} - サウンドオプションキー
     * @param value {number} - オプション値
     * 
     * {@link SoundOption}
     */
    setOption(key: SoundOption, value:number): void;
    /**
     * サウンドオプションを指定値ずつ変える
     * @param key {TypeSoundOption} - サウンドオプションキー
     * @param value {number} - オプション値
     * 
     * {@link TypeSoundOption}
     */
    changeOptionValue(key: SoundOption, value:number): Promise<void>;
    /**
     * サウンドオプションをクリアする
     */
    clearEffects(): Promise<void>;
    /**
     * 鳴っている音を止める
     */
    stop(): void;
    /**
     * 鳴っている音を「すぐに」止める
     */
    stopImmediately(): void;
}