/** サウンド効果 */
export enum SoundOption {
    /**
     * 音量
     */
    VOLUME = "volume",
    /**
     * ピッチ
     */
    PITCH = "pitch",

} ;

type EnumKeys = keyof typeof SoundOption;
type EnumKeyFields = {[key in EnumKeys]:string};
export type ISoundOption = EnumKeyFields