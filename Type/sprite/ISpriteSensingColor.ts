/**
 * Sprite Sensing(調べる) Color
 */
export interface ISpriteSensingColor{
 
    /**
     * 指定した色に触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouchingTo(target: string): boolean;

    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param target {string} - 色,先頭#,16進数
     * @param mask {string} - 色,先頭#,16進数
     * @returns 
     */
    colorIsTouchingTo(target: string, mask: string): boolean;

};