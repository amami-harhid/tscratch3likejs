import { Libs } from '../controls/libs';
import { PlayGround } from '../playGround';
import { Sprite } from './sprite';
import { StageLayering } from './stageLayering';
export class DragSprite {
    private libs: Libs;
    private p: PlayGround;
    private dragStart: boolean;
    public draggable: boolean;
    private drag : Generator|null;
    private moveDistance?: {x:number, y:number,rX:number,rY:number};
    private img : HTMLImageElement | null;
    constructor() {
        const libs = Libs.getInstance();
        this.p = libs.p;
        this.libs = libs;
        this.dragStart = false;
        this.draggable = false;
        this.drag = null;
        this.dropComplete();
        this.img = null; 
    }
    dropStart(sprite:Sprite): void {
        // DROP開始したスプライトは階層最上位にする
        sprite.render.renderer.setDrawableOrder(sprite.drawableID, Infinity, StageLayering.SPRITE_LAYER, true);
        // マウスが触った場所と左上隅の距離（位置関係）を記録する。
        // スプライト DROP時に利用する
        const renderRate = this.libs.renderRate;
        this.moveDistance = {
            x: sprite.$mouseX - sprite.$_position.x,
            y: sprite.$mouseY - sprite.$_position.y,
            rX: (sprite.$mouseX - sprite.$_position.x)/renderRate.x,
            rY: (sprite.$mouseY - sprite.$_position.y)/renderRate.y,
        };
    }
    dropComplete() {
        this.moveDistance = {x:0, y:0, rX:0, rY:0};
    }
    async update(sprite:Sprite) : Promise<void> {
        if(this.draggable === false) return;
        if(sprite.Sensing.isMouseTouching()) {
            const mouse = this.p.stage.mouse;
            if(!mouse.down) return;
            if(this.drag == null) {
                this.dropStart(sprite);
                this.img = this.createImg(sprite);
                //sprite.Looks.hide();
                this.drag = this.dragging(this.img);
                const main = this.p.main;
                main.appendChild(this.img);
                await this.libs.wait(500);
            }
        }
        if(this.drag && this.img) {
            this.img.classList.remove('spriteDraggingHide');
            const ret = this.drag.next();
            if(ret.done === true) {
                if(this.moveDistance){
                    sprite.Motion.Position.x = this.libs.mousePosition.x - this.moveDistance.x;
                    sprite.Motion.Position.y = this.libs.mousePosition.y - this.moveDistance.y;
                }
                this.dropComplete();
                sprite.Looks.show();
                if(this.img) this.img.remove();
                this.drag = null;
                return;
            }
        }

    }

    *dragging(img: HTMLImageElement) : Generator {
        const mouse = this.p.stage.mouse;
        const renderRate = this.libs.renderRate;
        for(;mouse.down;) {
            const pos = this.mousePositionOnWrapper(img);
            if(this.moveDistance){
                img.style.left = `${pos.x-this.moveDistance.rX}px`;
                img.style.top = `${pos.y+this.moveDistance.rY}px`;
            }
            yield;
        }
    }

    mousePositionOnWrapper(imgTag: HTMLImageElement){
        const mousePosition = {x:this.p.stage.mouse.pageX,y: this.p.stage.mouse.pageY};
        const x = mousePosition.x;
        const y = mousePosition.y;
        const imgRect = imgTag.getBoundingClientRect();
        return {x:x-imgRect.width/2,y:y-imgRect.height/2};
    }
    createImg(sprite:Sprite) : HTMLImageElement {
        const renderer = this.p.render.renderer;
        const drawableID = sprite.drawableID;
        const image = renderer.extractDrawableScreenSpace(drawableID);
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if(ctx == null) throw 'context is null';
        const imageData = new ImageData(image.imageData.data, image.width, image.height);
        ctx.putImageData(imageData, 0, 0);
        ctx.drawImage(canvas, image.width, image.height);
        const text = canvas.toDataURL();
        canvas.remove();
        const imgTag = document.createElement('img');
        imgTag.classList.add('spriteDragging'); // CSS でFILTERなどを定義
        imgTag.classList.add('spriteDraggingHide');
        imgTag.src = text;
        const pos = this.mousePositionOnWrapper(imgTag);
        if(this.moveDistance){
            imgTag.style.left = `${pos.x-this.moveDistance.rX}px`;
            imgTag.style.top = `${pos.y+this.moveDistance.rY}px`;
        }
       // imgTag.style.position = 'absolute'
        // imgTag.style.border = 'none';
        // imgTag.style.zIndex = '99999'; // <-- zIndex の数は整理しておくこと。
        imgTag.setAttribute('draggable', "false");
        return imgTag;
    }
}