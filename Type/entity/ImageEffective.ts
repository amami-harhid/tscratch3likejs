/** イメージ効果 */
export const ImageEffective = {
    /**
     * 色の効果
     */
    COLOR: 'color',
    /**
     * 魚眼レンズの効果
     */
    FISHEYE: 'fisheye',
    /**
     * 渦巻きの効果
     */
    WHIRL: 'whirl',
    /**
     * ピクセル化の効果
     */
    PIXELATE: 'pixelate',
    /**
     * モザイクの効果
     */
    MOSAIC: 'mosaic',
    /**
     * 明るさの効果
     */
    BRIGHTNESS: 'brightness',
    /**
     * 幽霊の効果
     */ 
    GHOST: 'ghost',
} as const;

export type TypeImageEffective = typeof ImageEffective[keyof typeof ImageEffective];
