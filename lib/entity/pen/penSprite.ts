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
    private _penRgbAttributes: IPenAttributes;
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
        this._penAttributes = {color4f:[240,1,1,1], diameter: 1};
        this._penRgbAttributes = {color4f:[0,0,1,1], diameter: 1};
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
    setColor(idx: number, value:number){
        this._penAttributes.color4f[idx] = value;
        this.convertAttribues2Rgb();
    }
    changeColor(idx: number, value:number, limit: number){
        const _value = this._penAttributes.color4f[idx] + value;
        this._penAttributes.color4f[idx] = _value % limit;
        this.convertAttribues2Rgb();
    }
    setPenHue(hue: number): void{
        this.setColor(0, hue);
        this.convertAttribues2Rgb();
    }
    changePenHue(hue: number): void{
        this.changeColor(0, hue, 360);
        this.convertAttribues2Rgb();
    }
    setPenSaturation(saturation: number): void{
        this.setColor(1, saturation/100);
        this.convertAttribues2Rgb();
    }
    changePenSaturation(saturation: number): void{
        this.changeColor(1, saturation/100, 1.0);
        this.convertAttribues2Rgb();
    }
    setPenBrightness(brightness: number): void{
        this.setColor(2, brightness/100);
        this.convertAttribues2Rgb();
    }
    changePenBrightness(brightness: number): void{
        this.changeColor(2, brightness/100, 1.0);
        this.convertAttribues2Rgb();
    }
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
    changePenTransparency(transparency: number): void{
        this.changeColor(3, (100 - transparency)/100, 1);
        this.convertAttribues2Rgb();
    }
    setPenSize( size: number) {
        this._penSize = size;
        this._penAttributes.diameter = size;
        this.convertAttribues2Rgb();
    }
    changePenSize( size: number) {
        const penSize = this._penSize + size;
        this._penSize = (penSize<1)? 1: penSize;
        this._penAttributes.diameter = this._penSize;
        this.convertAttribues2Rgb();
    }
    stamp() {
        const stampDrowingID = this._sprite.drawableID;
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
    drawPoint() {
        if(this._skinId > -1 && this._sprite.dragSprite.dragging == false){
            const x0 = this._sprite.$_position.x;
            const y0 = this._sprite.$_position.y;
            this.render.renderer.penPoint(this._skinId, this._penRgbAttributes, x0, y0);
            this._x0 = x0;
            this._y0 = y0;
        }
    }

}