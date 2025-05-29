/**
 * Sprite
 */
import type { TEntityOptions } from '../../entityOptions';

import { IEntity } from '../entity/entity';
import { SpriteMotionPosition } from '../../sprite/spriteMotionPosition';
import { SpriteMotionDirection } from '../../sprite/spriteMotionDirection';
import { SpriteMotion } from '../../sprite/spriteMotion';
import { SpriteBackdrop } from '../../sprite/spriteBackdrop';
import { SpriteCostume } from '../../sprite/spriteCostume';
import { SpriteLooks } from '../../sprite/spriteLooks';
import { SpriteControl } from '../../sprite/spriteControl';
import { SpriteSensing } from '../../sprite/spriteSensing';
import { SpriteEvent } from '../../sprite/spriteEvent';
import { SpritePen } from '../../sprite/spritePen';
export declare interface ISprite extends IEntity {
    /**
     * コンストラクター
     * @param name {string} - 名前
     * @param options {TEntityOptions} - オプション
     * @constructor
     */
    constructor(name?:string, options?:TEntityOptions): ISprite;

    /**
     * 位置
     */
    get Position(): SpriteMotionPosition;
    /**
     * 向き
     */
    get Direction(): SpriteMotionDirection;
    /**
     * 動き
     */
    get Motion() : SpriteMotion;

    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     * 使用例：this.Costume.no, this.Costume.name
     * @returns {{no: number, name: string}}
     */
    get Costume(): SpriteCostume;
    
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): SpriteBackdrop;

    /**
     * 見た目
     */
    get Looks() : SpriteLooks;
    /**
     * 制御
     */
    get Control() : SpriteControl;
    /**
     * 調べる
     */
    get Sensing() : SpriteSensing;
    /**
     * イベント
     */
    get Event() : SpriteEvent;
    /**
     * イメージ
     */
    get Image (){
        return {
            "add": this.$addImage.bind(this),
            "names" : this.$getImageNames.bind(this),
        }
    }
    /**
     * サウンド
     */
    get Sound() {
        return this._Sound;
    }
    // get Sound() {
    //     return {
    //         "add": this.$addSound.bind(this),
    //         "switch" : this.$soundSwitch.bind(this),
    //         "next" : this.$nextSound.bind(this),
    //         "play" : this.$soundPlay.bind(this),
    //         "playUntilDone": this.$startSoundUntilDone.bind(this),
    //         "setOption" : this.$setOption.bind(this),
    //         "changeOptionValue" : this.$changeOptionValue.bind(this),
    //         "clearEffects" : this.$clearSoundEffect.bind(this),
    //         "stop": this.$soundStop.bind(this),
    //         "stopImmediately": this.$soundStopImmediately.bind(this),

    //     }
    // }
    /**
     * 音声合成
     */
    get TextToSpeech() {
        return {
            //---Entity
            "setSpeechProperties": this.$setSpeechProperties.bind(this),
            "speech": this.$speech.bind(this),
            "speechAndWait" : this.$speechAndWait.bind(this),
            "speechStopAll": this.$speechStopImmediately.bind(this),
        }
    }

    /**
     * DragModeを設定するためのオブジェクト
     * @returns {{draggable: boolean, dragging: boolean}}
     */
    get DragMode(): {draggable: boolean, dragging: boolean} {
        const draggable = {"draggable": false, dragging: false};
        const me = this;
        Object.defineProperty(draggable, "draggable", {
            get : function() {
                return me._dragSprite.draggable;
            },
            set : function(draggable) {
                return me._dragSprite.draggable = draggable;
            },
        });
        Object.defineProperty(draggable, "dragging", {
            get : function() {
                return me._dragSprite.dragging;
            },
            set : function(dragging) {
                return me._dragSprite.dragging = dragging;
            },
        });
        return draggable;

    }
    /**
     * ペン機能
     */
    get Pen() : SpritePen;
};