import type { TPosition, TScale } from "../common/typeCommon";

/**
 * EntityOptions
 */
export type TEntityOptions = {
    position?: TPosition,
    scale?: TScale,
    direction?: number,
    effect?:TEntityEffects,
    visible?: boolean,

};

export type TEntityEffects = {
    color?: number,
    fisheye?: number,
    whirl?: number,
    pixelate?: number,
    mosaic?: number,
    brightness?: number,
    ghost?: number,
}