import { TPosition } from "../common/typeCommon";
import { Entity } from "./Entity";
import { StageLayering } from "./stageLayering";
import type { TEntityOptions } from "./entityOptions";

export class DroppableEntity extends Entity {
    static Events = {
        DROP_START: 'DropStart',
        DROP_COMPLETE: 'DropComplete'    
    }
    private _eventRegisted: boolean;
    private _moveDistance: {x?:number, y?:number};
    constructor(name: string, layer: string, options?:TEntityOptions) {
        super(name, layer, options);
        this._moveDistance = {};
        this._eventRegisted = false;
    }
    _eventRegist() {
        if(this._eventRegisted === false){
            const runtime = this.playGround.runtime;
            if(runtime == undefined) throw 'Not Found runtime error';
            const me = this;
            runtime.on(DroppableEntity.Events.DROP_START, (senderDrawableID:number)=>{
                if( me.drawableID === senderDrawableID) {
                    // DROP開始したモニターは階層最上位にする
                    me.render.renderer.setDrawableOrder(me.drawableID, Infinity, 
                        StageLayering.MONITOR_LAYER, true);
                    // マウスが触った場所と左上隅の距離（位置関係）を記録する。モニターDROP時に利用する
                    me._moveDistance = {
                        x: me.$mouseX - me.$_position.x,
                        y: me.$mouseY - me.$_position.y,
                    };
                    // if(me._skin)
                    //     me._skin.dropping = true;
                }else{
                    //me._dropEnabled = false;
                    me._moveDistance = {};
                    // if(me._skin)
                    //     me._skin.dropping = false;
                }
            });
            runtime.on(DroppableEntity.Events.DROP_COMPLETE, ()=>{
                //me._dropEnabled = true;
                me._moveDistance = {};
                // if(me._skin)
                //     me._skin.dropping = false;
            });        
        }
    }
    _drop() {
        const runtime = this.playGround.runtime;
        if(runtime == undefined) throw 'Not found runtime error';
        if( this._moveDistance.x == undefined && this._moveDistance.y == undefined ) {
            if(this.$isMouseTouching() && this.$isMouseDown()){
                runtime.emit(DroppableEntity.Events.DROP_START, this.drawableID);
            }
        }else{
            if(this.$isMouseDown() && this._moveDistance.x && this._moveDistance.y){
                this.$_position.x = this.$mouseX - this._moveDistance.x;
                this.$_position.y = this.$mouseY - this._moveDistance.y;
            }else{
                runtime.emit(DroppableEntity.Events.DROP_COMPLETE);
                this._moveDistance = {};
            }
        }
    }

}