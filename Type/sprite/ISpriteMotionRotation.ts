import type { TypeRotationStyle } from '../entity/TRotationStyle';
/**
 * 回転方法
 */
export interface ISpriteMotionRotation {
    /**
     * 回転方法
     * 
     * {@link TypeRotationStyle}
     */
    get style(): TypeRotationStyle;
    /**
     * 回転方法
     * 
     * {@link TypeRotationStyle}
     */
    set style(style: TypeRotationStyle);
};