/** 見た目系メソッド */
export interface S3LooksFunctions {
    /** 画像効果を指定した値分変える */
    changeEffectBy(effectType: string, value: number) : void;
    /** 画像効果を指定した値にする */
    setEffect(effectType: string, value: number): void;
    /** 画像効果をなくす */
    clearEffects(): void;
}
