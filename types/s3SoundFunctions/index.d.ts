import type { S3SoundOption } from "@typeJS/s3Libs";
// declare interface S3SoundProperties {
//     "volume"?: number;
//     "pitch"?: number;
// }

/** 音のメソッド */
export interface S3SoundFunctions {
    /**
     * ロード済のサウンドを追加する
     * @param soundName サウンド名
     * ```ts
     *  // このスプライトに音Chillを追加する
     *  this.Sound.add( Chill );
     * ```
     */
    add(soundName: string) : Promise<any>;
    // /**
    //  * サウンドを切り替える
    //  * @param soundName サウンド名
    //  */
    // switch(soundName: string): void;
    // /**
    //  * 次のサウンドに切り替える
    //  */
    // next(): void;
    /**
     * 音を鳴らす
     * @param soundName サウンド名
     * ```ts
     *  // Mew を鳴らす
     *  this.Sound.play( Mew );
     * ```
     */
    play(soundName: string): void;
    /**
     * 終わるまで音を鳴らす
     * @param soundName サウンド名
     * ```ts
     *  // Chill を終わるまで鳴らす
     *  await this.Sound.playUntilDone( Chill );
     * ```
     */
    playUntilDone(soundName: string): Promise<void>;
    /**
     * 音の効果を設定する
     *
     * @param key 効果のキー
     * @param value 量
     * 
     * ```ts
     *  // ボリューム= 100
     *  await this.Sound.setOption(Lib.SoundOption.VOLUME, 100);
     *  // ピッチ= -10
     *  await this.Sound.setOption(Lib.SoundOption.PITCH, -10);
     * ```
     * Lib.SoundOption {@link S3SoundOption}
     */
    setOption(key: string, value: number): Promise<void>;
    /**
     * 音の効果を value値ずつ変える。
     * @param key 
     * @param value 
     * 
     * ```ts
     *  // ボリューム= 10 ずつ変える
     *  await this.Sound.changeOptionValue(Lib.SoundOption.VOLUME, 10);
     *  // ピッチ= 10 ずつ変える
     *  await this.Sound.changeOptionValue(Lib.SoundOption.PITCH, 10);
     * ```
     * Lib.SoundOption {@link S3SoundOption}
     */
    changeOptionValue(key: string, value: number): Promise<void>;
    /**
     * サウンドの効果をなくす
     * ```ts
     *  this.Sound.clearEffects();
     * ```
     */
    clearEffects() : Promise<void>;
    /**
     * サウンドを停止する
     * ```ts
     *  this.Sound.stop();
     * ```
     */
    stop(): void;
    /**
     * サウンドを即時に停止する
     * ```ts
     *  this.Sound.stopImmediately();
     * ```
     */
    stopImmediately(): void;
}
