/**
 * S3MonitorSkin
 */
import { IMeasurementProvider } from "../../util/IMeasurementProvider";
import type { IDrawable } from "../../render/IDrawable";
import type { TSize, TVec3 } from "../../common/typeCommon";

declare type TUniform = {
    /**
     * The nominal (not necessarily current) size of the current skin.
     * @type {Array<number>}
     */
    u_skinSize: number[],

    /**
     * The actual WebGL texture object for the skin.
     * @type {WebGLTexture}
     */
    u_skin: WebGLTexture|null,    
}
export interface IMonitorSkin {
    
    dropping : boolean;

    /**
     * @returns {CanvasRenderingContext2D}
     */
    createCanvas() : CanvasRenderingContext2D;

    getDefaultHeight(): void;
    /**
     * Dispose of this object. Do not use it after calling this method.
     */
    dispose (): void;

    /**
     * @return {int} the unique ID for this Skin.
     */
    readonly id: number;

    readonly rotationCenter : TVec3;

    /**
     * @return {Array<number>} the "native" size, in texels, of this skin.
     */
    readonly size : number[];

    /**
     * Should this skin's texture be filtered with nearest-neighbor or linear interpolation at the given scale?
     * @param {?Array<Number>} scale The screen-space X and Y scaling factors at which this skin's texture will be
     * displayed, as percentages (100 means 1 "native size" unit is 1 screen pixel; 200 means 2 screen pixels, etc).
     * @param {IDrawable} drawable The drawable that this skin's texture will be applied to.
     * @return {boolean} True if this skin's texture, as returned by {@link getTexture}, should be filtered with
     * nearest-neighbor interpolation.
     */
    useNearest (scale: number[], drawable: IDrawable) :boolean;

    x:number;

    y:number;

    /**
     * textAreaSize
     * @return {{width:number, height:number}} textAreaSize 
     */
    readonly textAreaSize: TSize;

    /**
     * Get the center of the current bounding box
     * @returns {Array<number>} the center of the current bounding box
     */
    calculateRotationCenter (): number[];

    /**
     * @returns {HTMLCanvasElement}
     */
    readonly canvas : HTMLCanvasElement;

    /**
     * @returns {CanvasRenderingContext2D}
     */
    readonly ctx: CanvasRenderingContext2D;

    /**
     * @returns {IMeasurementProvider}
     */
    readonly measurementProvider: IMeasurementProvider;

    /**
     * @param {Array<number>} scale - The scaling factors to be used.
     * @return {WebGLTexture} The GL texture representation of this skin when drawing at the given size.
     */
    getTexture (scale: number[]) :WebGLTexture;

    /**
     * If the skin defers silhouette operations until the last possible minute,
     * this will be called before isTouching uses the silhouette.
     */
    updateSilhouette (scale : number[]): void;
    
    /**
     * Set this skin's texture to the given image.
     * @param {ImageData|HTMLCanvasElement} textureData - The canvas or image data to set the texture to.
     */
    _setTexture (textureData: ImageData|HTMLCanvasElement): void;

    show() :void;

    hide() :void;

    /**
     * Set parameters for this text monitor.
     * @param {string|number} value 
     */
    value : string|number;

    _restyleCanvas (): void;

    /**
     * Update the array of wrapped lines and the text dimensions.
     */
    _reflowLines (): void;

    /**
     * Render this text monitor at a certain scale, using the current parameters, to the canvas.
     * @param {*} scale 
     */
    _renderTextMonitor (scale: number): void;

    /*
     * Update and returns the uniforms for this skin.
     * @param {Array<number>} scale - The scaling factors to be used.
     * @returns {object.<string, *>} the shader uniforms to be used when rendering with this Skin.
     */
    getUniforms (scale: number[]): TUniform;

    /**
     * Does this point touch an opaque or translucent point on this skin?
     * Nearest Neighbor version
     * The caller is responsible for ensuring this skin's silhouette is up-to-date.
     * @see updateSilhouette
     * @see Drawable.updateCPURenderAttributes
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} Did it touch?
     */
    isTouchingNearest (vec: TVec3): boolean;

    /**
     * Does this point touch an opaque or translucent point on this skin?
     * Linear Interpolation version
     * The caller is responsible for ensuring this skin's silhouette is up-to-date.
     * @see updateSilhouette
     * @see Drawable.updateCPURenderAttributes
     * @param {twgl.v3.Vec3} vec A texture coordinate.
     * @return {boolean} Did it touch?
     */
    isTouchingLinear (vec: TVec3): boolean;

};