/**
 * ペンサイズ
 */
export interface IPenSpriteSize {
    /** 
     * ペンの太さ 
     */
    get thickness() : number;

    /**
     * ペンの太さ
     */
    set thickness(thickness: number);
}