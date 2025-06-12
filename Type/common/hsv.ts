import { NumericRange } from "./numericRange";

/** 色相範囲 */
export type Hue = NumericRange<0, 360>;
/** 彩度範囲 */
export type Saturation = NumericRange<0, 100>;
/** 明度範囲 */
export type Brightness = NumericRange<0, 100>;
/** 透明度範囲 */
export type Transparency = NumericRange<0, 100>;