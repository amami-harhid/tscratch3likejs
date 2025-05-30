import{ RotationStyle } from '../entity/RotationStyle';
/**
 * 回転方法
 */
export interface ISpriteMotionRotation {
    /**
     * 回転方法
     * 
     * {@link TypeRotationStyle}
     */
    get style(): RotationStyle;
    /**
     * 回転方法
     * 
     * {@link TypeRotationStyle}
     */
    set style(style: RotationStyle);
};