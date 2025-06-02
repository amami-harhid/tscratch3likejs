export type NumericRange<
  START extends number,   // STARTは開始の数値を表すパラメータで、number型を拡張します。
  END extends number,    // ENDは終了の数値を表すパラメータで、number型を拡張します。
  ARR extends unknown[] = [],    // ARRはunknown型の配列を表すパラメータで、デフォルトは空の配列です。
  ACC extends number = never  // ACCは累積値を表すパラメータで、number型を拡張します。デフォルトはnever型です。
> = ARR['length'] extends END
  ? ACC | START | END   // ARRの長さがENDと等しい場合、ACC、START、ENDのいずれかの型を返します。
  : NumericRange<    // ARRの長さがENDと等しくない場合、NumericRange型を再帰的に呼び出します。
      START,
      END,
      [...ARR, 1],  // ARRに1を追加します。これにより、ARRの長さが増えます。
      ARR[START] extends undefined ? ACC : ACC | ARR['length']  // STARTの位置に要素が存在しない場合、ACCをそのまま引き継ぎ、存在する場合、ACCとARRの長さのいずれかの型を返します。 
    >