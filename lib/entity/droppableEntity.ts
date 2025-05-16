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
    private _dropEnable : boolean;
    private _dropping: boolean;
    constructor(name: string, layer: string, options?:TEntityOptions) {
        super(name, layer, options);
        this._moveDistance = {};
        this._eventRegisted = false;
        this._dropEnable = false;
        this._dropping = false;
    }
    /**
     * dropping getter
     */
    get dropping() : boolean {
        return this._dropping;
    }
    /**
     * dropping setter
     */
    set dropping(_dropping: boolean) {
        this._dropping = _dropping;
    }
    /**
     * dropEnable getter
     */
    get dropEnable() : boolean {
        return this._dropEnable;
    }
    /**
     * dropEnable setter
     */
    set dropEnable(_dropEnable: boolean) {
        this._dropEnable = _dropEnable;
        this._event(_dropEnable);
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
        if(runtime == undefined) throw 'Not Found runtime error';
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
                runtime.removeEventListener(DroppableEntity.Events.DROP_START, dropStart);
                runtime.removeEventListener(DroppableEntity.Events.DROP_COMPLETE, dropComplete);
                // イベント登録無し
                this._eventRegisted = false;
            }
        }
    }
    _drop() {
        if(this._dropEnable === false) return;
        const runtime = this.playGround.runtime;
        if(runtime == undefined) throw 'Not found runtime error';
        if( this._moveDistance.x == undefined && this._moveDistance.y == undefined ) {
            if(this.$isMouseTouching() && this.$isMouseDown()){
                runtime.emit(DroppableEntity.Events.DROP_START, this.drawableID);
                this._dropping = true;
            }
        }else{
            if(this.$isMouseDown() && this._moveDistance.x && this._moveDistance.y){
                this.$_position.x = this.$mouseX - this._moveDistance.x;
                this.$_position.y = this.$mouseY - this._moveDistance.y;
                this._render();
            }else{
                runtime.emit(DroppableEntity.Events.DROP_COMPLETE);
                this._moveDistance = {};
                this._dropping = false;
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
        if( this._dropEnable === true){
            this._drop();
        }
    }
}