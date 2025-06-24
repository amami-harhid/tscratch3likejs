import { Color } from '../../util/color';
import { Render } from '../../render/render';
import { Sprite } from '../sprite';
import { PenSpriteSize } from './penSpriteSize';
import { PenSpriteHSVColor } from './penSpriteHSVColor';
import { StageLayering } from '../../../Type/stage/CStageLayering';
import type { TPenAttributes } from '@Type/pen';
//import { SpriteDragMode } from '../sprite/spriteDragMode';
import { IPenSprite } from '@Type/sprite/pen/IPenSprite';

const NotPrepareMessage = 'prepareが行われていません';
class PenDrawable {
    private static instance: PenDrawable;
    private _skinId: number;
    constructor(){
        this._skinId = -1;
    }
    get skinId() :number {
        return this._skinId;
    }
    static getInstance(): PenDrawable {
        if(PenDrawable.instance == undefined){
            PenDrawable.instance = new PenDrawable();
        }
        return PenDrawable.instance;
    }

    createPen(render: Render): number{
        if(this._skinId == -1){
            const penDrawableId = render.renderer.createDrawable(StageLayering.PEN_LAYER);
            const skinId = render.renderer.createPenSkin();
            render.renderer.updateDrawableSkinId(penDrawableId, skinId);
            this._skinId = skinId;
        }
        return this._skinId;
    }
}
export class PenSprite implements IPenSprite {
    private render: Render;
    private _skinId: number
    private _penDown: boolean;
    /** @internal  */
    public _penAttributes: TPenAttributes;
    private _penRgbAttributes: TPenAttributes;
    /** @internal */
    public _penSize: number;
    private _x0?: number;
    private _y0?: number;
    private _sprite: Sprite;
    //private _penDrawableId: number;
    private _Size: PenSpriteSize;
    private _HSVColor : PenSpriteHSVColor;
    private _penDrawable: PenDrawable;
    /**
     * @constructor
     * @param render { Render } 
     */
    constructor(sprite: Sprite){
        this._sprite = sprite;
        this.render = sprite.render;
        this._penDown = false;
        this._penAttributes = {color4f:[240,1,1,1], diameter: 1};
        this._penRgbAttributes = {color4f:[0,0,1,1], diameter: 1};
        this._penSize = 1;
        //this._penDrawableId = -1;
        //this._skinId = -1;
        this._Size = new PenSpriteSize(this);
        this._HSVColor = new PenSpriteHSVColor(this);
        this._penDrawable = PenDrawable.getInstance();
        this._skinId = this._penDrawable.skinId;
    }
    _createPen() : void {
        this._skinId = this._penDrawable.createPen(this.render);
        // this._penDrawableId = this.render.renderer.createDrawable(StageLayering.PEN_LAYER);
        // this._skinId = this.render.renderer.createPenSkin();
        // this.render.renderer.updateDrawableSkinId(this._penDrawableId, this._skinId);
    }
    dispose(): void {
        // destroySkin(skinId)
        if(this._skinId>-1){
            this.render.renderer.destroySkin(this._skinId);
        }
    }
    isPrepareDone() : boolean {
        if( this._skinId > -1 ) {
            return true;
        }
        return false;
    }
    prepare() : void {
        if(this._skinId == -1){
            try{
                this._createPen();
            }catch(e){
                console.log('fail in createPen')
            }
        }
        this.penClear();
    }

    penClear() : void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
            return;
        }
        this.render.renderer.penClear(this._skinId);
    }
    penUp() : void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
            return;
        }
        this._penDown = false;
    }
    penDown() : void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
            return;
        }
        if(this._penDown == false) {
            this.prepare();
        }
        this._penDown = true;
        this.drawPoint();
    }
    isPenDown() : boolean {
        return this._penDown;
    }
    /**
     * HSV のPenAttirubtesをRGBのPenAttributesに変換する
     * @returns 
     */
    convertAttribues2Rgb(): void {
        const hsv = {
            h: this._penAttributes.color4f[0],
            s: this._penAttributes.color4f[1],
            v: this._penAttributes.color4f[2],
            t: this._penAttributes.color4f[3],
        }
        const {rgb} = Color.hsv2rgb(hsv);
        this._penRgbAttributes.color4f[0] = rgb.r/255;
        this._penRgbAttributes.color4f[1] = rgb.g/255;
        this._penRgbAttributes.color4f[2] = rgb.b/255;
        this._penRgbAttributes.color4f[3] = rgb.a;
        this._penRgbAttributes.diameter = this._penAttributes.diameter;

    }
    /** @internal */
    setColor(idx: number, value:number): void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
        }
        this._penAttributes.color4f[idx] = value;
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changeColor(idx: number, value:number, limit: number) : void {
        const _value = this._penAttributes.color4f[idx] + value;
        this._penAttributes.color4f[idx] = _value % limit;
        this.convertAttribues2Rgb();
    }
    get HSVColor() : PenSpriteHSVColor {
        return this._HSVColor;
    }
    /** @internal */
    setPenHue(hue: number): void{
        this.setColor(0, hue);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changePenHue(hue: number): void{
        this.changeColor(0, hue, 360);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    setPenSaturation(saturation: number): void{
        this.setColor(1, saturation/100);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changePenSaturation(saturation: number): void{
        this.changeColor(1, saturation/100, 1.0);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    setPenBrightness(brightness: number): void{
        this.setColor(2, brightness/100);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changePenBrightness(brightness: number): void{
        this.changeColor(2, brightness/100, 1.0);
        this.convertAttribues2Rgb();
    }
    /** @internal */
    setPenTransparency(transparency: number): void{
        if(transparency>100.0){
            this.setColor(3, 0);
        }else if(transparency<0){
            this.setColor(3, 100);
        }else{
            const opacity = (100.0 - transparency)/100;
            this.setColor(3, opacity);
        }
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changePenTransparency(transparency: number): void{
        this.changeColor(3, (100 - transparency)/100, 1);
        this.convertAttribues2Rgb();
    }
    stamp() : void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
        }
        const stampDrawingID = this._sprite.drawableID;
        if(this._skinId > -1 && stampDrawingID > -1 && this._sprite.DragMode.dragging == false){
            this._sprite.update();        
            this.render.renderer.penStamp(this._skinId, stampDrawingID);
        }
    }
    stampStage(): void {
        const stampDrawingId = this._sprite.pgMain.stage.drawableID;
        if(this._skinId > -1 && stampDrawingId > -1){
            this.render.renderer.penStamp(this._skinId, stampDrawingId);
        }
    }
    /** @internal */
    drawLine(): void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
            return;
        }

        if(this._penDown === true){
            if(this._skinId > -1 && this._sprite.DragMode.dragging == false){
                const x1 = this._sprite.Position.x;
                const y1 = this._sprite.Position.y;
                if(this._x0 != undefined && this._y0 != undefined){
                    const x0 = this._x0;
                    const y0 = this._y0;
                    this.render.renderer.penLine(this._skinId, this._penRgbAttributes, x0, y0, x1, y1);
                }
                this._x0 = x1;
                this._y0 = y1;
            }else{
                this._x0 = undefined;
                this._y0 = undefined;
            }
        }
    }
    /** @internal */
    drawPoint() : void {
        if(this._skinId == -1){
            console.error(NotPrepareMessage);
            return;
        }
        if(this._skinId > -1 && this._sprite.DragMode.dragging == false){
            const x0 = this._sprite.Position.x;
            const y0 = this._sprite.Position.y;
            this.render.renderer.penPoint(this._skinId, this._penRgbAttributes, x0, y0);
            this._x0 = x0;
            this._y0 = y0;
        }
    }
    get Size(): PenSpriteSize {
        return this._Size;
    }
    /** @internal */
    setPenSize( size: number): void {
        this._penSize = size;
        this._penAttributes.diameter = size;
        this.convertAttribues2Rgb();
    }
    /** @internal */
    changePenSize( size: number): void {
        const penSize = this._penSize + size;
        this._penSize = (penSize<1)? 1: penSize;
        this._penAttributes.diameter = this._penSize;
        this.convertAttribues2Rgb();
    }

}