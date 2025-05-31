/**
 * Stage
 */
import { Backdrops } from "./backdrops";
import { StageBackdrop } from "./stage/stageBackdrop";
import { StageControl } from "./stage/stageControl";
import { StageLooks } from "./stage/stageLooks";
import { StageEvent } from "./stage/stageEvent";
import { StageSensing } from "./stage/stageSensing";
import { StageSound } from './stage/stageSound';
import { Entity } from "./entity";
import { QuestionBoxElement } from "../io/questionBoxElement";
import { Sprite } from "./sprite";
import { StageLayering } from "./stageLayering";
import type { TEntityEffects, TEntityOptions } from '@Type/entity/TEntityOptions';
import type { TMouse } from "@Type/mouse";
import type { TScale } from "@Type/common/typeCommon";
import { IStage } from "@Type/stage";
import { IStageControl } from "@Type/stage/IStageControl";
import { IStageBackdrop } from "@Type/stage/IStageBackdrop";
import { IStageLooks } from "@Type/stage/IStageLooks";
import { IStageEvent } from "@Type/stage/IStageEvent";
import { IStageSensing } from "@Type/stage/IStageSensing";
import { IStageSound } from "@Type/stage/IStageSound";
export class Stage extends Entity implements IStage{
    private scale: TScale;
    private direction: number;
    /** @internal */
    public backdrops: Backdrops;
    private _sprites: Sprite[];
    //private skinIdx: number;
    /** @internal */
    public mouse: TMouse;
    private _Backdrop: IStageBackdrop;
    private _Control: IStageControl;
    private _Looks : IStageLooks;
    private _Event : IStageEvent;
    private _Sensing : IStageSensing;
    private _Sound: IStageSound;
    constructor( options:TEntityOptions ) {
        if(typeof options == "string") throw "new Stage() パラメータはオブジェクト型のみ"
        super( "stage", StageLayering.BACKGROUND_LAYER, options );
        this.isSprite = false;
        this.effect = {
            color : (options && options.effect)? ((options.effect.color)? options.effect.color : 0) : 0,
            mosaic : (options && options.effect)? ((options.effect.mosaic)? options.effect.mosaic : 0) : 0,
            fisheye : (options && options.effect)? ((options.effect.fisheye)? options.effect.fisheye : 0) : 0,
        };
        this.$_position =  (options && options.position)? {x: options.position.x, y: options.position.y} : {x:0, y:0};
        this.direction = (options && options.direction)? options.direction : 90;
        this.scale = (options && options.scale)? {w: options.scale.w, h: options.scale.h} : {w:100, h:100};

        //this.keysCode = [];
        //this.keysKey = [];
        this.backdrops = new Backdrops(this.playGround);
        this._sprites = [];
        //this.skinIdx = -1;
        this.mouse = {scratchX:0, scratchY:0, x:0, y:0, down: false, pageX: 0, pageY: 0, clientX: 0, clientY: 0};
        const me = this;
        // これは Canvasをつくる Element クラスで実行したほうがよさそう（関連性強いため）
        const canvas = this.playGround.canvas;
        const body = document.getElementById('main');
        if(body){
            body.addEventListener('mousedown', (e:MouseEvent) => {
                me.mouse.pageX = e.pageX;
                me.mouse.pageY = e.pageY;
                me.mouse.down = true;
                e.stopPropagation()
            });
            body.addEventListener('mousemove', (e:MouseEvent) => {
                me.mouse.pageX = e.pageX;
                me.mouse.pageY = e.pageY;
                //me.mouse.down = true;
                e.stopPropagation()
            });
            body.addEventListener('mouseup', (e:MouseEvent)=>{
                me.mouse.pageX = e.pageX;
                me.mouse.pageY = e.pageY;
                me.mouse.down = false;
                e.stopPropagation()
            })
        }
        canvas.addEventListener('mousemove', (e:MouseEvent) => {
            me.mouse.x = e.offsetX;
            me.mouse.y = e.offsetY;

            me.mouse.clientX = e.clientX;
            me.mouse.clientY = e.clientY;
            
            me.mouse.scratchX = e.offsetX - this.playGround.canvas.width/2;
            me.mouse.scratchY = this.playGround.canvas.height/2 - e.offsetY;

//            me.mouse.down = true;

//            e.stopPropagation()
        }, {});
        canvas.addEventListener('mousedown', (e:MouseEvent) => {
            me.mouse.x = e.offsetX;
            me.mouse.y = e.offsetY;
            me.mouse.down = true;
            e.stopPropagation();
        })
        canvas.addEventListener('mouseup', (e:MouseEvent) => {
            me.mouse.x = e.offsetX;
            me.mouse.y = e.offsetY;
            me.mouse.down = false;
            e.stopPropagation();
        })
  
        this.playGround.stage = this;
        this._Backdrop = new StageBackdrop(this);
        this._Control = new StageControl(this);
        this._Looks = new StageLooks(this);
        this._Event = new StageEvent(this);
        this._Sensing = new StageSensing(this);
        this._Sound = new StageSound(this);
    }
    get sprites (): Sprite[] {
        return this._sprites;
    }
    addSprite (sprite:Sprite): void {
        const curSprite = sprite;
        this._sprites.push( curSprite );
        curSprite.z = this._sprites.length
        this._sortSprites();
    }
    _sortSprites(): void {
        const n0_sprites = this._sprites;
        const n1_sprites = n0_sprites.sort( function( a, b ) {
            if (a.z > b.z) return -1;
            if (b.z > a.z) return +1;
            return 0;
        });
//        let _z = -1;
        let _z = n1_sprites.length-1;
        const n2_sprites = n1_sprites.map(s=>{
//            s.z = ++_z;
            s.z = --_z;
            return s;
        });
        this._sprites = n2_sprites;

    }
    removeSprite ( sprite: Sprite ): void {
        const curSprite = sprite;
        const n_sprites = this._sprites.filter( ( item ) => item !== curSprite );
        this._sprites = n_sprites;
        this._sortSprites();
    }
    update(): void {
        super.update();
        this.backdrops.setPosition(this.position.x, this.position.y);
        this.backdrops.setScale(this.scale.w, this.scale.h);
        this.backdrops.setDirection(this.direction);
        this.backdrops.update(this.drawableID);
        for(const _sprite of this._sprites){
            _sprite.update();
        }        
    }
    draw(): void {
        this.render.renderer.draw();
    }
    // sendSpriteBackwards (sprite) {
    //     // 工事中
    
    // }
    // sendSpriteForward (sprite) {
    //     // 工事中
    // }
    // sendSpriteToFront (sprite) {
    //     // 工事中
    // }
    // sendSpriteToBack (sprite) {
    //     // 工事中
    // }

    // isKeyPressed (userKey) {
    //     let match = false
    //     let check
    
    //     typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey
    //     this.keysKey.indexOf(check) !== -1 ? match = true : null
    //     this.keysCode.indexOf(check) !== -1 ? match = true : null
    
    //     return match
    // }

    // move(x,y) {
    //     this.$_position.x = x;
    //     this.$_position.y = y;
    //     this.backdrops.setPosition(this.$_position.x, this.$_position.y);
    // }

    // async loadSound(name,soundUrl, options={}) {
    //     await this._loadSound(name, soundUrl, options);
    // }
    // async loadImage(name, imageUrl) {
    //     this._loadImage(name, imageUrl, this.backdrops);
    // }

    /**
     * @internal
     * サウンド名をもとに、ステージへサウンドを追加する
     * @param soundName {string}
     * @returns {Promise<void>}
     */
    public async $addSound(soundName:string): Promise<void> {
        if(arguments.length > 1){
            throw "Sound.add 引数が多い";
        }
        let _soundData;
        if(soundName == undefined){
            throw "【Stage.Sound.add】サウンドデータの指定がありません"
        }else if(soundName == undefined || typeof soundName == "string"){
            _soundData = this.playGround.loadedSounds[soundName];
            if(_soundData == undefined){
                throw "【Stage.Sound.add】正しいサウンド名を指定してください"
            }
        }else{
            throw "【Stage.Sound.add】正しいサウンド名を指定してください"
        }

        if(_soundData['name'] == undefined || _soundData['data'] == undefined ){
            throw "【Stage.Sound.add】正しいサウンドデータを指定してください"
        }
        const name = _soundData.name;
        const data = _soundData.data;
        const promise = this._addSound(name, data, {})
        return promise;
    }
    /**
     * イメージ名を使ってイメージをステージへ追加する
     * @param imageData {string}
     * @returns {Promise<void>}
     */
    async $addImage(imageName: string): Promise<void> {
        if(arguments.length > 1){
            throw "Image.add 引数が多い";
        }
        let _imageData;
        if(imageName == undefined){
            throw "【Stage.Image.add】イメージデータの指定がありません"
        }else if(typeof imageName == "string"){
            _imageData = this.playGround.loadedImages[imageName];
            if(_imageData == undefined){
                throw "【Stage.Image.add】正しいイメージ名を指定してください"
            }
        }else{
            throw "【Stage.Image.add】正しいイメージ名を指定してください"
            //_imageData = imageData;
        }        
        if(_imageData['name'] == undefined || _imageData['data'] == undefined ){
            throw "【Stage.Image.add】正しいイメージデータを指定してください"
        }
        const name = _imageData.name;
        const data = _imageData.data;
        await this._addImage(name, data, this.backdrops);

    }
    /**
     * イメージ名の配列を返す
     * @returns {string[]}
     */
    $getImageNames(): string[] {
        const iterator = this.backdrops.costumes.keys();
        return Array.from(iterator);
    }
    /**
     * 新しい名前の背景に切り替わったとき、イベント通知をする
     * @param {string} backdropName 
     * @param {string} newBackdropName 
     */
    $emitWhenBackdropChange(backdropName: string, newBackdropName: string) {
        // 新しい名前の背景に切り替わったとき
        if(backdropName !== newBackdropName){
            this.$broadCastBackdropSwitch(newBackdropName);
        }
    }
    /**
     * 次の背景に切り替える
     */
    $nextBackDrop(): void {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            const name_before = this.backdrops.currentSkinName();
            this.backdrops.nextCostume();
            const name_after = this.backdrops.currentSkinName();
            this.$emitWhenBackdropChange(name_before, name_after);
        }
        //this.ifOnEdgeBounds();
    }
    /**
     * 背景名、または背景番号で背景を切り替える
     * @param {string|number} backdrop 
     */
    $switchBackDrop( backdrop: string|number ): void {
        if(!this.$isAlive()) return;
        if( backdrop ){
            if( typeof backdrop === 'string') {
                const _name = backdrop;
                if(this.backdrops) {
                    const name_before = this.backdrops.currentSkinName();
                    this.backdrops.switchCostumeByName(_name);
                    const name_after = this.backdrops.currentSkinName();
                    this.$emitWhenBackdropChange(name_before, name_after);
                }
            }else if( Number.isInteger(backdrop)) {
                const _idx = backdrop;
                if(this.backdrops){
                    const name_before = this.backdrops.currentSkinName();
                    this.backdrops.switchCostumeByNumber(_idx);
                    const name_after = this.backdrops.currentSkinName();
                    this.$emitWhenBackdropChange(name_before, name_after);
                }
            }    
        }
    }
    /**
     * ステージを削除する、同時にスプライトを全て削除する
     */
    remove() {
        for(const _s of this.sprites){
            _s.remove();
        }

        try{
            this.render.renderer.destroyDrawable(this.drawableID, StageLayering.SPRITE_LAYER);

        }catch(e){
            
        }finally{
        }
        
        this.backdrops.destroyAllSkin();
        this.$delete();
    }
    /**
     * 質問をして答えを待つ
     * @param {string} text 
     * @returns {Promise<string>}
     */
    async $askAndWait(text: string): Promise<string> {
        const question = new QuestionBoxElement();
        const me = this;
        return new Promise<string>(async resolve=>{
            const answer = await question.ask(me, text);
            resolve(answer);
        });
    }
    /**
     * 背景
     */
    get Backdrop() {
        return this._Backdrop;
    }
    // /**
    //  * 
    //  * 背景番号、背景名を取り出すためのオブジェクト
    //  * 使用例：this.Backdrop.no, this.Backdrop.name
    //  * @returns {{no: number, name: string}}
    //  */
    // get Backdrop(): {"no": number, "name": string}{
    //     const stage = this;
    //     const backdrop = {"no": 0, "name": ""};
    //     Object.defineProperty(backdrop, "no", {
    //         // @type {number}
    //         get : function() {
    //             return stage.backdrops.currentSkinNo();
    //         },
    //     })
    //     Object.defineProperty(backdrop, "name", {
    //         // @type {string}
    //         get : function() {
    //             return stage.backdrops.currentSkinName();
    //         },
    //     })
    //     return backdrop;

    // }

    // get L() {
    //     return this.Looks;
    // }
    /**
     * 見た目
     */
    get Looks() {
        return this._Looks;
    }
    // get Looks(){
    //     return {
    //         "Backdrop" : this.Backdrop,
    //         "nextBackdrop": this.$nextBackDrop.bind(this),       // Sprite-->Stageへ
    //         "switchBackdrop": this.$switchBackDrop.bind(this),   // Sprite-->Stageへ
    //         "changeEffectBy": this.$changeEffectBy.bind(this),  // Sprite-->Entityへ
    //         "setEffectTo": this.$setEffectTo.bind(this),        // Sprite-->Entityへ
    //         "clearEffects": this.$clearEffect.bind(this),       // Sprite-->Entityへ

    //     };
    // }
    // get C() {
    //     return this.Control;
    // }
    /**
     * 制御
     */
    get Control() : IStageControl {
        return this._Control;
    }
    // get Control() {
    //     return {
    //         "wait" : this.$waitSeconds.bind(this),    // Sprite --> Entityへ
    //         "waitUntil": this.$waitUntil.bind(this),  // Sprite --> Entityへ
    //         "waitWhile": this.$waitWhile.bind(this),  // Sprite --> Entityへ
    //         //---- Entity
    //         "forever": this.forever.bind(this),
    //         "while": this.while.bind(this),
    //         "repeat": this.repeat.bind(this),
    //         "repeatUntil": this.repeatUntil.bind(this),
    //         "stopAll" : this.$stopAll.bind(this),
    //         "stopThisScript" : this.$stopThisScript.bind(this),
    //         "stopOtherScripts" : this.$stopOtherScripts.bind(this),
    //     };
    // }
    /**
     * 調べる
     */
    get Sensing() {
        return this._Sensing;
    }
//     get Sensing() {
//         return {
//             "askAndWait": this.$askAndWait.bind(this),
//             "isKeyDown" : this.$isKeyDown.bind(this),
//             "isKeyNotDown" : this.$isKeyNotDown.bind(this),
//             "isMouseDown" : this.$isMouseDown.bind(this),
//             "Mouse" : this.Mouse,
//             "timer" : this.$timer,
//             "resetTimer": this.$resetTimer.bind(this),
//             "getBackDrop" : null, // Spriteで工事中
// //            "isNotMouseTouching" : this.isNotMouseTouching.bind(this),
// //            "isMouseTouching": this.isMouseTouching.bind(this),
// //            "isTouchingTargetToTarget": this.isTouchingTargetToTarget.bind(this),
// //            "getTouchingTarget": this.getTouchingTarget.bind(this),
//         }
//     }

    // get E() {
    //     return this.Event;
    // }

    /**
     * イベント
     */
    get Event() {
        return this._Event;
    }
    // get Event() {
    //     return {
    //         "broadcast" : this.$broadcast.bind(this),
    //         "broadcastAndWait" : this.$broadcastAndWait.bind(this),
    //         // "broadcastToTargets": this.$broadcastToTargets.bind(this),
    //         // "broadcastAndWaitToTargets": this.$broadcastAndWaitToTargets.bind(this),
    //         "whenBroadcastReceived": this.$whenBroadcastReceived.bind(this),
    //         "whenRightNow": this.$whenRightNow.bind(this),
    //         "whenFlag": this.$whenFlag.bind(this),
    //         "whenKeyPressed": this.$whenKeyPressed.bind(this),
    //         //"whenMouseTouched": this.$whenMouseTouched.bind(this),
    //         //"whenTargetMouseTouched": this.$whenTouchingTarget.bind(this),
    //         "whenCloned": this.$whenCloned.bind(this),
    //         "whenClicked": this.$whenClicked.bind(this),
    //         "whenBackdropSwitches": this.$whenBackdropSwitches.bind(this),



    //     }
    // }

    /**
     * イメージ
     */
    get Image() {
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
};