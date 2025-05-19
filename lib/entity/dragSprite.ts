import { Libs } from '../controls/libs';
import { PlayGround } from '../playGround';
import { Sprite } from './sprite';
import { StageLayering } from './stageLayering';
export class DragSprite {
    private libs: Libs;
    private p: PlayGround;
    public draggable: boolean;
    private drag : Generator|null;
    private moveDistance?: {x:number, y:number,rX:number,rY:number};
    private img : HTMLImageElement | null;
    
    /**
     * @constructor
     */
    constructor() {
        const libs = Libs.getInstance();
        this.p = libs.p;
        this.libs = libs;
        this.draggable = false;
        this.drag = null;
        this.dragComplete();
        this.img = null; 
    }
    /**
     * ドラッグ開始処理
     * @param sprite {Sprite}
     */
    dragStart(sprite:Sprite): void {
        // DROP開始したスプライトは階層最上位にする
        sprite.render.renderer.setDrawableOrder(sprite.drawableID, Infinity, StageLayering.SPRITE_LAYER, true);
        // マウスが触った場所とスプライト中心との差分（位置関係）を記録する。
        // スプライト DROP時に利用する
        const renderRate = this.libs.renderRate;
        this.moveDistance = {
            x: sprite.$mouseX - sprite.$_position.x,
            y: sprite.$mouseY - sprite.$_position.y,
            rX: (sprite.$mouseX - sprite.$_position.x)/renderRate.x,
            rY: (sprite.$mouseY - sprite.$_position.y)/renderRate.y,
        };
    }
    /**
     * ドラッグ完了の処理（初期化としても使う）
     */
    dragComplete() {
        this.moveDistance = {x:0, y:0, rX:0, rY:0};
    }
    /**
     * Update処理.
     * SpriteのUpdateの中で呼ばれる前提です
     * (1) ドラッグ開始したら スプライトの画像を取り出しImgタグを追加し、スプライトを非表示にする
     * (2) ドラッグ終了したら Imgタグを削除し スプライトを表示する。
     * @param sprite {Sprite}
     * @returns 
     */
    async update(sprite:Sprite) : Promise<void> {
        if(this.draggable === false) return;
        if(sprite.Sensing.isMouseTouching() && this.img == null) {
            const mouse = this.p.stage.mouse;
            if(!mouse.down) return;
            if(this.drag == null) {
                this.dragStart(sprite);
                this.img = this.createImg(sprite);
                this.drag = this.dragging(this.img);
                const main = this.p.main;
                main.appendChild(this.img);
                sprite.$hide();
            }
        }
        if(this.drag && this.img) {
            const ret = this.drag.next();
            if(ret.done === true) {
                if(this.moveDistance){
                    sprite.Motion.Position.x = this.libs.mousePosition.x - this.moveDistance.x;
                    sprite.Motion.Position.y = this.libs.mousePosition.y - this.moveDistance.y;
                }
                this.dragComplete();
                sprite.$show();
                if(this.img) this.img.remove();
                this.img = null;
                this.drag = null;
                return;
            }
        }

    }
    /**
     * マウスダウンしている間、スプライト画像をドラッグする
     * @param img {HTMLImageElement} Drag開始した時点のスプライト画像
     */
    *dragging(img: HTMLImageElement) : Generator {
        const mouse = this.p.stage.mouse;
        for(;mouse.down;) {
            const pos = this.mousePositionOnWrapper(img);
            if(this.moveDistance){
                img.style.left = `${pos.x-this.moveDistance.rX}px`;
                img.style.top = `${pos.y+this.moveDistance.rY}px`;
            }
            yield;
        }
    }
    /**
     * CanvasWrapperの左上を基準にしたマウス位置
     * @param imgTag {HTMLImageElement}
     * @returns 
     */
    mousePositionOnWrapper(imgTag: HTMLImageElement){
        const mousePosition = {x:this.p.stage.mouse.pageX,y: this.p.stage.mouse.pageY};
        const x = mousePosition.x;
        const y = mousePosition.y;
        const imgRect = imgTag.getBoundingClientRect();
        return {x:x-imgRect.width/2,y:y-imgRect.height/2};
    }
    /**
     * スプライトの画像を取り出しImgタグを作る
     * @todo z-indexの関係をきちんと整理すること（必要なら見直しする）
     * @param sprite {Sprite}
     * @returns 
     */
    createImg(sprite:Sprite) : HTMLImageElement {
        const renderer = this.p.render.renderer;
        const drawableID = sprite.drawableID;
        // 表示しているスプライトの画像を取り出す。
        const image = renderer.extractDrawableScreenSpace(drawableID);
        // 画像を書き込むためのcanvasを用意する        
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        // contextに対して画像を書き込む。
        const ctx = canvas.getContext('2d');
        if(ctx == null) throw 'context is null';
        const imageData = new ImageData(image.imageData.data, image.width, image.height);
        ctx.putImageData(imageData, 0, 0);
        ctx.drawImage(canvas, image.width, image.height);
        // canvasに書き込んだ画像をURLとして取り出す(後でimgタグのsrcへ設定する)
        const text = canvas.toDataURL();
        // canvasは用がないので消す。
        canvas.remove();

        // imgTagを作ったうえで画像URLを設定する
        const imgTag = document.createElement('img');
        imgTag.classList.add('spriteDragging'); // CSS でFILTERなどを定義してある
        imgTag.classList.add('spriteDraggingHide'); // ロード前に非表示のクラスをつけておく
        imgTag.onload = ()=>{
            const pos = this.mousePositionOnWrapper(imgTag);
            if(this.moveDistance){
                imgTag.style.left = `${pos.x-this.moveDistance.rX}px`;
                imgTag.style.top = `${pos.y+this.moveDistance.rY}px`;
                // draggable=trueではブラウザ機能でドラッグされてしまうためそれを回避する。
                imgTag.setAttribute('draggable', "false");
                // 画像ロードが終わったタイミングで画像非表示のクラスを削除する
                imgTag.classList.remove('spriteDraggingHide');
            }
        }
        imgTag.src = text;
        return imgTag;
    }
}