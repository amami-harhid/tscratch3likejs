import { Libs } from '../../controls/libs';
import { PgMain } from '../../pgMain';
import { Sprite } from '../sprite';
import { StageLayering } from '../../../Type/stage/CStageLayering';
/**
 * DragSprite
 */
export class DragSprite {
    /** @internal */
    static PROPERTIES_CHANGE = "properties_change";
    private sprite: Sprite;
    private libs: Libs;
    private p: PgMain;
    /**
     * draggable {boolean} - trueのときDragできる。デフォルト値はfalse.
     * 
     * ```ts
     *   sprite.dragSprite.draggable = true;
     * ```
     */
    public draggable: boolean;
    private drag : Generator|null;
    private moveDistance?: {x:number, y:number};
    /**
     * dragging {boolean} - Drag中のときTrue.
     * 
     * ```ts
     *   if( sprite.dragSprite.dragging === true ) {
     *       console.log('Drag中です');
     *   }
     * ```
     */
    public dragging: boolean;
    
    /**
     * @internal
     * @constructor
     */
    constructor(sprite: Sprite) {
        this.sprite = sprite;
        const libs = Libs.getInstance();
        this.p = libs.p;
        this.libs = libs;
        this.draggable = false;
        this.drag = null;
        this.dragComplete();
        //this.img = null;
        this.dragging = false;
        //this.pos = {x:0, y:0};
    }
    /**
     * @internal
     * ドラッグ開始処理
     */
    dragStart(): void {
        const sprite = this.sprite;
        // DROP開始したスプライトは階層最上位にする
        sprite.render.renderer.setDrawableOrder(sprite.drawableID, Infinity, StageLayering.SPRITE_LAYER, true);
        // マウスが触った場所とスプライト中心との差分（位置関係）を記録する。
        // スプライト DROP時に利用する
        const renderRate = this.libs.renderRate;
        
        // body 基準のマウスの位置
        const mouseX = this.p.stage.mouse.pageX;
        const mouseY = this.p.stage.mouse.pageY;
        // canvasの位置
        // getBoundingClientRect();
        const canvasRect = this.p.canvas.getBoundingClientRect();
        const canvasX = canvasRect.x;
        const canvasY = canvasRect.y;
        // ステージの大きさ
        const stageWidthHalf = this.libs.stageWidth/2;
        const stageHeightHalf = this.libs.stageHeight/2;
        // canvas基準に直したマウス位置
        const canvasMouse = {x:mouseX-canvasX, y:mouseY-canvasY};

        const moveDistance = {
            x: canvasMouse.x*renderRate.x - stageWidthHalf - sprite.Position.x,
            y: stageHeightHalf - canvasMouse.y*renderRate.y - sprite.Position.y,
        };
        this.moveDistance = {
            x: moveDistance.x,
            y: moveDistance.y,
        };
        this.dragging = true;
    }
    /**
     * @internal
     * ドラッグ完了の処理（初期化としても使う）
     */
    dragComplete() {
        this.moveDistance = {x:0, y:0};
        this.dragging = false;
    }
    /**
     * @internal
     * Update処理.
     * SpriteのUpdateの中で呼ばれる前提です
     * (1) ドラッグ開始したら スプライトの画像を取り出しImgタグを追加し、スプライトを非表示にする
     * (2) ドラッグ終了したら Imgタグを削除し スプライトを表示する。
     * @param sprite {Sprite}
     * @returns 
     */
    async update() : Promise<void> {
        const sprite = this.sprite;
        if(this.draggable === false) return;
        if(this.dragging === false && sprite.Sensing.isMouseTouching()) {
            const mouse = this.p.stage.mouse;
            if(!mouse.down) return;
            if(this.drag == null) {
                this.dragStart();
                this.drag = this.dragger();
            }
        }
        if(this.drag && this.moveDistance) {
            sprite.Motion.Position.x = this.libs.mousePosition.x - this.moveDistance.x;
            sprite.Motion.Position.y = this.libs.mousePosition.y - this.moveDistance.y;
            const ret = this.drag.next();
            if(ret.done === true) {
                sprite.Motion.Position.x = this.libs.mousePosition.x - this.moveDistance.x;
                sprite.Motion.Position.y = this.libs.mousePosition.y - this.moveDistance.y;
                this.dragComplete();
                this.drag = null;
                return;
            }
        }

    }
    /**
     * @internal
     * マウスダウンしている間、スプライト画像をドラッグする
     */
    *dragger() : Generator {
        const mouse = this.p.stage.mouse;
        for(;this.draggable===true && mouse.down===true;) {
            yield;
        }
        this.dragging = false;
    }
}