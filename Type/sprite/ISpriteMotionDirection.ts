export interface ISpriteMotionDirection {
    /**
     * 向き
     * @returns {number} - 向き
     */
    get degree() : number;

    /**
     * 向き
     * @param degree {number} - 向き
     */
    set degree(degree: number);
};