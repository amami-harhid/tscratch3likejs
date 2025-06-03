/**
 * Entity
 */
import { Canvas } from '../elements/canvas';
import { Controls, Loop } from '../controls/controls';
import { S3Element } from '../elements/element';

import { EntityProxyExt } from '../util/entityProxyExt';
import { Env } from '../env';
import { EventEmitter } from "events";
import { FunctionChecker } from '../util/functionChecker';
import { Libs } from '../controls/libs';
import { MathUtil } from '../util/math-util';
import { Render } from '../render/render';
import { Sounds } from '../sounds/sounds';
import { Speech } from '../speech/text2Speech';
import { Threads } from '../controls/threads';
import { Utils } from '../util/utils';
import { ImageEffective } from '../../Type/entity/ImageEffective';
import { SoundOption } from '../../Type/entity/SoundOption';
import { PlayGround } from '../playGround';
import { StageLayering } from './stageLayering';
import type { TThreadObj } from '../controls/TThreadObj';
import type { TPosition, TScale } from '@Type/common/typeCommon';
import type { TEntityEffects, TEntityOptions } from '@Type/entity/TEntityOptions';
import type { TSoundPlayerOption } from '@Type/sound/IAudioEngine';
import type { ScratchRenderProperties } from '../render/IRenderWebGL';
declare type CLICK_EVENT_FUNCTION = (e: MouseEvent, _counter: number) => Promise<void>;
declare type TBroadcastElementFunc = {
    func: CallableFunction,
    threadId: string,
    target: Entity,
}
declare type TBroadcastElement = {
    "eventId": string, 
    "funcArr": TBroadcastElementFunc[],
}
export class Entity extends EventEmitter {
    /** @internal */
    static clickFirstRegist = true;
    /** @internal */
    static eventFuncArray: CLICK_EVENT_FUNCTION[] = [];
    /** @internal */
    static broadcastReceivedFuncArr:TBroadcastElement[] = [];
    /** @internal */
    static get EmitIdMovePromise () {
        return '_MovePromise_';
    }
    /** @internal */
    get SOUND_FORCE_STOP (){
        return "sound_force_stop";
    }
    /** @internal */
    public render: Render;
    /** @internal */
    public playGround: PlayGround;
    /** @internal */
    public drawableID: number;
    protected _libs: Libs;
    private threads: Threads;
    /** @internal */
    public pace: number;
    /** Entityの名前 */
    public name: string;
    /** スプライト判定 */
    public isSprite: boolean;
    private layer: StageLayering;
    /** @internal */
    public id: string;
    /** @internal */
    public canvas: HTMLCanvasElement;
    /** @internal */
    public flag: HTMLElement|null;
    /** @internal */
    public $_position: TPosition;
    protected $_scale: TScale;
    protected $_direction: number;
    protected _visible: boolean;
    private sounds: Sounds|undefined;
    private importAllDone: boolean[];
    private importIdx: number;
    protected $_prev_position: TPosition;
    protected $_prev_scale: TScale;
    protected $_prev_direction: number;
    protected _effect: TEntityEffects;
    /** 生存期間。(÷FPS値)をするとおよそ秒数になる、デフォルトは無限値。 */
    public life: number;
    protected modules?: Map<string, Promise<void>[]>;
    protected _isAlive: boolean;
    private _timer: number;
    constructor (name: string, layer: StageLayering, options:TEntityOptions = {} ){
        super();
        this.id = this._generateUUID();
        this.name = name;
        this.isSprite = false; // スプライトのときTrue, 以外のとき False
        this._libs = Libs.getInstance();
        this.threads = Threads.getInstance();        
        this.playGround = this._libs.p;
        Threads.playGround = this.playGround;
        this.pace = 1000/Env.fps;
        this.render = this.playGround.render;
        this.layer = layer;
        this.drawableID = this.render.createDrawable(this.layer);
        this.canvas = Canvas.canvas;
        this.flag = null;//playGround.flag;
        this.$_position = {x:0, y:0}; // 意味なし
        this.$_scale = {w:100,h:100}; // 意味なし
        this.$_direction = 90; // 意味なし
        this.sounds = undefined;
        //this.sound = null;
        this.importAllDone = [];
        this.importIdx = -1;

        const _effect = (options.effect)? options.effect: {};
        this._effect = {};
        this.$clearEffect();
        this.setEffectsEachProperties(_effect);
        this.$_position = (options.position)? {x: options.position.x, y: options.position.y}:{x:0, y:0};
        this.$_prev_position = this.$_position;
        this.$_direction = (options.direction)? options.direction : 90;
        this.$_prev_direction = this.$_direction;
        this.$_scale = (options.scale)? {w: options.scale.w, h: options.scale.h} : {w:100, h:100};
        this.$_prev_scale = {w:0, h:0};
        this.$_prev_scale.w = this.$_scale.w;
        this.$_prev_scale.h = this.$_scale.h;
        this._visible = (options.visible)? options.visible : true;

        this.life = Infinity;
        this.modules = new Map();
        Entity.broadcastReceivedFuncArr = Entity.broadcastReceivedFuncArr || [];
        this._isAlive = true;
        // タイマー用
        this._timer = performance.now();
    }
    /**
     * 座標 {{x:number,y:number}}
     */
    protected get position() : {x:number, y:number} {
        return this.$_position;
    }
    /**
     * 生きていることを確認する
     * @returns {boolean} - 生きているときtrue.
     */
    $isAlive(): boolean {
        // スプライトの場合はオーバーライドしている
        return true;
    }
    /**
     * 削除する
     */
    protected $delete () {
        delete this.modules;
    }
    /**
     * 効果 {TEntityEffects}
     */
    get effect(): TEntityEffects {
        return this._effect;
    }
    /**
     * 効果を設定 {{[key:string]: number}
     */
    set effect(_effect: {[key:string]: number}) {
        this.setEffectsEachProperties(_effect);
    }
    /**
     * @internal
     * @param changeW 
     * @param changeH 
     */
    $changeSizeBy(changeW:number|{w:number,h:number}, changeH:number): void {
        if(typeof changeW == 'number' ){
            const _w = changeW;
            let _h = changeH;
            if( changeH == undefined){
                _h = changeW;
            }
            const w = this.$_scale.w + _w;
            const h = this.$_scale.h + _h; 
            this.$setScale(w, h);    
        }else{
            const obj = changeW;
            const _w = obj.w;
            const _h = obj.h;
            const w = this.$_scale.w + _w;
            const h = this.$_scale.h + _h; 
            this.$setScale(w, h);
        }

    }
    /**
     * @internal
     * @param target 
     * @param changeVal 
     */
    $changeEffectBy( target:ImageEffective, changeVal:number): void {
        if(target == ImageEffective.COLOR){
            const v = (this._effect.color)? this._effect.color: 0;
            this._effect.color = v + changeVal;
            this._effect.color = this._effect.color % 200;
        }else if(target == ImageEffective.FISHEYE ){
            const v = (this._effect.fisheye)?this._effect.fisheye:0;
            this._effect.fisheye = v + changeVal;
        }else if(target == ImageEffective.WHIRL ){
            const v = (this._effect.whirl)?this._effect.whirl:0;
            this._effect.whirl = v + changeVal;
        }else if(target == ImageEffective.PIXELATE ){
            const v = (this._effect.pixelate)?this._effect.pixelate:0;
            this._effect.pixelate = v + changeVal;
        }else if(target == ImageEffective.MOSAIC ){
            const v = (this._effect.mosaic)?this._effect.mosaic:0;
            this._effect.mosaic = v + changeVal;
        }else if(target == ImageEffective.BRIGHTNESS ){
            const v = (this._effect.brightness)?this._effect.brightness:0;
            this._effect.brightness = v + changeVal;
        }else if(target == ImageEffective.GHOST ){
            const v = (this._effect.ghost)?this._effect.ghost:0;
            const nv = v + changeVal;
            if(nv < 0 ){
                this._effect.ghost = 0;
            }else if(nv > 100) {
                this._effect.ghost = 100;
            }else{
                this._effect.ghost = nv;
            }
        }

    }
    /**
     * @internal
     * @param target 
     * @param val 
     */
    $setEffectTo( target: ImageEffective, val: number): void {
        if(target == ImageEffective.COLOR){
            this._effect.color = val;
        }else if(target == ImageEffective.FISHEYE ){
            this._effect.fisheye = val;
        }else if(target == ImageEffective.WHIRL ){
            this._effect.whirl = val;
        }else if(target == ImageEffective.PIXELATE ){
            this._effect.pixelate = val;
        }else if(target == ImageEffective.MOSAIC ){
            this._effect.mosaic = val;
        }else if(target == ImageEffective.BRIGHTNESS ){
            this._effect.brightness = val;
        }else if(target == ImageEffective.GHOST ){
            this._effect.ghost = val;
        }

    }
    protected setEffectsEachProperties(_effect: {[key:string]: number}) {
        if(ImageEffective.COLOR in _effect ){
            this._effect.color = _effect.color;
        }
        if(ImageEffective.FISHEYE in _effect ){
            this._effect.fisheye = _effect.fisheye;
        }
        if(ImageEffective.WHIRL in _effect ){
            this._effect.whirl = _effect.whirl;
        }
        if(ImageEffective.PIXELATE in _effect ){
            this._effect.pixelate = _effect.pixelate;
        }
        if(ImageEffective.MOSAIC in _effect ){
            this._effect.mosaic = _effect.mosaic;
        }
        if(ImageEffective.BRIGHTNESS in _effect ){
            this._effect.brightness = _effect.brightness;
        }
        if(ImageEffective.GHOST in _effect ){
            this._effect.ghost = _effect.ghost;
        }
    }
    /**
     * @internal
     */
    $clearEffect() : void {
        this._effect.color = 0;
        this._effect.fisheye = 0;
        this._effect.mosaic = 0;
        this._effect.brightness = 0;
        this._effect.brightness = 0;
        this._effect.ghost = 0;
    }


    protected _isImportAllDone() {
        let _allDone = true;
        this.importAllDone.map(v => {
            if( v === false ) {
                _allDone = false;
            }
        })
        return _allDone;
    }
    protected async _addImage(name:string ,image:string|HTMLImageElement, costume) {
        if(name == undefined || typeof name != "string"){
            throw "【Image.add】正しい name を指定してください"
        }
        const ImageError = "【Image.add】正しいイメージデータを指定してください";
        if(image == undefined) throw ImageError
        if(typeof image =="string"){
            if(image.substring(0,4)!="<svg")
                throw ImageError
        }else{
            // 文字列(SVG)でないとき
            if(image.nodeName ){
                if(image.nodeName && image.nodeName !="IMG")
                    throw ImageError
            }else{
                // imageが 文字列(SVG)でない、または、nodeNameがないとき
                throw ImageError
            }
            
        }
        await costume.addImage(name, image);
    }

    protected async _loadImage(name, imageUrl, costume) {
        this.importIdx += 1;
        const _importIdx = this.importIdx;
        this.importAllDone.push(false);
        await costume.loadImage(name, imageUrl);
        this.importAllDone[_importIdx] = true;
    }
    // async importSound( sound ) {
    //     if ( this.sounds == null ) this.sounds = new Sounds(this);
    //     const soundData = await this.sounds.importSound( sound );
    //     return soundData;
    // }
    /** 
     * @abstract
     * @internal
     */
    public async $addSound(soundName: string): Promise<void> {

    }
    protected async _addSound(name:string, soundData:Uint8Array<ArrayBuffer>, options={}) {
        if(name == undefined || typeof name != "string"){
            throw "【Sound.add】正しい name を指定してください"
        }
        if(soundData == undefined || soundData.buffer == undefined){
            throw "【Sound.add】正しいサウンドデータを指定してください";
        }
        if( !this.sounds ) this.sounds = new Sounds(this);
        //if( !this.sounds ) throw 'sounds undefined error';
        await this.sounds.setSound(name, soundData, options);

    }
    protected async _loadSound(name, soundUrl, options={}) {
        this.importIdx += 1;
        const _importIdx = this.importIdx;
        this.importAllDone.push(false);
        if ( !this.sounds ) this.sounds = new Sounds(this);
        await this.sounds.loadSound(name,soundUrl, options);
        this.importAllDone[_importIdx] = true;
    }
    protected $soundSwitch(sound) {
        if(this.sounds ){
            if(this.sounds.soundPlayer == undefined) throw 'sounds.soundPlayer undefined error';
            const name = sound.name;
            if(this.sounds.soundPlayer.name===name) return;
            const keys = this.sounds.getSoundKeys();
            if(keys.includes(name)){
                this.sounds.switch(name);
            }else{
                throw '指定したサウンドは定義されていません('+name+')';
            }
            return;
        } 
        throw 'sounds undefined error';
    }
    protected $nextSound() {
        if ( this.sounds ){
            this.$soundStop();    
            this.sounds.nextSound();
        }
    }
    /** @internal */
    public $soundPlay(name: string) : void {
        if(this.sounds) {
            if( name ) {
                this.$soundSwitch({name:name});
            }
            this.sounds.play();
            return;
        } 
        throw 'sounds undefined error';
    }
    /** @internal */
    public async $setOption(key:SoundOption, value: number) {
        if( key == SoundOption.VOLUME ){
            this.$setSoundVolume(value);
        }else if(key == SoundOption.PITCH ){
            if( -360 <= value && value <= 360 ){
                this.$setSoundPitch(value);    
            }
        }
        // 音量変更時直後の再生にて 最初に雑音「ブッ」が入る。
        // FPS分待つことで解消させる
        await this._libs.wait(1000/33*2);
    }
    /** @internal */
    public async $clearSoundEffect() {
        this.$setSoundVolume(100);
        this.$setSoundPitch(0);
        await this._libs.wait(1000/33*2);
    }
    protected $pitchAudio2Scratch(pitch) {
        if(12.5 <= pitch && pitch <= 800){
            const scratchPitch = 120 * Math.log2(pitch/100);
            return scratchPitch;
        }
        return 100;
    }
    protected $pitchScratch2Audio(pitch) {
        if(-360 <= pitch && pitch <= 360) {
            const audioPitch = 100 * (2**(pitch/120));
            return audioPitch;
        }
        return 0;
    }
    /**
     * @internal
     * @param key 
     * @param value 
     * @returns 
     */
    public async $changeOptionValue(key:SoundOption, value:number):Promise<void> {
        if(this.sounds ){
            if( key == SoundOption.VOLUME ){
                const volume = this.sounds.volume;
                this.$setSoundVolume(volume + value);
            }else if(key == SoundOption.PITCH ){
                const changePitch = this.$pitchScratch2Audio(value);
                const pitch = this.sounds.pitch + changePitch;
                if( 12.5 <= pitch && pitch <= 800 ){
                    const pitchScratch = this.$pitchAudio2Scratch(pitch);
                    this.$setSoundPitch( pitchScratch );
                }
            }
            // 音量変更時直後の再生にて 最初に雑音「ブッ」が入る。
            // FPS分待つことで解消させる
            await this._libs.wait(1000/33*2);
            return;
        } 
        throw 'sounds undefined error';
    }
    protected $setSoundVolume(volume) {
        if ( this.sounds ) {
            this.sounds.volume = volume;
        }
    }
    protected $getSoundVolume() {
        if(this.sounds ) {
            return this.sounds.volume;
        } 
        throw 'Sounds undefined error';
    }
    // setSoundVolumeByName(name, volume) {
    //     if ( this.sounds == null ) return;
    //     this.sounds.volume = volume;
    // }
    protected $getSoundPitch() {
        if(this.sounds ) {
            return this.sounds.pitch;
        } 
        throw 'sounds undefined error';
    }
    protected $setSoundPitch(pitch) {
        if(this.sounds ){
            const audioPitch = this.$pitchScratch2Audio(pitch);
            this.sounds.pitch = audioPitch/100;
            return;
        } 
        throw 'sounds undefined error';
    }
    /** @internal */
    public $soundStop() {
        if ( this.sounds ){
            this.sounds.stop();
        }
    }
    /** @internal */
    $soundStopImmediately() {
        if ( this.sounds ){
            this.sounds.stopImmediately();
        }
    }
    /** @internal */
    $speechStopImmediately() {
        this.emit(this.SOUND_FORCE_STOP); // ---> スピーチを停止する Soundの中で。
    }
    /**
     * @internal
     * @param name 
     * @returns 
     */
    public async $startSoundUntilDone(name) {
        if ( this.sounds ) {
            if(name){
                this.$soundSwitch({name:name});
            }
            await this.sounds.startSoundUntilDone();
        }
        return;
    }
    protected $setPosition(x, y) {
        if(typeof x == 'number'){
            this.$_position.x = x;
            this.$_position.y = y;    
        }else{
            const obj = x;
            this.$_position.x = obj.x;
            this.$_position.y = obj.y;    
        }
    }

    protected $setScale(w:number, h:number): void {
        if(typeof w == 'number'){
            this.$_scale.w = w;
            if( h == undefined) {
                this.$_scale.h = w;
    
            }else{
                this.$_scale.h = h;
            }    
        }else{
            const obj = w as {w:number, h:number};
            this.$_scale.w = obj.w;
            this.$_scale.h = obj.h;

        }
    }
    protected _directionChange( direction ) {
        if( direction > 180 ) {
            return direction - 360;
        }
        return direction;    
    }
    protected $setDirection(direction) {
        const _direction = this._directionChange(direction);
        this.$_direction = _direction;
    }
    /**
     * @internal
     * @param value 
     */
    $turnRight( value ) {
        const _direction = this.$_direction + value;
        this.$setDirection( _direction )
    }
    /**
     * @internal
     * @param value 
     */
    $turnLeft( value ) {
        const _direction = this.$_direction - value;
        this.$setDirection( _direction )
    }

    protected _generateUUID () {
        return Utils.generateUUID();
    }

    /**
     * @internal
     * Scratch3 Wait Block 風メソッド
     * @param seconds: {number} - 待つ秒数 
     */
    async $waitSeconds (seconds: number): Promise<void> {
        await Controls.waitSeconds(seconds);
    }
    /**
     * @internal
     * Scratch3 Until Block 風メソッド
     * @param condition 
     */
    async $waitUntil(condition: CallableFunction): Promise<void> {
        await Controls.waitUntil(condition);
    }
    /**
     * @internal
     * Scratch3 Ever Block 風メソッド
     * @param condition {CallableFunction}
     */
    async $waitWhile(condition: CallableFunction): Promise<void> {
        await Controls.waitWhile(condition);
    }
 
    /**
     * マウスタッチしていないことを判定する
     * @returns {boolean} - 非マウスタッチ
     */
    public $isNotMouseTouching(): boolean {
        return !(this.$isMouseTouching());
    }
    /**
     * 自分自身がマウスタッチしているかを判定する
     * @returns {boolean} - マウスタッチ中
     */
    public $isMouseTouching(): boolean {
        if(this.playGround.render){
            const mouseX = this.playGround.stage.mouse.x +1; // +1 は暫定、理由不明
            const mouseY = this.playGround.stage.mouse.y +1;
            if(this.playGround.render.renderer){
                // 自分自身だけを対象にしてマウスタッチしているDrawableのIDを取得する
                // マウスタッチしていれば自分自身のDrawableIDが返るはず。
                const _touchDrawableId = this.playGround.render.renderer.pick(mouseX,mouseY, 2, 2, [this.drawableID]); 
                if(this.drawableID == _touchDrawableId){
                    return true;
                }    
            }
        }
        return false;

    }

    protected $isTouchingTargetToTarget(src: Entity, targets: Entity[] | Entity) {
        const targetIds: number[] = [];
        if(Array.isArray(targets)){
            for(const _t of targets) {
                if(_t.visible){
                    const _drawableId = _t.drawableID;
                    targetIds.push(_drawableId);    
                }
            }    
        }else{
            const _targets = targets as Entity;
            const _drawableId = _targets.drawableID;
            targetIds.push(_drawableId);
        }
        if( targetIds.length > 0 ) {
            try{
                const touching = src.render.renderer.isTouchingDrawables(src.drawableID, targetIds);
                return touching;
    
            }catch(e){
            }
        }
        return false;
    }
    protected $ifTouchingTarget(target: Entity) {
        const touching = this.$isTouchingTargetToTarget(this,[target]);
        return touching;
    }
    protected $ifTouchingMultiTargets(targets) {
        if(Array.isArray(targets)){
            for(const t of targets){
                const touching = this.$ifTouchingTarget(t);
                return touching;
            }
        }
        return false;
    }
    /** @internal */
    public $getTouchingTarget(targets: Entity[]): Entity[] {
        const src = this;
        const touchingTragets: Entity[] = []
        if(Array.isArray(targets)){
            for(const t of targets){
                const touching = this.$isTouchingTargetToTarget(src,t);
                if( touching === true) {
                    touchingTragets.push(t);
                }
            }
        }else{
            const t = targets
            const touching = this.$isTouchingTargetToTarget(src, t);
            if( touching === true) {
                touchingTragets.push(t);
            }
        }

        return touchingTragets;
    }
    /**
     * @internal
     * 指定したEntity配列の中で 自身に触れているものがあるかをチェックする
     * @param targets {Entity[]} - チェック対象の配列
     * @returns {boolean} - 触れていればTrue.
     */
    public $isTouchingTarget(targets: Entity[]): boolean {
        const src = this;
        const touching = this.$isTouchingTargetToTarget(src, targets);
        return touching;
    }
    /**
     * @internal
     * 指定した色に触れているかを判定する
     * @param {string} targetRgb #始まりのカラー文字列
     * @returns {Promise.<boolean>} 色にタッチしたとき true
     */
    public async $isTouchingColor(targetRgb: string): Promise<boolean> {
        if(this.render && this.render.renderer && targetRgb &&
            typeof targetRgb === 'string' && targetRgb.substring(0, 1) === '#'
        ){
            const _renderer = this.render.renderer;
            const _targetRgb = this._libs.Cast.toRgbColorList(targetRgb);
            return _renderer.isTouchingColor(this.drawableID, _targetRgb);
        }
        return false;
    }
    /**
     * @internal
     * 自身の色(maskRgb)が指定色(targetRgb)に触れているかを判定する
     * @param {string} targetRgb - 先頭#
     * @param {string} maskRgb - 先頭#
     * @returns 
     */
    public async $colorIsTouchingColor(targetRgb:string, maskRgb:string): Promise<boolean> {
        if(this.render && this.render.renderer && 
            targetRgb && typeof targetRgb === 'string' && targetRgb.substring(0, 1) === '#' &&
            maskRgb && typeof maskRgb === 'string' && maskRgb.substring(0, 1) === '#'
        ){
            const _renderer = this.render.renderer;
            const _targetRgb = this._libs.Cast.toRgbColorObject(targetRgb);
            const _maskRgb = this._libs.Cast.toRgbColorObject(maskRgb);
            return await _renderer.isTouchingColor(this.drawableID, 
                                    _targetRgb, 
                                    _maskRgb);
        }
        return false;
    }
    /** @internal */
    public $broadcast(messageId:string, ...args:any[] ): void {
        const runtime = this.playGround.runtime;
        if(runtime){
            const eventId = `message_${messageId}`;
            if(this.modules == undefined) this.modules = new Map();
            this.modules.set(eventId, []);
            const sendTargets = [];
            runtime.emit(eventId, this.modules, sendTargets, ...args);    
        }
    }
    /** @internal */
    public async $broadcastAndWait(messageId: string, ...args: any[] ): Promise<void> {
        const wait = this._libs.wait;
        const runtime = this.playGround.runtime;
        if(runtime){
            const eventId = `message_${messageId}`;
            if(this.modules == undefined) this.modules = new Map();
            this.modules.set(eventId, []);
            const sendTarges = [];
            runtime.emit(eventId, this.modules, sendTarges, ...args);
            await wait(10);
            const promises = this.modules.get(eventId);
            if(promises && promises.length > 0) {
                await Promise.all(promises);
                return;
            }    
        }
    }

    /**
     * @internal
     * messageId を使い EventEmitter.on を宣言する
     * （他方からemitされたとき受け付け func を実行するため）
     * なお、本メソッドが呼び出される都度、funcを配列に蓄積し、
     * emitされたときは 蓄積したfuncをPromiseとして実行する。
     * @param {*} messageId 
     * @param {*} func 
     */
    public $whenBroadcastReceived(messageId: string, func: CallableFunction){
        //const me = this;
        const me = this.getProxyForHat();
        const threadId = me._generateUUID();
        const runtime = this.playGround.runtime;
        if(runtime){
            const eventId = `message_${messageId}`;
            // func をためる。
            const funcArr = Entity.broadcastReceivedFuncArr;
            let _foundElement: TBroadcastElement|null = null;
            for(const elem of funcArr){
                if(elem.eventId == eventId){
                    _foundElement = elem;
                    break;
                }
            }
            if(_foundElement != undefined){
                _foundElement.funcArr.push( {"func":func, "threadId":threadId, "target":me} );
            }else{
                // 見つからなかったとき
                _foundElement = {"eventId":eventId, "funcArr":[{"func":func, "threadId":threadId, "target":me}]};
                funcArr.push(_foundElement);
                /**
                 * 最初に受け付けたときの on 定義
                 * modules: 実行した処理のpromiseを入れる
                 * toTarget: ここに指定していない先は無視する
                 */
                runtime.on(eventId, function( modules:Map<string, Promise<void>[]>, toTarget:Entity[], ...args:any[]){
                    if(_foundElement){
                        const funcArr = _foundElement.funcArr;
                        for( const funcElement of funcArr){
                            const _me = funcElement.target;
                            let targetOn = false;
                            if(toTarget.length == 0){
                                targetOn = true;
                            }else{
                                const targetIdArr: string[] = [];
                                for(const t of toTarget){
                                    targetIdArr.push(t.id);
                                }                    
                                if(targetIdArr.includes(_me.id)){
                                    targetOn = true;
                                }
                            }
                            if(targetOn){
                                _me._whenBroadcastReceivedStartThread(
                                    eventId, 
                                    modules,
                                    funcElement,
                                    ...args
                                );
                            }
                        }    
                    }
                });
            }    
        }
    };
    protected _whenBroadcastReceivedStartThread(eventId:string, modules, funcElement,...args){
        const arr = modules.get(eventId);
        const func = funcElement.func;
        const threadId = funcElement.threadId;
        const proxy = funcElement.target;
        //const proxy = me.getProxyForHat();
        proxy.threadId = threadId;
        // [stopThisScriptSwitch]初期化しておかないと再度のBroadcastReceived時に例外発生する。
        proxy.stopThisScriptSwitch = false;
        const obj = proxy.startThreadMessageRecieved(func, proxy, false, ...args);                    
        obj.originalF = func;
        const promise = new Promise<void>(async resolve=>{
            for(;;){
                if(obj.done){
                    break;
                }
                await Utils.wait(0.1);
            }
            resolve();
        });
        arr.push(promise);
    }
    // すぐに実行する
    protected $whenRightNow(func: CallableFunction) {
        const functionDeclareType = FunctionChecker.getFunctionDeclares(func);
        if( functionDeclareType.isArrow === true ){
            // アロー関数は許可しない
            console.log(func.toString());
            throw "イベントで宣言する関数は アロー関数を使ってはいけません。";
        }
        if( functionDeclareType.isAsync === false){
            // async でないときは許可しない
            console.log(func.toString());
            throw "イベントで宣言する関数は async をつけてください。";
        }
        if( functionDeclareType.isGenerator === true){
            // Generator は許可しない
            console.log(func.toString());
            throw "WhenRightNowイベントで宣言する関数は Generatorを使えません";
        }
        const me = this;
        setTimeout(async _=>{
            const _p = this.playGround;
            const wait = this._libs.wait;
            const f = func.bind(me);
            await f(me);
            /**
             * 1FPS後にDrawするとちょうどよさげ
             */
            //await wait(33);
            await wait(5);
            _p._draw();
        },0);
    }
    protected $broadCastBackdropSwitch(backdropName: string) {
        const messageId = `BackdropSwitches_${backdropName}`;
        this.$broadcast(messageId, backdropName);
    }
    protected async $broadCastBackdropSwitchAndWait(backdropName: string) {
        const messageId = `BackdropSwitches_${backdropName}`;
        await this.$broadcastAndWait(messageId, backdropName);
    }
    /**
     * @internal
     * 背景が〇〇になったときの動作
     * @param {*} backdropName 
     * @param {*} func 
     */
    public $whenBackdropSwitches(backdropName: string, func: CallableFunction) {
        // Stage#nextBackDrop(), Stage#switchBackDrop() にて
        // 変更前のbackdropName と 変更後のbackdropName を比較し
        // 異なる場合、変更後のbackdropNameを使ったメッセージID で emit する
        // ここでは on でメッセージを受け取るが、
        // Entity#whenBroadcastReceived() と同様の処理にする
        const EmitId = `BackdropSwitches_${backdropName}`;
        this.$whenBroadcastReceived(EmitId, func);    
    }

    protected getProxyForHat(){

        const proxy = EntityProxyExt.getProxy(this, _=>{
            throw 'NOT FOUND PROPERTY in TARGET';
        });
        //console.log('proxy.stop_this_script_switch='+proxy.stop_this_script_switch)
        return proxy;
    }
    /** @internal */
    public $whenFlag (func: CallableFunction): void {
        //const process = Process.default;
        const me = this;
        const flag = S3Element.getControlGreenFlag();
        const clickFunc = async(e)=>{
            me.hatProc(func, me);
            e.stopPropagation();
        }
        flag.addEventListener('click', clickFunc);
    }
    protected hatProc(func, self){
        const me = (self)? self : this;
        const threadId = me._generateUUID();
        const proxy = me.getProxyForHat();
        proxy.threadId = threadId;
        me.startThread(func, proxy);
        return proxy;

    }
    /** @internal */
    public $whenKeyPressed( key: string, func: CallableFunction ): void {
        const me = this;
        const p = this.playGround;
        const runtime = p.runtime;
        if(key && func && runtime) {
            runtime.on("KEY_PRESSED", function(pressedKey:string){
                if( key === pressedKey) {
                    if(p.runningGame === false){
                        return; // 緑の旗が押されていないときは何もしない
                    }
                    // whenClicked と同じ処理
                    const addId = `_keyPressed_${key}`;
                    const entityId = me.id + addId;
                    me.threads.removeObjById(entityId); // 前回のキープレス分を止める
                    const threadId = me._generateUUID();
                    const proxy = me.getProxyForHat();
                    proxy.threadId = threadId;
                    if( p.preloadDone === true ) {
                        me.startThread(func, proxy, false, addId); //二重起動禁止
                    }
                }
            });
        }
    }
    /**
     * @internal
     * whenClickedが二重に呼ばれたときは
     * 前回動作しているスレッドを停止させる。
     * @param {CallableFunction} func 
     */
    public $whenClicked (func: CallableFunction) {
        // 同じオブジェクトで前回クリックされているとき
        // 前回のクリックで起動したものを止める。
        const p = this.playGround;
        const addId = '_clicked';
        const me = this;
        const _clickEventF = async (e: MouseEvent)=>{
            e.stopPropagation();
            // 緑の旗押されていないときは何もしない。
            if(p.runningGame === false){
                return;
            }
            let _counter = 0;
            for(const eventf of Entity.eventFuncArray){
                _counter += 1;
                eventf(e, _counter); // 意図的にawaitしていない
            }
        }
        const eventf: CLICK_EVENT_FUNCTION
                 = async (e:MouseEvent, _counter:number):Promise<void>=>{
            const CLICK_COUNTER = _counter; //Entity._clickCounter;
            const entityId = me.id + addId;
            e.stopPropagation();
            // 緑の旗押されていないときは何もしない。
            if(p.runningGame === false){
                return;
            }
            //threads.removeObjById(entityId); // 前回のクリック分を止める。
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
            // クリックしたポイントにあるDrawableのうち一番前面にあるものを返す。
            // そのポイントにDrawableがないときは Falseが返る。
            // 第三引数を省略することで全ての表示中のDrawableから探す。
            const _touchDrawableId = me.render.renderer.pick(mouseX,mouseY, 3, 3);
            if(me.drawableID == _touchDrawableId){
                // 前回のクリック分を止める。
                // me.$soundStopImmediately();
                // me.$speechStopImmediately();

                this.threads.removeObjById(entityId, CLICK_COUNTER); // 前回のクリック分を止める。
                const threadId = me._generateUUID();
                const proxy = me.getProxyForHat();
                proxy.threadCounter = CLICK_COUNTER;
                proxy.threadId = threadId;
                if( p.preloadDone === true ) {
                    me.startThread(func, proxy, false, addId); //二重起動禁止
                }
            }
        }
        Entity.eventFuncArray.push(eventf);
        //Canvas.canvas.removeEventListener('click', eventf);
//        Canvas.canvas.addEventListener('click', eventf);
        if(Entity.clickFirstRegist === true && Canvas.canvas){
            Canvas.canvas.addEventListener('click', _clickEventF);
            Entity.clickFirstRegist = false;
        }
    }
    /**
     * @internal
     * @param func {CallableFunction} 
     */
    $whenCloned(func: CallableFunction) : void {
        const runtime = this.playGround.runtime;
        if(runtime){
            const eventId = `whenClone_${this.name}`;
            runtime.on(eventId, function(clone: Entity){
                const threadId = clone._generateUUID();
                const proxy = clone.getProxyForHat();
                proxy.threadId = threadId;
                clone.startThread(func, proxy);
            });    
        }
    }
    protected updateVisible( visible: boolean ) {
        this._visible = visible;
        this.render.renderer.updateDrawableVisible(this.drawableID, visible);

    }

    protected set visible( _visible: boolean ){
        this.updateVisible(_visible);
    }
    /**
     * @internal
     */
    $show() : void {
        this.visible = true;
    }
    /**
     * @internal
     */
    $hide(): void {
        this.visible = false;
    }

    protected get visible() {
        return this._visible;
    }
    /**
     * @abstract
     */
    protected $setRotationStyle ( style ) {
        // Spriteクラスで定義する
    }
    /**
     * func はGeneratorの前提
     * @param {*} func 
     * @param {Entity} entity 
     * @param {boolean} doubleRunable 
     * @returns 
     */
    protected startThread( func, entity , doubleRunable=true, addId = '') {

        const functionDeclareType = FunctionChecker.getFunctionDeclares(func);
        if( functionDeclareType.isArrow === true ){
            // アロー関数は許可しない
            console.log(func.toString());
            throw "イベントで宣言する関数は アロー関数を使ってはいけません。";
        }
        if( functionDeclareType.isAsync === false){
            // async でないときは許可しない
            console.log(func.toString());
            throw "イベントで宣言する関数は async をつけてください。";
        }
        const _entity = entity;

        // @ts-ignore (proxy properties undefined error)
        const threadId = _entity.threadId;

        const obj:TThreadObj = this.threads.createObj();
        obj['entityId'] = _entity.id + addId;
        obj.threadId = threadId; //this.id;
        obj['entity'] = _entity;
        obj.doubleRunable = doubleRunable;
        if(functionDeclareType.isGenerator){
            const _func = func.bind(_entity)
            const _func2 = _func(_entity);
            const _f = async function* (){
                try{
                    yield *_func2; // generator()
                }catch(e){
                    if(e!==Threads.THROW_STOP_THIS_SCRIPTS){
                        console.log(e);
                    }
                    throw e;
                }
            }
            obj.f = _f();
            
        }else{            
            const _func = func.bind(_entity)
            const f = async function*(){
                try{
                    await _func(_entity);
                }catch(e){
                    if(e!==Threads.THROW_STOP_THIS_SCRIPTS){
                        console.log(e);
                    }
                    throw e;
                }
            }
            obj.f = f();    
        }
        obj.originalF = func;
        this.threads.registThread( obj );
        return obj;
    }
    protected startThreadMessageRecieved( func, entity , doubleRunable=true, ...args) {
        const functionDeclareType = FunctionChecker.getFunctionDeclares(func);
        if( functionDeclareType.isArrow === true ){
            // アロー関数は許可しない
            console.log(func);
            throw "イベントで宣言する関数は アロー関数を使ってはいけません。";
        }
        if( functionDeclareType.isAsync === false){
            // async でないときは許可しない
            console.log(func.toString());
            throw "イベントで宣言する関数は async をつけてください。";
        }

        const _entity = entity;

        // @ts-ignore (proxy properties undefined error)
        const threadId = _entity.threadId;

        const obj = this.threads.createObj();
        obj.entityId = _entity.id;
        obj.threadId = threadId; //this.id;
        obj.entity = _entity;
        obj.doubleRunable = doubleRunable;
        if(functionDeclareType.isGenerator){
            const _func = func.bind(_entity)
            obj.f = _func(...args); // generator()
        }else{
            const _func = func.bind(_entity)
            const f = async function*(){
                await _func(...args);
            }
            obj.f = f();
        }

        this.threads.registThread( obj );
        return obj;
    }
    /**
     * @internal
     * @throws THROW_STOP_THIS_SCRIPTS
     */
    $stopThisScript() {
        throw Threads.THROW_STOP_THIS_SCRIPTS;
    }
    /**
     * @internal
     */
    $stopOtherScripts() {
        this.threads.stopOtherScripts(this);
    }
    // これは使わない
    /**
     * @param t 
     * @deprecated
     */
    protected stopThread( t ) {
        clearTimeout( t );
    }
    protected pointTowardsMouseCursolGlobal( ) {
        const p = this.playGround;
        if(p.canvas){
            const rect = p.canvas.getBoundingClientRect();

            const canvasGlobalCenterX = rect.x + rect.width/2 // - canvasBorderX;
            const canvasGlobalCenterY = rect.y + rect.height/2 // - canvasBorderY;
        
            const pageX = p.stage.mouse.pageX;
            const pageY = p.stage.mouse.pageY;
        
            const _mouseXG = (pageX - canvasGlobalCenterX );
            const _mouseYG = (canvasGlobalCenterY - pageY);
            if(p.render){
                const _rateX = p.render.stageWidth / p.canvas.width;
                const _rateY = p.render.stageHeight / p.canvas.height;
            
                const targetX = (_mouseXG) * _rateX;
                const targetY = (_mouseYG) * _rateY;
        
                const dx = targetX - this.$_position.x;
                const dy = targetY - this.$_position.y;
        
                let direction = 90 - MathUtil.radToDeg(Math.atan2(dy, dx));
                if(direction > 180) {
                    direction -= 360;
                }
                this.$_direction = direction;    
            }
        }
    
    }
    /**
     * カーソルの位置へ向く
     */
    protected pointTowardsMouseCursol(): void {
        // CANVAS 外に出てら ポインターを向かない。
        const mousePosition = this._libs.mousePosition;
        const targetX = mousePosition.x;
        const targetY = mousePosition.y;
        const dx = targetX - this.$_position.x;
        const dy = targetY - this.$_position.y;
        let direction = 90 - MathUtil.radToDeg(Math.atan2(dy, dx));
        if(direction > 180) {
            direction -= 360;
        }
        this.$_direction = direction;
    }
    /**
     * SkinId を返す
     * @param drawableID {number}
     * @returns 
     */
    protected getSkinId(drawableID: number) : number {
        const drawable = this.render.renderer._allDrawables[drawableID];
        if( drawable && drawable.skin ){
            return drawable.skin.id;
        }
        return -1;

    }
    /**
     * Drawable が存在してSkinがあるかを判定する
     * @param drawableID {number}
     * @returns {boolean}
     */
    protected $_isDrawableActive(drawableID: number): boolean {
        if( this.getSkinId(drawableID) > -1 ){
            return true;
        }
        return false;
    }
    /**
     * ポジションプロパティを更新する
     * @param {number} x 
     * @param {number} y 
     */
    protected $setForceXY(x:number, y:number): void  {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [x, y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
            _renderer.updateDrawablePosition(this.drawableID, _position);
        }else{
            this.$_position.x = x;
            this.$_position.y = y;
        }

    }
    /**
     * @internal
     * ポジションプロパティを更新する
     * @param {number} x 
     * @param {number} y 
     */
    public $setXY(x:number, y:number) : void {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [x, y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
            //_renderer.updateDrawablePosition(this.drawableID, _position);
        }else{
            this.$_position.x = x;
            this.$_position.y = y;
        }

    }
    /**
     * @internal
     * @param x 
     */
    $setX(x) {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [x, this.$_position.y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
//             _renderer.updateDrawablePosition(this.drawableID, _position); // <--- これ、position変化するものすべてに必要なのでは？
        }else{
            this.$_position.x = x;
        }
       
    }
    /**
     * @internal
     * @param x 
     */
    $changeX(x: number):void {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            let _x = this.$_position.x + x;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [_x, this.$_position.y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
//            _renderer.updateDrawablePosition(this.drawableID, _position); // <--- これ、position変化するものすべてに必要なのでは？
        }else{
            this.$_position.x += x;
        }
       
    }
    /**
     * @internal
     * @param y 
     */
    $setY(y: number): void {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [this.$_position.x, y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
//             _renderer.updateDrawablePosition(this.drawableID, _position); // <--- これ、position変化するものすべてに必要なのでは？
        }else{
            this.$_position.y = y;
        }

       
    }
    /**
     * @internal
     * @param y 
     */
    $changeY(y:number): void {
        if(this.$_isDrawableActive(this.drawableID)){
            const _renderer = this.render.renderer;
            let _y = this.$_position.y + y;
            const _position = _renderer.getFencedPositionOfDrawable(this.drawableID, [this.$_position.x, _y]);
            this.$_position.x = _position[0];
            this.$_position.y = _position[1];
//             _renderer.updateDrawablePosition(this.drawableID, _position); // <--- これ、position変化するものすべてに必要なのでは？
        }else{
            this.$_position.y += y;
        }
    }
    /** @internal */
    public $setSpeechProperties(type:string, properties: TSoundPlayerOption, gender='male', locale='ja-JP'){
        const _properties = (properties)? properties : {};
        const speech = Speech.getInstance();
        speech.setSpeechProperties(type, gender, locale, _properties);
    }
    /** @internal */
    public $speech(words:string, type:string) {
        const speech = Speech.getInstance();
        speech.speech(this, words, type);

    }
    /** @internal */
    public async $speechAndWait(words:string, type:string) {
        const speech = Speech.getInstance();
        await speech.speechAndWait(this, words, type);
    }

    protected update() {
        if(this.life != Infinity) {
            this.life -= this._libs.Env.fps/1000;
            if( this.life < 0 ) {
                this.remove();
            }    
        }
    }
    /**
     * @internal
     * @deprecated 
     */
    remove() {
    
    }
    /**
     * Mouse情報
     */
    get Mouse() : {x:number, y:number} {
        const me = this;
        const mousePosition = { 
            "x" : 0,
            "y" : 0,
        };
        Object.defineProperty(mousePosition, "x", {
            get : function() {
                return me.$mouseX;
            },
        })
        Object.defineProperty(mousePosition, "y", {
            get : function() {
                return me.$mouseY;
            },
        })

        return mousePosition;
    }
    /**
     * @internal
     * @param func 
     */
    async forever(func) {
        await Loop.while(true, func, this);
    }
    /**
     * @internal
     * @param condition 
     * @param func 
     */
    async while(condition, func) {
        await Loop.while(condition, func, this);
    }
    /**
     * @internal
     * @param count 
     * @param func 
     */
    async repeat(count, func) {
        await Loop.repeat(count, func, this);
    }
    /**
     * @internal
     * @param condition 
     * @param func 
     */
    async repeatUntil(condition, func) {
        await Loop.repeatUntil(condition, func, this);
    }
    /**
     * @internal
     * キーが押されている判定
     * @param {string} key 
     * @returns {boolean} 押されている
     */
    $isKeyDown( key: string ): boolean {
        return this._libs.keyIsDown(key);
    }
    /**
     * @internal
     * キーが押されていない判定
     * @param {string} key 
     * @returns {boolean} 押されていない
     */
    $isKeyNotDown( key: string ): boolean {
        return this._libs.keyIsNotDown(key);
    }
    protected get $mouseX() {
        const mousePosition = this._libs.mousePosition;
        return mousePosition.x;
    }
    protected get $mouseY() {
        const mousePosition = this._libs.mousePosition;
        return mousePosition.y;
    }
    /** @internal */
    public $resetTimer() {
        this._timer = performance.now();
    }
    /** @internal */
    public get $timer() {
        return performance.now() - this._timer;
    }
    /** @internal */
    $isMouseDown() {
        return this._libs.mouseIsPressed();
    }
    /**
     * @internal
     */
    $stopAll() : void {
        S3Element.stopAll();
        const runtime = this.playGround.runtime;
        if(runtime){
            const EmitID_GREEN_MARK_BUTTON_ENABLED = runtime.GREEN_BUTTON_ENABLED;
            runtime.emit(EmitID_GREEN_MARK_BUTTON_ENABLED);    
        }
    }

};