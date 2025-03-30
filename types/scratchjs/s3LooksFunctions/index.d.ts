/** 見た目系メソッド */
export interface S3LooksFunctions {
    /** 画像効果を指定した値分変える */
    changeEffectBy(effectType: string, value: number) : void;
    /** 画像効果を指定した値にする */
    setEffect(effectType: string, value: number): void;
    /** 画像効果をなくす */
    clearEffects(): void;
    /** 次の背景にする */
    nextBackdrop(): void;
    /** 指定した名前(または番号)で背景を切り替える */
    switchBackdrop(backdrop: string | number): void;
}
