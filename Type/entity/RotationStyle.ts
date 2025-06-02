/**
 * 回転方向
 */
export enum RotationStyle {
    /** 左右のみ回転 */
    LEFT_RIGHT = 'left-right',
    
    /** 回転しない */
    DONT_ROTATE = 'do-not-rotate',
    
    /** 自由に回転 */
    ALL_AROUND = 'all-around',
};
type EnumKeys = keyof typeof RotationStyle;
type EnumKeyFields = {[key in EnumKeys]:string};
export type IRotationStyle = EnumKeyFields