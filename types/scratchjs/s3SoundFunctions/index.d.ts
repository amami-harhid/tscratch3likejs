declare interface S3SoundProperties {
    "volume"?: number;
    "pitch"?: number;
}

/** サウンドメソッド */
export interface S3SoundFunctions {
    /** サウンド追加 */
    add(sound: any) : Promise<any>;
    switch(name: string): void;
    next(): void;
    play(): void;
    playUntilDone(): Promise<any>;
    /** サウンドオプション設定 */
    setOption(key: string, value: number): Promise<any>;
    stop(): void;
    stopImmediately(): void;
}
