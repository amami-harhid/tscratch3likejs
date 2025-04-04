declare interface S3SoundProperties {
    "volume"?: number;
    "pitch"?: number;
}

/** サウンドメソッド */
export interface S3SoundFunctions {
    /** サウンド追加 */
    /**
     * ロード済のサウンドを追加する
     * @param soundName サウンド名
     */
    add(soundName: string) : Promise<any>;
    /**
     * サウンドを切り替える
     * @param soundName サウンド名
     */
    switch(soundName: string): void;
    /**
     * 次のサウンドに切り替える
     */
    next(): void;
    /**
     * サウンドを鳴らす
     * @param soundName サウンド名
     */
    play(soundName: string): void;
    /**
     * 終わるまでサウンドを鳴らす
     * @param soundName サウンド名
     */
    playUntilDone(soundName: string): Promise<void>;
    /**
     * サウンドの効果を設定する
     * @param key 効果キー
     * @param value 量
     */
    setOption(key: string, value: number): Promise<void>;
    /**
     * サウンドの効果をなくす
     */
    clearEffects() : Promise<void>;
    /**
     * サウンドを停止する
     */
    stop(): void;
    /**
     * サウンドを即時に停止する
     */
    stopImmediately(): void;
}
