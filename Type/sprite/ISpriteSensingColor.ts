/**
 * Sprite Sensing(調べる) Color
 */
export interface ISpriteSensingColor{
 
    /**
     * 指定した色に触れたことを判定する
     * @param targetColor {string} - 色,先頭#,16進数
     * @returns 
     */
    isTouching(targetColor: string): boolean;

    /**
     * 指定した色(target)に自身の色(mask)が触れたことを判定する
     * @param ownColor {string} - 自身の色,先頭#,16進数
     * @param targetColor {string} - 相手の色,先頭#,16進数
     * @returns 
     */
    isTouchingBy(ownColor: string, targetColor: string): boolean;

};