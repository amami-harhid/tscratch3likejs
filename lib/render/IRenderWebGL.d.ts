import { StageLayering } from '../entity/stageLayering';
import { S3MonitorSkin } from '../monitor/s3MonitorSkin';
import type { IPenAttribues } from '../entity/pen/IPenAttributes';
import type { ISkin } from './ISkin';
import type { IDrawable } from './IDrawable';
import type { TBounds, TPosition, TPositionArray, TScaleCanEmpty, TSizeXY } from '../common/typeCommon';
import type { RGBColorArray } from '../util/cast';

export declare type ScratchRenderProperties = {
    skinId: number,
    position: TPositionArray,
    scale: TScaleArr,
    visible? : boolean,
}


export declare interface IRenderWebGL {
    /** 全てのDrawableの配列 */
    _allDrawables: IDrawable[];
    /** 全てのskinの配列 */
    _allSkins: ISkin[];
    /** canvas context */
    gl: WebGLRenderingContext;
    /** next skin id */
    _nextSkinId: number;
    /**
     * Create a new bitmap skin from a snapshot of the provided bitmap data
     * @param bitmapData {HTMLImageElement} - new contents for this skin.
     * @param costumeResolution {number} - The resolution to use for this bitmap
     * @param rotationCenter {TPositionArray} - rotation center of the skin
     */
    createBitmapSkin(bitmapData: HTMLImageElement, costumeResolution?:number, rotationCenter?:TPositionArray): nubmer;
    /**
     * Create a new PenSkin - a skin which implements a Scratch pen layer.
     */
    createPenSkin(): number;
    /**
     * Create a new SVG skin.
     * @param svgData {string} - new SVG to use.
     * @param rotationCenter {TPositionArray} - rotation center of the skin
     */
    createSVGSkin(svgData: string, rotationCenter?: TPositionArray): number;
    /**
     * Return a drawable's pixel data and bounds in screen space.
     * @param drawableID {number}
     */
    extractDrawableScreenSpace(drawableID: number): {imageData:ImageData,x:number, y:number, width:number, height:number};
    /**
     * Bounds 取得
     * @param drawableID { number }
     * @returns {TBounds}
     */
    getBounds(drawableID: number): TBounds; 
    /**
     * Get the precise bounds for a Drawable around the top slice.
     * @param drawableID {number}
     * @returns {TBounds} - Bounds for a tight box around the Drawable top slice.
     */
    getBoundsForBubble(drawableID: number): TBounds;
    /**
     * Get the current skin (costume) size of a Drawable.
     * @param drawableID {number}
     * @returns {number[]} - Skin size, width and height.
     */
    getCurrentSkinSize(drawableID: number): number[];
    /**
     * get native size
     * @returns {number[]} - the "native" size of the stage, which is used for pen, query renders, etc.
     */
    getNativeSize(): number[];
    /**
     * モニター用スキンを取得する
     * @param skinId {number}
     */
    getS3Skin(skinId:number): S3MonitorSkin;
    
    /**
     * Drawableを作成する
     * @param group {StageLayering}
     * @returns {number} - drawableID
     */
    createDrawable(group: StageLayering): number;
    /**
     * 
     * @param type {string} - "say" or "think"
     * @param text {string} - the text for the bubble
     * @param pointsLeft {boolean} - which side the bubble is pointing
     * @returns {number} - skinID
     */
    createTextSkin(type: string, text: string, pointsLeft: boolean):number;
    /**
     * 
     * @param drawableID {number} - drawable id
     * @param group {StageLayering} - Group name that the drawable belongs to.
     */
    destroyDrawable(drawableID: number, group: StageLayering): void;
    /**
     * Destroy an existing skin. 
     * Do not use the skin or its ID after calling this.
     * @param skinId {number} - skin id.
     */
    destroySkin(skinId: number): void;
    /**
     * Draw all current drawables and present the frame on the canvas
     */
    draw(): void;
    /**
     * Update the position object's x & y members to keep the drawable fenced in view.
     * @param drawableID {number} - the id of the Drawable to update.
     * @param position {TPositionArray} - position to be fenced - An array of type [x, y]
     * @returns {TPositionArray} - The fenced position as an array [x, y]
     */
    getFencedPositionOfDrawable(drawableID:number, position:TPositionArray): TPositionArray;
    /**
     * 
     * @param drawableID {number} - The ID of the Drawable to check.
     * @param color3b {number[]} - Test if the Drawable is touching this color.
     * @param mask3b {number[]} - Optionally mask the check to this part of Drawable.
     */
    isTouchingColor(drawableID: number, color3b: RGBColorArray, mask3b?: RGBColorArray): boolean;
    /**
     * Check if a particular Drawable is touching any in a set of Drawables.
     * @param drawableID {number} - The ID of the Drawable to check.
     * @param candidateIDs {number[]} - The Drawable IDs to check, otherwise all visible drawables in the renderer
     */
    isTouchingDrawables(drawableID: number, candidateIDs?: number[]): boolean;
    /**
     * Clear a pen layer.
     * @param penSkinID {number}
     */
    penClear(penSkinID: number): void;
    /**
     * Draw a line on a pen layer.
     * @param penSkinID {number} - the unique ID of a Pen Skin.
     * @param penAttributes {IPenAttributes} - how the line should be drawn.
     * @param x0 {number} - the X coordinate of the beginning of the line.
     * @param y0 {number} - the Y coordinate of the beginning of the line.
     * @param x1 {number} - the X coordinate of the end of the line.
     * @param y1 {number} - the Y coordinate of the end of the line.
     */
    penLine (penSkinID: number, penAttributes: IPenAttribues, x0:number, y0:number, x1:number, y1:number): void;
    /**
     * Draw a point on a pen layer.
     * @param penSkinID {number} - the unique ID of a Pen Skin.
     * @param penAttributes {IPenAttributes} - how the line should be drawn.
     * @param x {number} - the X coordinate of the point to draw.
     * @param y {number} - the Y coordinate of the point to draw.
     */
    penPoint (penSkinID: number, penAttributes: IPenAttribues, x:number, y:number): void;
    /**
     * Stamp a Drawable onto a pen layer.
     * @param penSkinID {number} - the unique ID of a Pen Skin.
     * @param stampID {number} - the unique ID of the Drawable to use as the stamp.
     */
    penStamp (penSkinID: number, stampID: number) : void;
    /**
     * Detect which sprite, if any, is at the given location.
     * This function will pick all drawables that are visible,
     * unless specific candidate drawable IDs are provided.
     * Will not select hidden / ghosted sprites.
     * @param centerX {number} - The client x coordinate of the picking location.
     * @param centerY {number} - The client y coordinate of the picking location.
     * @param touchWidth {number} - The client width of the touch event
     * @param touchHeight {number} - The client height of the touch event
     * @param candidateIDs {number[]} - The Drawable IDs to pick from, otherwise all visible drawables.
     * @returns {number} - The ID of the topmost Drawable under the picking location.
     */
    pick(centerX:number, centerY:number, touchWidth?:number, touchHeight?:number, candidateIDs?:number[]): number|boolean;
    /**
     * ステージをリサイズする
     * @param w {number} - 横
     * @param h {number} - 縦
     */
    resize(w: number, h: number): void;
    /**
     * モニター用スキンを作成する
     * @param {number} drawableID - drawable id.
     * @param {string} label - layer name.
     * @returns {number} - skin id.  
     */
    s3CreateMonitorSkin(drawableID:number, label:string):number;
    /**
     * Set a drawable's order in the drawable list (effectively, z/layer).
     * Can be used to move drawables to absolute positions in the list,
     * or relative to their current positions.
     * 
     * @param drawableID {number}
     * @param order {number} - order New absolute order or relative order adjusment.
     * @param group {StageLayering} - group Name of layer group drawable belongs to.
     * @param optIsRelative {boolean} - If set, `order` refers to a relative change.
     * @param optMin {?number} - New order if changed, or null. 
     */
    setDrawableOrder(drawableID: number, order: number, group: StageLayering, optIsRelative: boolean, optMin?: number): void;
    /**
     * Set the layer group ordering for the renderer.
     * @param groupOrdering {StageLayering[]} - The ordered array of layer group
     */
    setLayerGroupOrdering(groupOrdering: StageLayering[]): void;
    /**
     * Update a drawable's position.
     * @param drawableID {number} - drawable id.
     * @param position {number[]} - the new position.
     */
    updateDrawablePosition(drawableID: number, position: TPositionArray): void;
    /**
     * update position, direction, scale, or effect properties
     * @param drawableID {number}
     * @param properties {ScratchRenderProperties}
     */
    updateDrawableProperties(drawableID: number, properties:ScratchRenderProperties): void;
    /**
     * Update a drawable's scale.
     * @param drawableID 
     * @param scale 
     */
    updateDrawableScale(drawableID: number, scale: number[]): void;
    /**
     * Update a drawable's skin
     * @param drawableID {number}
     * @param skinId {number}
     */
    updateDrawableSkinId(drawableID: number, skinId: number): void;
    /**
     * Update a drawable's visibility.
     * @param drawableID {number}
     * @param visible {boolean}
     */
    updateDrawableVisible(drawableID: number, visible: boolean): void;
    /**
     * 
     * @param skinId {number} - skin id.
     * @param type {string} - "say" or "think".
     * @param text {string} - the text for the bubble.
     * @param pointsLeft {boolean} - which side the bubble is pointing.
     */
    updateTextSkin(skinId: number, type: string, text: string, pointsLeft: boolean): void;
}