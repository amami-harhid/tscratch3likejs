export type IMathUtil = {
    /**
     * Convert a value from degrees to radians.
     * @param deg 
     */
    degToRad (deg: number) :number;
    /**
     * Convert a value from radians to degrees.
     * @param rad 
     */
    radToDeg (rad: number): number;
    /**
     * Clamp a number between two limits.
     * If n < min, return min. If n > max, return max. Else, return n.
     * @param n 
     * @param min 
     * @param max 
     * @returns - Value of n clamped to min and max.
     */
    clamp (n: number, min: number, max: number): number;
    /**
     * Keep a number between two limits, wrapping "extra" into the range.
     * e.g., wrapClamp(7, 1, 5) == 2
     * wrapClamp(0, 1, 5) == 5
     * wrapClamp(-11, -10, 6) == 6, etc.
     * @param n - Number to wrap.
     * @param min - Minimum limit.
     * @param max - Maximum limit.
     * @returns - Value of n wrapped between min and max.
     */
    wrapClamp (n: number, min: number, max: number): number;
    /**
     * Convert a value from tan function in degrees.
     * @param angle 
     */
    tan (angle: number): number;
    /**
     * Given an array of unique numbers,
     * returns a reduced array such that each element of the reduced array
     * represents the position of that element in a sorted version of the
     * original array.
     * E.g. [5, 19. 13, 1] => [1, 3, 2, 0]
     * @param elts 
     */
    reducedSortOrdering (elts: number[]): number[]
}