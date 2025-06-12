/**
 * Bubble
 */
import { PgMain } from "../../pgMain";
import { uid } from "../../util/uid";
import type { IRenderWebGL } from "@Type/render/IRenderWebGL";
import { Sprite } from "../sprite";
import { StageLayering } from "../../../Type/stage/CStageLayering";
import type { TScale } from "@Type/common/typeCommon";
import type { BubbleState, BubbleProperties } from "@Type/sprite/TBubble";
export class Bubble {
    private p: PgMain;
    private bubbleState: BubbleState;
    private sprite: any;
    private renderer: IRenderWebGL|null;
    private _scale: TScale;
    private _direction: number;
    constructor( sprite: Sprite ) {
        this.p = sprite.pgMain;
        this.bubbleState = this._createBubbleState();
        this.sprite = sprite;
        this.renderer = null;
        if(this.p.render){
            this.renderer = this.p.render.renderer;
        }
        this._scale = {w:100, h:100};
        this._direction = 90;
    }
    _createBubbleState() :BubbleState {
        const state: BubbleState = {
            drawableID : -1, // 未設定
            skinId: -1, // 未設定
            text : '',
            type : 'say',
            onSpriteRight : true,
            uid : '', // <--- 使用用途不明
        }
        return state;
    }
    isBubbleActive(): boolean {
        if( this.bubbleState.uid == '') {
            return false;
        }
        return true;
    }
    get direction() : number {
        return this._direction;
    }
    set direction( _direction: number ) {
        this._direction = _direction;
    }
    /**
     * Bubbleスケールを設定する
     * @param w {number} - 横スケール(%).
     * @param h {number} - 縦スケール(%).
     * @returns 
     */
    setScale( w: number, h: number ): void {
        if( w == 0 || h == 0 ) {
            // ゼロスケールではDrawできないので回避する。
            return;
        }
        // マイナススケールのとき 文字が反転（鏡文字）となるのでそれを回避する。
        let _w = Math.abs(w);
        let _h = Math.abs(h);
        this._scale.w = _w;
        this._scale.h = _h;    
}
    async createDrawable() {
        if(this.renderer && this.bubbleState.drawableID == -1 ) {
            const bubbleDrawableID = this.renderer.createDrawable( StageLayering.SPRITE_LAYER );
            this.bubbleState.drawableID = bubbleDrawableID;
        }
    }

    async createTextSkin() {
        if(this.renderer && this.bubbleState.skinId == -1 ) {
            this.bubbleState.skinId = this.renderer.createTextSkin(
                this.bubbleState.type, 
                this.bubbleState.text, 
                this.bubbleState.onSpriteRight
            );
            this.bubbleState.uid = uid();    
        }
    }
    async say( text: string, properties: BubbleProperties={}): Promise<void> {
        this.bubbleState.type = 'say';
        this.bubbleState.text = text;
        await this._renderBubble(properties);
    }
    async think(text: string, properties: BubbleProperties ={}) {
        this.bubbleState.type = 'think';
        this.bubbleState.text = text;
        await this._renderBubble(properties);
    }
    updateScale( w:number, h:number ): void { 
        if(this.bubbleState.drawableID != -1){
            if( w == 0 || h == 0 ) {
                // ゼロスケールではDrawできないので回避する。
                return;
            }
            if(this.renderer){
                // マイナススケールのとき 文字が反転（鏡文字）となるのでそれを回避する。
                let _w = Math.abs(w);
                let _h = Math.abs(h);
                this._scale.w = _w;
                this._scale.h = _h;
                this.renderer.updateDrawableScale ( this.bubbleState.drawableID , [_w, _h] );
            }
       }
    }
    async _renderBubble(_properties: BubbleProperties ={}) {
        if(this.sprite.visible == false || this.bubbleState.text === '') {
            if( this.bubbleState.uid != '' ) {
                this.destroyBubble();
            }
            return;
        }
        if(this.renderer){
            if( this.bubbleState.uid == '' ) {
                this.createDrawable();
                await this.createTextSkin();    
                if( Object.keys(_properties).length > 0 ) {
                    if( _properties.scale ) {
                        this.updateScale( _properties.scale.w, _properties.scale.h );
                    }
                }
                this.renderer.updateDrawableSkinId(this.bubbleState.drawableID, this.bubbleState.skinId);
            }else if(this.bubbleState.skinId) {
                if( Object.keys(_properties).length > 0 ) {
                    if( _properties.scale ) {
                        this.updateScale( _properties.scale.w, _properties.scale.h );
                    }
                }
                this.renderer.updateTextSkin(this.bubbleState.skinId, this.bubbleState.type, this.bubbleState.text, this.bubbleState.onSpriteRight);
            }    
            this._positionBubble();
        }
        return;
    }
    moveWithSprite() : void {
        this._positionBubble();
    }
    _positionBubble() : void {
        if(this.renderer && this.bubbleState.skinId) {
            try{
                const [_bubbleWidth, _bubbleHeight] = this.renderer.getCurrentSkinSize( this.bubbleState.drawableID );
                const bubbleWidth = _bubbleWidth * this._scale.w / 100; 
                const bubbleHeight = _bubbleHeight * this._scale.h / 100;
                const targetBounds = this.renderer.getBoundsForBubble( this.sprite.drawableID );
                const stageSize = this.renderer.getNativeSize();
                const stageBounds = {
                    left: -stageSize[0] / 2,
                    right: stageSize[0] / 2,
                    top: stageSize[1] / 2,
                    bottom: -stageSize[1] / 2
                };
                if( this.bubbleState.onSpriteRight === true 
                    && bubbleWidth + targetBounds.right > stageBounds.right && (targetBounds.left - bubbleWidth > stageBounds.left) ) {
                    if( this._scale.w > 0) {
                        this.bubbleState.onSpriteRight = false;
                    } else {
                        this.bubbleState.onSpriteRight = false;
                    }
                    this.renderer.updateTextSkin(this.bubbleState.skinId, this.bubbleState.type, this.bubbleState.text, this.bubbleState.onSpriteRight);
                } else if( this.bubbleState.onSpriteRight === false 
                    && targetBounds.left - bubbleWidth < stageBounds.left && (bubbleWidth + targetBounds.right < stageBounds.right) ) {
                    if( this._scale.w > 0) {
                        this.bubbleState.onSpriteRight = true;
                    } else {
                        this.bubbleState.onSpriteRight = false;
                    }
                    this.renderer.updateTextSkin(this.bubbleState.skinId, this.bubbleState.type, this.bubbleState.text, this.bubbleState.onSpriteRight);
                } else {
                    const positionX = (this.bubbleState.onSpriteRight)? 
                        (Math.max(stageBounds.left,Math.min(stageBounds.right - bubbleWidth, targetBounds.right)))
                        :(Math.min(stageBounds.right - bubbleWidth, Math.max(stageBounds.left, targetBounds.left - bubbleWidth )));
                    const positionY = Math.min(stageBounds.top, targetBounds.bottom + bubbleHeight);
                    this.renderer.updateDrawablePosition(this.bubbleState.drawableID, [positionX, positionY]);
                }
        
            } catch(e) {
                //console.log(e);
            }
        }
    }
    destroyBubble(): void {
        if(this.renderer && this.isBubbleActive() && this.bubbleState.drawableID > -1) {
            this.renderer.destroyDrawable( this.bubbleState.drawableID, StageLayering.SPRITE_LAYER);
            this.renderer.destroySkin( this.bubbleState.skinId )
            this._createBubbleState();

            // destroy されたので初期化
            this.bubbleState.drawableID = -1;
            this.bubbleState.skinId = -1;
            this.bubbleState.uid = '';
        }
    }
};