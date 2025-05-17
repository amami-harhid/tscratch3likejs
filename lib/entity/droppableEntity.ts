import { TPosition } from "../common/typeCommon";
import { Entity } from "./entity";
import type {ScratchRenderProperties} from '../render/IRenderWebGL';
import { StageLayering } from "./stageLayering";
import type { TEntityOptions } from "./entityOptions";

export class DroppableEntity extends Entity {
    static Events = {
        DROP_START: 'DropStart',
        DROP_COMPLETE: 'DropComplete'    
    }
    private _eventRegisted: boolean;
    private _moveDistance: {x?:number, y?:number};
    private _draggable : boolean;
    private _nowDragging: boolean;
    constructor(name: string, layer: string, options?:TEntityOptions) {
        super(name, layer, options);
        this._moveDistance = {};
        this._eventRegisted = false;
        this._draggable = false;
        this._nowDragging = false;
    }
    /**
     * nowDragging getter
     */
    get nowDragging() : boolean {
        return this._nowDragging;
    }
    /**
     * nowDragging setter
     */
    set nowDragging(_nowDragging: boolean) {
        this._nowDragging = _nowDragging;
    }
    /**
     * draggable getter
     */
    get draggable() : boolean {
        return this._draggable;
    }
    /**
     * dropEnable setter
     */
    set draggable(_draggable: boolean) {
        this._draggable = _draggable;
        this._event(_draggable);
    }
    eventFunction() : {[key:string] : CallableFunction}{
        const me = this;
        const dropStart = (senderDrawableID:number) => {
            if( me.drawableID === senderDrawableID) {
                // DROP開始したスプライトは階層最上位にする
                me.render.renderer.setDrawableOrder(me.drawableID, Infinity, 
                    StageLayering.MONITOR_LAYER, true);
                // マウスが触った場所と左上隅の距離（位置関係）を記録する。
                // スプライト DROP時に利用する
                me._moveDistance = {
                    x: me.$mouseX - me.$_position.x,
                    y: me.$mouseY - me.$_position.y,
                };
            }else{
                me._moveDistance = {};
            }
        };
        const dropComplete = ()=>{
            me._moveDistance = {};
        };

        return {dropStart, dropComplete};
    }
    /**
     * drop 制御のイベントを登録・削除する
     */
    _event( regist : boolean = true ) {
        const runtime = this.playGround.runtime;
        if(runtime){
            const {dropStart, dropComplete} = this.eventFunction();       
            // イベント登録未のとき
            if(this._eventRegisted === false){
                if(regist===true){
                    runtime.on(DroppableEntity.Events.DROP_START, dropStart);
                    runtime.on(DroppableEntity.Events.DROP_COMPLETE, dropComplete);
                    // イベント登録済
                    this._eventRegisted = true;     
                }
            }else{
                if(regist === false) {
                    runtime.removeListener(DroppableEntity.Events.DROP_START, dropStart);
                    runtime.removeListener(DroppableEntity.Events.DROP_COMPLETE, dropComplete);
                    // イベント登録無し
                    this._eventRegisted = false;
                }
            }
        }else{
            throw 'Not Found runtime error';
        } 
    }
    _drop() {
        if(this._draggable === false) return;
        const runtime = this.playGround.runtime;
        if(runtime == undefined) throw 'Not found runtime error';
        if( this._moveDistance.x == undefined && this._moveDistance.y == undefined ) {
            if(this.$isMouseTouching() && this.$isMouseDown()){
                runtime.emit(DroppableEntity.Events.DROP_START, this.drawableID);
                this._nowDragging = true;
            }
        }else{
            if(this.$isMouseDown() && this._moveDistance.x && this._moveDistance.y){
                this.$_position.x = this.$mouseX - this._moveDistance.x;
                this.$_position.y = this.$mouseY - this._moveDistance.y;
                this._render();
            }else{
                runtime.emit(DroppableEntity.Events.DROP_COMPLETE);
                this._moveDistance = {};
                this._nowDragging = false;
            }
        }
    }
    _render() {
        if(this.drawableID != null && this.render.renderer != null ) {
            const skinId = this.getSkinId(this.drawableID);
            if( skinId > 0) {
                const properties: ScratchRenderProperties = {
                    skinId: skinId,
                    position: [this.$_position.x, this.$_position.y],
                    scale: [ this.$_scale.w, this.$_scale.h ],
                    visible : this._visible,
                }
                this.render.renderer.updateDrawableProperties( this.drawableID, properties );
                this.render.renderer.updateDrawableSkinId(this.drawableID, skinId);    
            }
        }
    }
    
    update() {
        super.update();
        if( this._draggable === true){
            this._drop();
        }
    }

    /**
     * DragModeを設定するためのオブジェクト
     * @returns {{draggable: boolean}}
     */
    get DragMode(): {"draggable": boolean} {
        const draggable = {"draggable": false};
        const me = this;
        Object.defineProperty(draggable, "draggable", {
            get : function() {
                return me.draggable;
            },
            set : function(_draggable) {
                return me.draggable = _draggable;
            },
        });
        return draggable;

    }
}