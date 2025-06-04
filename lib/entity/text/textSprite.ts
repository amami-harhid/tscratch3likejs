const twgl = require('twgl.js');
import { Utils } from '../../util/utils';
import { Libs } from '../../controls/libs';
import { StageLayering } from '../stageLayering';
import { Costumes } from '../costumes';
import { ImageLoader } from '../../importer/imageLoader';
import type { TPosition } from '@Type/common/typeCommon';
import { IRenderWebGL } from '../../render/IRenderWebGL';
/**
 * TextSprite
 */
export class TextSprite {
    private id: string;
    private drawableID: number;
    private $position: TPosition;
    private visible: boolean;
    private text: string;
    private costumes: Costumes;
    private renderer: IRenderWebGL;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D| null;
    private _font: string;
    private _fontSize: number;
    private _skinId: number;
    constructor() {
        this.id = Utils.generateUUID();
        const libs = Libs.getInstance();
        const playGround = libs.p;
        this.costumes = new Costumes(playGround);
        const render = playGround.render;
        this.renderer = render.renderer;
        this.drawableID = render.createDrawable(StageLayering.TEXT_LAYER);
        this.$position = {x:0, y:0};
        this.visible = true;
        this.text = '';
        this._fontSize = 50;
        this._font = 'Arial';
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d',{willReadFrequently:true});
        //this.drawText(this.text);
        this._skinId = -1;
    }
    show(): void {
        this.visible = true;
    }
    hide(): void {
        this.visible = false;
    }
    set x(x:number) {
        this.$position.x = x;
    }
    set y(y:number) {
        this.$position.y = y;
    }
    set position(position:{x:number, y:number}) {
        this.x = position.x;
        this.y = position.y;
    }
    set fontSize(fontSize:number){
        this._fontSize = fontSize;
    }
    async drawText(text: string): Promise<void> {
        this.text = text;
        if(this.ctx){
            this.ctx.font = `${this._fontSize}px ${this._font}`;
            this.ctx.fillText(text, 0, 50);
            this.ctx.save();
            //ctx.moveTo(10,10);
            //const textureData: ImageData = ctx.getImageData(0,0,300,150);
            //this.setTexture(textureData);
            const imageData = this.ctx.canvas.toDataURL('image/png');
            await this.addImage(imageData);
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        }
    }
    update() {
        const effect = {
            position: [this.$position.x, this.$position.y],
        }
        this.costumes.update(this.drawableID, effect);
    }
    async addImage(imageData: string){
        const name = `TextSprite_${this.id}`;
        const image = await this._loadImage(imageData);
        await this.costumes.addImage(name, image);
        this._skinId = this.costumes.getSkinId(name);
        //this.costumes.switchCostumeByName(name);
        this.update();
    }
    async _loadImage(src: string) : Promise<HTMLImageElement>{
        return new Promise((resolve) => {
            const img:HTMLImageElement = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.src = src;
        });
    }
    // setTexture(textureData) {
    //     console.log(textureData);
    //     const gl = this.renderer.gl;
    //     const textureOptions = {
    //                 auto: false,
    //                 wrap: gl.CLAMP_TO_EDGE
    //             };
    //     const texture = twgl.createTexture(gl, textureOptions);
    //     gl.bindTexture(gl.TEXTURE_2D, texture);
    //     gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    //     gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
    //     gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

    //     //gl.deleteTexture(texture);
    // }

}