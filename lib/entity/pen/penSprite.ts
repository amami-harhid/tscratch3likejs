import { Color } from '../../util/color';
import { Render } from '../../render/render';
import { Sprite } from '../sprite';
import { StageLayering } from '../stageLayering';
import type { IPenAttributes } from './IPenAttributes';
export class PenSprite {
    private render: Render;
    private _skinId: number
    private _penDown: boolean;
    private _penAttributes: IPenAttributes;
    private _penSize: number;
    private _x0?: number;
    private _y0?: number;
    private _sprite: Sprite;
    private _penDrawableId: number;
    /**
     * @constructor
     * @param render { Render } 
     */
    constructor(sprite: Sprite){
        this._sprite = sprite;
        this.render = sprite.render;
        this._penDown = false;
        this._penAttributes = {color4f:[0,0,1,1], diameter: 1};
        this._penSize = 1;
        this._penDrawableId = this.render.renderer.createDrawable(StageLayering.PEN_LAYER);
        this._skinId = this.render.renderer.createPenSkin();
        this.render.renderer.updateDrawableSkinId(this._penDrawableId, this._skinId);
    }
    penClear() {
        if(this._skinId > -1){
            this.render.renderer.penClear(this._skinId);
        }
    }
    penUp() {
        this._penDown = false;
    }
    penDown() {
        this._penDown = true;
        this.drawPoint();
    }
    _colorObjectToPenAttributesColor4f(color: {r: number, g: number, b: number, a: number}):void {
        this._penAttributes.color4f[0] = color.r;
        this._penAttributes.color4f[1] = color.g;
        this._penAttributes.color4f[2] = color.b;
        this._penAttributes.color4f[3] = color.a;
    }
    _penAttributsColorToColorObject() {
        const rgba = {
            r: this._penAttributes.color4f[0],
            g: this._penAttributes.color4f[1],
            b: this._penAttributes.color4f[2],
            a: this._penAttributes.color4f[3],
        }
        return rgba;
    }
    setPenHue(hue: number): void{
        const rgba = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgba);
        hsv.h = hue % 360;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    changePenHue(hue: number): void{
        const rgb = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgb);
        hsv.h += hue;
        hsv.h = hsv.h % 360;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    setPenSaturation(saturation: number): void{
        const rgb = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgb);
        hsv.s = ((saturation*100) % 100)/100;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    changePenSaturation(saturation: number): void{
        const rgb = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgb);
        hsv.s += saturation;
        hsv.s = ((hsv.s*100) % 100)/100;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    setPenBrightness(brightness: number): void{
        const rgb = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgb);
        hsv.v = ((brightness*100) % 100)/100;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    changePenBrightness(brightness: number): void{
        const rgb = this._penAttributsColorToColorObject();
        const hsv = Color.rgbToHsv(rgb);
        hsv.v += brightness;
        hsv.v = ((hsv.v*100) % 100)/100;
        const changedRgb = Color.hsvToRgb(hsv);
        this._colorObjectToPenAttributesColor4f(changedRgb);
    }
    setPenTransparency(transparency: number): void{
        const _transparency = 100 - transparency;
        if(_transparency>100){
            this._penAttributes.color4f[3] = 1;
        }else if(_transparency<0){
            this._penAttributes.color4f[3] = 0;
        }else{
            this._penAttributes.color4f[3] = _transparency/100;
        }
    }
    changePenTransparency(transparency: number): void{
        const _transparency = this._penAttributes.color4f[3]*100+transparency;
        if(_transparency>100){
            this._penAttributes.color4f[3] = 1;
        }else if(_transparency<0){
            this._penAttributes.color4f[3] = 0;
        }else{
            this._penAttributes.color4f[3] = _transparency/100;
        }
    }
    setPenSize( size: number) {
        this._penSize = size;
        this._penAttributes.diameter = size;
    }
    changePenSize( size: number) {
        const penSize = this._penSize + size;
        this._penSize = (penSize<1)? 1: penSize;
        this._penAttributes.diameter = this._penSize;
    }
    stamp(stampDrowingID: number) {
        if(this._skinId > -1 && stampDrowingID > -1 && this._sprite.dragSprite.dragging == false){
            this.render.renderer.penStamp(this._skinId, stampDrowingID);
        }
    }
    drawLine() {
        if(this._penDown === true){
            if(this._skinId > -1 && this._sprite.dragSprite.dragging == false){
                const x1 = this._sprite.$_position.x;
                const y1 = this._sprite.$_position.y;
                if(this._x0 != undefined && this._y0 != undefined){
                    const x0 = this._x0;
                    const y0 = this._y0;
                    this.render.renderer.penLine(this._skinId, this._penAttributes, x0, y0, x1, y1);
                }
                this._x0 = x1;
                this._y0 = y1;
            }else{
                this._x0 = undefined;
                this._y0 = undefined;
            }
        }
    }
    drawPoint() {
        if(this._skinId > -1 && this._sprite.dragSprite.dragging == false){
            const x0 = this._sprite.$_position.x;
            const y0 = this._sprite.$_position.y;
            this.render.renderer.penPoint(this._skinId, this._penAttributes, x0, y0);
            this._x0 = x0;
            this._y0 = y0;
        }
    }

}