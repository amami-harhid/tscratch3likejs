/**
 * S3Silhouette (ScratchRenderからの流用)
 * 正直、Silhouetteの用途は理解できていないが、Skinには必要なので用意したもの。
 * 
 * @fileoverview
 * A representation of a Skin's silhouette that can test if a point on the skin
 * renders a pixel where it is drawn.
 */
import type { TVec3 } from "../../common/typeCommon";

export type TBitMapData = ImageData|HTMLCanvasElement|HTMLImageElement;

export interface ISilhouette {
    readonly width: number;
    readonly height: number;
    readonly data : Uint8ClampedArray<ArrayBufferLike>;
    /**
     * Update this silhouette with the bitmapData for a skin.
     * @param {TBitMapData} bitmapData An image, canvas or other element that the skin
     * @param {boolean} isPremultiplied True if the source bitmap data comes premultiplied (e.g. from readPixels).
     * rendering can be queried from.
     */
    update (bitmapData: TBitMapData, isPremultiplied?: boolean): void;

    /**
     * Sample a color from the silhouette at a given local position using
     * "nearest neighbor"
     * @param {twgl.v3.Vec3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtNearest? (vec:TVec3, dst: Uint8ClampedArray): Uint8ClampedArray;

    /**
     * Sample a color from the silhouette at a given local position using
     * "linear interpolation"
     * @param {twgl.v3.Vec3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtLinear? (vec: TVec3, dst: Uint8ClampedArray): Uint8ClampedArray;

    /**
     * Test if texture coordinate touches the silhouette using nearest neighbor.
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} If the nearest pixel has an alpha value.
     */
    isTouchingNearest (vec: TVec3): boolean;

    /**
     * Test to see if any of the 4 pixels used in the linear interpolate touch
     * the silhouette.
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} Any of the pixels have some alpha.
     */
    isTouchingLinear (vec: TVec3): boolean;
}