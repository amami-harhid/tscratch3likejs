/**
 * PlayGround
 */
import { S3Element } from './elements/element';
// (↑) import S3Element は最初に書く必要がある
//import { Env } from './env';
import { FontLoader } from './importer/fontLoader';
import { ImageLoader } from './importer/imageLoader';
import { Libs } from './controls/libs';
import { Render } from './render/render';
import { Runtime } from './engine/runtime';
import { Threads } from './controls/threads';
import { SoundLoader } from './importer/soundLoader';
import { Utils } from './util/utils';
//import { Sprite } from './entity/sprite';
import { Stage } from './entity/stage';

import type { IPgFont, IPgImage, IPgSound, IPgMain } from '@Type/pgMain';
import { Monitors } from './monitor/monitors';
import type { IMonitors } from '@Type/monitors';
import { ISvgSkin } from '@Type/render/ISvgSkin';
//import { ISkin } from '@Type/render/ISkin';
//import { SoundPlayer } from './sounds/soundPlayer';
import type { IAudioEngine, IScratchSoundPlayer, TEffectChain } from '@Type/sound/IAudioEngine';

const AudioEngine = require('scratch-audio');

export class PgMain implements IPgMain {
    /** @internal */
    static _instance: PgMain;

    /**
     * @internal
     * @return {PgMain}
     */
    static getInstance(): PgMain {
        if( PgMain._instance == undefined ) {
            PgMain._instance = new PgMain();
        }
        return PgMain._instance;
    }
    /** @internal */
    public main?: HTMLElement;
    //private _id : string;
    private _runtime: Runtime|null; 
    private _render?: Render;
    private _libs: Libs;
    private _flag: HTMLElement|null;
    private mainTmp: HTMLElement|null;
    //private _nowLoading: string;
    /**
     * @internal
     * 緑の旗が押されてプログラム動作中であることを知るフラグ
     */
    public runningGame: boolean;
    private _stage: Stage|null;
    private _canvas: HTMLCanvasElement|null;
    private _textCanvas: HTMLCanvasElement|null;
    private _monitors: Monitors|undefined;
    /**
     * 事前ロード処理動作の定義
     */
    public preload?() : Promise<void>;
    /**
     * 事前準備処理動作の定義
     */
    public prepare?(): Promise<void>;
    /**
     * イベント定義処理の定義
     */
    public setting?(): Promise<void>;
    /**
     * 1/FPSの間隔で実行される動作の定義
     */
    public draw?(): Promise<void>;
    private _preloadImagePromise:Promise<{name:string, data:string|HTMLImageElement}>[];
    private _preloadSoundPromise: Promise<{name:string, data:Uint8Array<ArrayBuffer>}>[];
    private _preloadFontPromise: Promise<{name:string, data:string[]}>[];
    private _loadedImages: {name?:string, data?:string|HTMLImageElement, skinId?:number};
    private _loadedSounds: {name?:string, data?:Uint8Array<ArrayBuffer>, soundPlayer?: IScratchSoundPlayer, effectChain?: TEffectChain};
    private _loadedFonts: {name?:string,data?:string[]};
    private _preloadDone: boolean;
    private _prepaeDone: boolean;
    private _image: IPgImage;
    private _sound: IPgSound;
    private audioEngine: IAudioEngine;
    private _font: IPgFont;
    constructor () {
        //this._id = this._generateUUID();
        this._runtime = null;
        this._preloadImagePromise = [];
        this._preloadSoundPromise = [];
        this._preloadFontPromise = [];
        this._loadedImages = {};
        this._loadedSounds = {};
        this._loadedFonts = {};
        this._preloadDone = false;
        this._prepaeDone = false;
        this._stage = null;
        //this._monitors = null;
        this.runningGame = false;
        this._canvas = null;
        this._flag = null;
        this.mainTmp = null;
        this.main = undefined;
        this._textCanvas = null;
        this._libs = Libs.getInstance();
        this._libs.p = this;
        Threads.p = this;
        this._image = new PgImage(this);
        this._sound = new PgSound(this);
        this._font = new PgFont(this);
        this.audioEngine = new AudioEngine();
    }
    /** @internal */
    get monitors(): Monitors | undefined {
        return this._monitors;
    }
    /** @internal */
    set monitors(_monitors: Monitors){
        this._monitors = _monitors;
    }
    /** @internal */
    isPrepareDone(){
        return this._prepaeDone;
    }
    /** @internal */
    get loadedImages() {
        return this._loadedImages;
    }
    /** @internal */
    get loadedSounds() {
        return this._loadedSounds;
    }
    /** @internal */
    get loadedFonts(): {name?:string, data?:string[]} {
        return this._loadedFonts;
    }
    /** 
     * Libs
     */
    get Libs () : Libs {
        return this._libs;
    }
    /** 
     * Element
     */
    get Element () : typeof S3Element {
        return S3Element;
    }
    /** @internal */
    get Stage (): typeof Stage {
        return Stage;
    }
    /** @internal */
    _generateUUID () {
        return Utils.generateUUID();
    }

    /** @internal */
    get threads () {
        return Threads.getInstance();
    }
    /**
     * @internal
     * render を取得する
     */
    get render () : Render {
        if(this._render == undefined) throw 'render undefined error';
        return this._render;
    }
    /**
     * @internal
     * render を設定する
     */
    set render( render: Render ) {
        // _init() の中で設定される。
        this._render = render;
    }

    /**
     * @internal
     */
    set runtime(runtime: Runtime) {
        this._runtime = runtime;
    }

    /**
     * @internal
     */
    get runtime() : Runtime {
        if(this._runtime == undefined) throw 'runtime undefined error';
        return this._runtime;
    }

    /**
     * @internal
     * ステージ
     */
    set stage ( stage: Stage ) {
        this._stage = stage;
    }

    /**
     * @internal
     * ステージ
     */
    get stage () :Stage{
        if( this._stage == undefined) throw 'stage undefined error';
        return this._stage;
    }

    /**
     * @internal
     * キャンバス
     */
    set canvas(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
    }
    /**
     * @internal
     * キャンバス
     */
    get canvas() : HTMLCanvasElement{
        if(this._canvas == undefined) throw 'canvas undefined error';
        return this._canvas;
    }
    /**
     * @internal
     * テキスト用キャンバス
     */
    set textCanvas(textCanvas: HTMLCanvasElement) {
        this._textCanvas = textCanvas;
    }
    /**
     * @internal
     * テキスト用キャンバス
     */
    get textCanvas() :HTMLCanvasElement{
        if(this._textCanvas == undefined) throw 'textCanvas undefined error';
        return this._textCanvas;
    }
    /** 
     * ステージの幅
     */
    get stageWidth () : number {
        if(this._render){
            return this._render.stageWidth;
        }
        throw 'unable calclulate stageWidth';
    }

    /** 
     * ステージの高さ
     */
    get stageHeight () :number {
        if(this._render){
            return this._render.stageHeight;
        }
        throw 'unable calclulate stageHeight';
    }


    /**
     * @internal
     * get randering rate ( when resized )
     * @returns 
     */
    getRenderRate() : {x:number, y:number}{
        return this._libs.renderRate;        
    }

    /** @internal */
    set flag ( flag:HTMLElement ) {
        this._flag = flag;
    }

    /** @internal */
    get flag (): HTMLElement {
        if(this._flag){
            return this._flag;
        }
        throw 'unable to get flag element';
    }

    private ifMainExist() : HTMLElement | undefined {
        const main = document.getElementById('main');
        if(main) return main;
        return undefined;
    }
    /**
     * 使用されていない 
     * @internal 
     */
    removeMainIfExist(){
        const main = this.ifMainExist();
        if(main){
            main.remove();
        }
    }
    /**
     * 使用されていない 
     * @internal 
     */
    async _reStart() {
        await this._setting();
    }
    /**
     * HTMLヘッダーtitle
     */
    get title() : string {
        return document.title;
    }
    /**
     * HTMLヘッダーtitle
     */
    set title(_title: string) {
        document.title = _title;
    }
    /** @internal */
    public async _init() {
        S3Element.p = this;
        // Now Loading 準備 START
        const mainTmp = document.createElement('main');
        this.mainTmp = mainTmp;
        mainTmp.id = 'mainTmp';
        mainTmp.classList.add('nowLoading');
        mainTmp.style.zIndex = '9999' ; // 一番手前 ( 本体main z-index= 999)
        mainTmp.style.position = 'absolute'
        mainTmp.style.touchAction = 'manipulation'
        mainTmp.style.width = `${innerWidth}px`
        mainTmp.style.height = `${innerHeight}px`

        document.body.appendChild(mainTmp);
        await Utils.wait(100); // <-- 100ms の根拠がわからない
        this._preload();

        S3Element.p = this;
        this.main = await S3Element.init();
        const main = this.main;
        if(main == undefined){
            throw 'unable to add main classList';
        }
        main.classList.add(S3Element.DISPLAY_NONE);
        this._render = new Render();
        await this._waitUntilPreloadDone();
        Render.p = this;

        this._runtime = new Runtime();
        if(this._render == undefined || this._render.renderer == undefined){
            throw 'unable to execute attachRenderer';
        }
        this._runtime.attachRenderer(this._render.renderer);    

        await this._prepare();
        this._prepaeDone = true;
        await this._setting();
        await S3Element.flagInit();
        //await this._setting();

        this.runningGame = false;
        this._runtime.on('RUNNING_GAME', ()=>{
            this.runningGame = true;
        });
        this._runtime.on('PAUSING_GAME', ()=>{
            this.runningGame = false;
        });
        await Utils.wait(100);
        // Mainタグから非表示のクラスを除去しフラグとキャンバスを表示する
        main.classList.remove(S3Element.DISPLAY_NONE);
        // NowLoadingを消す。
        this.mainTmp.remove();

    }
    async _preload () {
        if( this.preload ) {
            const f = this.preload.bind(this);
            f(); // 意図的に await していない。
        }
    }

    async _prepare () {

        // prepareメソッドの実行を開始する
        if( this.prepare ) {
            const f = this.prepare.bind(this);
            await f();
            // update処理を実施するにあたり遅延させる時間が不明、
            // よってupdateを繰返すことにする
            // 繰り返しは緑の旗が押されたときに停止する
            if( this._stage ){
                const self = this;
                const intervalId = setInterval(_=>{
                    if( self._stage ) {
                        self._stage.update();
                        self._stage.draw();
                    }
                    if( self._monitors) {
                        self._monitors.reposition();
                    }
                }, 100);
                const flag = S3Element.getControlGreenFlag();
                const clickFunc = async(e:MouseEvent)=>{
                    clearInterval(intervalId);
                    flag.removeEventListener('click', clickFunc);
                };
                flag.addEventListener("click", clickFunc);                

            }
        }
    }
    async _setting () {

        if( this.setting ) {
            const f = this.setting.bind(this);
            await f();
        }

    }

    _draw () {
        if( this._stage ) {
            this._stage.update ();
            this._stage.draw();
            // draw関数を定義済であれば実行する
            // これは p5.js の名残り。なくてもよいと思う。
            if( this.draw ) {
                this.draw();
            }
        }
        if( this._monitors ) {
            this._monitors.draw();
        }
    }

    $loadImage(imageUrl, name, translate?) {
        let _name ;
        if( name ) {
            _name = name;
        }else{
            _name = imageUrl.replace(/\.[^.]+$/, '');
        }
        ImageLoader.libs = this._libs;
        const data = ImageLoader.loadImage(imageUrl, _name, translate);
        this._preloadImagePromise.push(data);
        return data;
    }
    $loadSound(soundUrl, name) {
        let _name ;
        if( name ) {
            _name = name;
        }else{
            _name = soundUrl.replace(/\.[^.]+$/, '');
        }
        const data = SoundLoader.loadSound(soundUrl, _name);
        this._preloadSoundPromise.push(data);
        return data;
    }
    $loadFont(fontUrl:string, name:string) : Promise<{name:string, data:string[]}>{
        //console.log('$loadFont', fontUrl, name);
        const font = FontLoader.fontLoad(fontUrl, name);
        this._preloadFontPromise.push(font);
        return font;
    }

    get preloadDone() {
        return this._preloadDone;
    }
    async _waitUntilPreloadDone() {
        if(this._preloadImagePromise.length > 0 ) {
            if(this._render == undefined) return;
            const _images = await Promise.all(this._preloadImagePromise);
            for(const v of _images) {
                if(typeof v.data == "string"){
                    if(ImageLoader.isSVG(v.data)){
                        const skinId = this._render.renderer.createSVGSkin(v.data);                    
                        this._loadedImages[v.name] = {'name': v.name, 'data': v.data, skinId: skinId };
                        // willReadFrequently を設定するために SKINインスタンスを取り出し、
                        // SVGSkinのコンストラクターで実施すみの下記【A】２行をやり直す。
                        const _skin = this._render.renderer._allSkins[skinId];
                        if(_skin._canvas) _skin._canvas.remove(); // <== 念のため削除
                        const _svgSkin: ISvgSkin = _skin as ISvgSkin;
                        /*【A】*/_svgSkin._canvas = document.createElement('canvas');
                        /*【A】*/_svgSkin._context = _svgSkin._canvas.getContext("2d", { willReadFrequently: true });
                    }
                }else{
                    const bitmap = v.data as HTMLImageElement;
                    const skinId = await this._render.renderer.createBitmapSkin(bitmap);
                    this._loadedImages[v.name] = {'name': v.name, 'data': v.data, skinId: skinId };
                    // bitmapの場合、ctx を作り出していない様子なのでwillReadFrequently を設定しない。 
                }
            }    
        }
        if( this._preloadSoundPromise.length > 0 ) {
            const _sounds = await Promise.all(this._preloadSoundPromise);
            for(const v of _sounds) {
                const name = v.name;
                const data = v.data;
                const _soundPlayer:IScratchSoundPlayer = await this.audioEngine.decodeSoundPlayer({data});
                const _effects:TEffectChain = this.audioEngine.createEffectChain();
                this._loadedSounds[v.name] = {'name' : name, 'data': data, soundPlayer: _soundPlayer, effectChain: _effects };
            }    
        }
        if ( this._preloadFontPromise.length > 0 ) {
            const _fonts = await Promise.all( this._preloadFontPromise);
            for(const v of _fonts) {
                // Font を登録する
                this._loadedFonts[v.name] = {'name': v.name, 'data': v.data};
            }
        }

        this._preloadDone = true;
    }

    get Image () : IPgImage {
        return this._image;
    }
    get Sound () : IPgSound {
        return this._sound;
    }

    get Font () : IPgFont {
        return this._font;
    }

    $stopAll() {
        this.threads.stopThreadsInterval();
    }

    
    get Control(){
        return {
            "stopAll": this.$stopAll.bind(this),
        }
    }
};

class PgImage implements IPgImage{
    private _p : PgMain;
    constructor(play: PgMain) {
        this._p = play;
    }
    async load(path:string, name:string, translate?:{x:number,y:number}): Promise<void>{
        await this._p.$loadImage(path, name, translate);
    }
}
class PgSound implements IPgSound{
    private _p : PgMain;
    constructor(play: PgMain) {
        this._p = play;
    }
    async load(path:string, name:string): Promise<void>{
        await this._p.$loadSound(path, name);
    }
}
class PgFont implements IPgFont{
    private _p : PgMain;
    constructor(play: PgMain) {
        this._p = play;
    }
    async load(path:string, name:string): Promise<void>{
        await this._p.$loadFont(path, name);
    }
}