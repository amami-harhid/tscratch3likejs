/**
 * S3Silhouette (ScratchRenderからの流用)
 * 正直、Silhouetteの用途は理解できていないが、Skinには必要なので用意したもの。
 * 
 * @fileoverview
 * A representation of a Skin's silhouette that can test if a point on the skin
 * renders a pixel where it is drawn.
 */
import type { TVec3 } from "../common/typeCommon";

declare type TBitMapData = ImageData|HTMLCanvasElement|HTMLImageElement;

/**
 * <canvas> element used to update Silhouette data from skin bitmap data.
 * @type {HTMLCanvasElement}
 */
let __SilhouetteUpdateCanvas: HTMLCanvasElement;

// Optimized Math.min and Math.max for integers;
// taken from https://web.archive.org/web/20190716181049/http://guihaire.com/code/?p=549
const intMin = (i, j) => j ^ ((i ^ j) & ((i - j) >> 31));
const intMax = (i, j) => i ^ ((i ^ j) & ((i - j) >> 31));

/**
 * Internal helper function (in hopes that compiler can inline).  Get a pixel
 * from silhouette data, or 0 if outside it's bounds.
 * @private
 * @param {Silhouette} silhouette - has data width and height
 * @param {number} x - x
 * @param {number} y - y
 * @return {number} Alpha value for x/y position
 */
const getPoint = (shilhouse, x, y) => {
    // 0 if outside bounds, otherwise read from data.
    if (x >= shilhouse.width || y >= shilhouse.height || x < 0 || y < 0) {
        return 0;
    }
    return shilhouse.data[(((y * shilhouse.width) + x) * 4) + 3];
};

/**
 * Memory buffers for doing 4 corner sampling for linear interpolation
 */
const __cornerWork = [
    new Uint8ClampedArray(4),
    new Uint8ClampedArray(4),
    new Uint8ClampedArray(4),
    new Uint8ClampedArray(4)
];
/**
 * Get the color from a given silhouette at an x/y local texture position.
 * Multiply color values by alpha for proper blending.
 * @param {Silhouette} $0 The silhouette to sample.
 * @param {number} x X position of texture [0, width).
 * @param {number} y Y position of texture [0, height).
 * @param {Uint8ClampedArray} dst A color 4b space.
 * @return {Uint8ClampedArray} The dst vector.
 */
const getColor4b = (shilhouse:S3Silhouette, x:number, y:number, dst:Uint8ClampedArray):Uint8ClampedArray => {
    // Clamp coords to edge, matching GL_CLAMP_TO_EDGE.
    // (See github.com/LLK/scratch-render/blob/954cfff02b08069a082cbedd415c1fecd9b1e4fb/src/BitmapSkin.js#L88)
    x = intMax(0, intMin(x, shilhouse.width - 1));
    y = intMax(0, intMin(y, shilhouse.height - 1));

    // 0 if outside bounds, otherwise read from data.
    if (x >= shilhouse.width || y >= shilhouse.height || x < 0 || y < 0) {
        return dst.fill(0);
    }
    const offset = ((y * shilhouse.width) + x) * 4;
    // premultiply alpha
    const alpha = shilhouse.data[offset + 3] / 255;
    dst[0] = shilhouse.data[offset] * alpha;
    dst[1] = shilhouse.data[offset + 1] * alpha;
    dst[2] = shilhouse.data[offset + 2] * alpha;
    dst[3] = shilhouse.data[offset + 3];
    return dst;
};

/**
 * Get the color from a given silhouette at an x/y local texture position.
 * Do not multiply color values by alpha, as it has already been done.
 * @param {Silhouette} $0 The silhouette to sample.
 * @param {number} x X position of texture [0, width).
 * @param {number} y Y position of texture [0, height).
 * @param {Uint8ClampedArray} dst A color 4b space.
 * @return {Uint8ClampedArray} The dst vector.
 */
const getPremultipliedColor4b = (shilhouse: S3Silhouette, x: number, y: number, dst: Uint8ClampedArray): Uint8ClampedArray => {
    // Clamp coords to edge, matching GL_CLAMP_TO_EDGE.
    x = intMax(0, intMin(x, shilhouse.width - 1));
    y = intMax(0, intMin(y, shilhouse.height - 1));

    const offset = ((y * shilhouse.width) + x) * 4;
    dst[0] = shilhouse.data[offset];
    dst[1] = shilhouse.data[offset + 1];
    dst[2] = shilhouse.data[offset + 2];
    dst[3] = shilhouse.data[offset + 3];
    return dst;
};

export class S3Silhouette {
    private _width: number;
    private _height: number;
    private _colorData: Uint8ClampedArray|null;
    private _getColor: (shilhouse: S3Silhouette, x: number, y: number, dst: Uint8ClampedArray) => Uint8ClampedArray;
    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
    get data(){
        if(this._colorData == undefined) throw 'color data undefined error';
        return this._colorData;
    }
    constructor () {
        /**
         * The width of the data representing the current skin data.
         * @type {number}
         */
        this._width = 0;

        /**
         * The height of the data representing the current skin date.
         * @type {number}
         */
        this._height = 0;

        /**
         * The data representing a skin's silhouette shape.
         * @type {Uint8ClampedArray}
         */
        this._colorData = null;

        // By default, silhouettes are assumed not to contain premultiplied image data,
        // so when we get a color, we want to multiply it by its alpha channel.
        // Point `_getColor` to the version of the function that multiplies.
        this._getColor = getColor4b;

        this.colorAtNearest = this.colorAtLinear = (_, dst) => dst.fill(0);
    }

    /**
     * Update this silhouette with the bitmapData for a skin.
     * @param {TBitMapData} bitmapData An image, canvas or other element that the skin
     * @param {boolean} isPremultiplied True if the source bitmap data comes premultiplied (e.g. from readPixels).
     * rendering can be queried from.
     */
    update (bitmapData: TBitMapData, 
                isPremultiplied: boolean = false): void {
        let imageData: ImageData;
        if (bitmapData instanceof ImageData) {
            // If handed ImageData directly, use it directly.
            imageData = bitmapData;
            this._width = bitmapData.width;
            this._height = bitmapData.height;
        } else {
            // Draw about anything else to our update canvas and poll image data
            // from that.
            const canvas = S3Silhouette._updateCanvas();
            const width = this._width = canvas.width = bitmapData.width;
            const height = this._height = canvas.height = bitmapData.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            if (!(width && height)) {
                return;
            }
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(bitmapData, 0, 0, width, height);
            imageData = ctx.getImageData(0, 0, width, height);
        }

        if (isPremultiplied) {
            this._getColor = getPremultipliedColor4b;
        } else {
            this._getColor = getColor4b;
        }

        this._colorData = imageData.data;
        // delete our custom overriden "uninitalized" color functions
        // let the prototype work for itself
        delete this.colorAtNearest;
        delete this.colorAtLinear;
    }

    /**
     * Sample a color from the silhouette at a given local position using
     * "nearest neighbor"
     * @param {twgl.v3.Vec3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtNearest? (vec:TVec3, dst: Uint8ClampedArray): Uint8ClampedArray {
        return this._getColor(
            this,
            Math.floor(vec[0] * (this._width - 1)),
            Math.floor(vec[1] * (this._height - 1)),
            dst
        );
    }

    /**
     * Sample a color from the silhouette at a given local position using
     * "linear interpolation"
     * @param {twgl.v3.Vec3} vec [x,y] texture space (0-1)
     * @param {Uint8ClampedArray} dst The memory buffer to store the value in. (4 bytes)
     * @returns {Uint8ClampedArray} dst
     */
    colorAtLinear? (vec: TVec3, dst: Uint8ClampedArray): Uint8ClampedArray {
        const x = vec[0] * (this._width - 1);
        const y = vec[1] * (this._height - 1);

        const x1D = x % 1;
        const y1D = y % 1;
        const x0D = 1 - x1D;
        const y0D = 1 - y1D;

        const xFloor = Math.floor(x);
        const yFloor = Math.floor(y);

        const x0y0 = this._getColor(this, xFloor, yFloor, __cornerWork[0]);
        const x1y0 = this._getColor(this, xFloor + 1, yFloor, __cornerWork[1]);
        const x0y1 = this._getColor(this, xFloor, yFloor + 1, __cornerWork[2]);
        const x1y1 = this._getColor(this, xFloor + 1, yFloor + 1, __cornerWork[3]);

        dst[0] = (x0y0[0] * x0D * y0D) + (x0y1[0] * x0D * y1D) + (x1y0[0] * x1D * y0D) + (x1y1[0] * x1D * y1D);
        dst[1] = (x0y0[1] * x0D * y0D) + (x0y1[1] * x0D * y1D) + (x1y0[1] * x1D * y0D) + (x1y1[1] * x1D * y1D);
        dst[2] = (x0y0[2] * x0D * y0D) + (x0y1[2] * x0D * y1D) + (x1y0[2] * x1D * y0D) + (x1y1[2] * x1D * y1D);
        dst[3] = (x0y0[3] * x0D * y0D) + (x0y1[3] * x0D * y1D) + (x1y0[3] * x1D * y0D) + (x1y1[3] * x1D * y1D);

        return dst;
    }

    /**
     * Test if texture coordinate touches the silhouette using nearest neighbor.
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} If the nearest pixel has an alpha value.
     */
    isTouchingNearest (vec: TVec3): boolean {
        if (!this._colorData) return false;
        return getPoint(
            this,
            Math.floor(vec[0] * (this._width - 1)),
            Math.floor(vec[1] * (this._height - 1))
        ) > 0;
    }

    /**
     * Test to see if any of the 4 pixels used in the linear interpolate touch
     * the silhouette.
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} Any of the pixels have some alpha.
     */
    isTouchingLinear (vec: TVec3): boolean {
        if (!this._colorData) return false;
        const x = Math.floor(vec[0] * (this._width - 1));
        const y = Math.floor(vec[1] * (this._height - 1));
        return getPoint(this, x, y) > 0 ||
            getPoint(this, x + 1, y) > 0 ||
            getPoint(this, x, y + 1) > 0 ||
            getPoint(this, x + 1, y + 1) > 0;
    }

    /**
     * Get the canvas element reused by Silhouettes to update their data with.
     * @private
     * @return {HTMLCanvasElement} A canvas to draw bitmap data to.
     */
    static _updateCanvas () : HTMLCanvasElement{
        if (typeof __SilhouetteUpdateCanvas === 'undefined') {
            __SilhouetteUpdateCanvas = document.createElement('canvas');
        }
        return __SilhouetteUpdateCanvas;
    }
}