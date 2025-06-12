/**
 * PlayGround
 */
import { Env } from './env';
import { FontLoader } from './importer/fontLoader';
import { ImageLoader } from './importer/imageLoader';
import { Libs } from './controls/libs';
import { Render } from './render/render';
import { Runtime } from './engine/runtime';
import { Threads } from './controls/threads';
import { SoundLoader } from './importer/soundLoader';
import { Sprite } from './entity/sprite';
import { Stage } from './entity/stage';
import { Utils } from './util/utils';

import { S3Element } from './elements/element';

import type { IPgFont, IPgImage, IPgSound, IPlayGround } from '@Type/playground';
import { Monitors } from './monitor/monitors';

export class PlayGround implements IPlayGround {
    static _instance;

    /**
     * 
     * @return {PlayGround}
     */
    static getInstance(): PlayGround {
        if( PlayGround._instance == undefined ) {
            PlayGround._instance = new PlayGround();
        }
        return PlayGround._instance;
    }
    public main?: HTMLElement;
    private _id : string;
    private _runtime: Runtime|null; 
    private _render?: Render;
    private _libs: Libs;
    private _flag: HTMLElement|null;
    private mainTmp: HTMLElement|null;
    //private _nowLoading: string;
    public runningGame: boolean;
    private _stage: Stage|null;
    private _canvas: HTMLCanvasElement|null;
    private _textCanvas: HTMLCanvasElement|null;
    private _monitors: Monitors|null;
    public preload?() : Promise<void>;
    public prepare?(): Promise<void>;
    public setting?(): Promise<void>;
    public draw?(): Promise<void>;
    private _preloadImagePromise:Promise<{name:string, data:string|HTMLImageElement}>[];
    private _preloadSoundPromise: Promise<{name:string, data:Uint8Array<ArrayBuffer>}>[];
    private _preloadFontPromise: Promise<{name:string, data:string}>[];
    private _loadedImages: {name?:string, data?:string|HTMLImageElement};
    private _loadedSounds: {name?:string, data?:Uint8Array<ArrayBuffer>};
    private _loadedFonts: {name?:string,data?:string};
    private _preloadDone: boolean;
    private _prepaeDone: boolean;
    private _image: IPgImage;
    private _sound: IPgSound;
    private _font: IPgFont;
    constructor () {
        this._id = this._generateUUID();
        this._runtime = null;
        this._preloadImagePromise = [];
        this._preloadSoundPromise = [];
        this._preloadFontPromise = [];
        this._loadedImages = {};
        this._loadedSounds = {};
        this._loadedFonts = {};
//        this._dataPools = {};
        this._preloadDone = false;
        this._prepaeDone = false;
        this._stage = null;
        this._monitors = null;
        this.runningGame = false;
        this._canvas = null;
        this._flag = null;
        this.mainTmp = null;
        this.main = undefined;
        //this.preload = null;
        //this.prepare = null;
        //this.setting = null;
        //this.draw = null;
        this._textCanvas = null;
        this._libs = Libs.getInstance();
        this._libs.p = this;
        //this._nowLoading = '';
        Threads.p = this;
        this._image = new PgImage(this);
        this._sound = new PgSound(this);
        this._font = new PgFont(this);
    }
    get monitors() {
        return this._monitors;
    }
    set monitors(_monitors){
        this._monitors = _monitors;
    }
    isPrepareDone(){
        return this._prepaeDone;
    }
    // clearPools() {
    //     const _pool = this._dataPoolSprite;
    //     for (let key in _pool){ 
    //         delete this._dataPoolSprite[key]
    //     }
    // }
    get loadedImages() {
        return this._loadedImages;
    }
    get loadedSounds() {
        return this._loadedSounds;
    }
    get loadedFonts() {
        return this._loadedFonts;
    }
    // get dataPools() {
    //     return this._dataPools;
    // }
    // set dataPools(_dataPool) {
    //     this._dataPools = _dataPool;
    // }

    get Libs () {
        return this._libs;
    }
    get Element () {
        return S3Element;
    }
    get Stage () {
        return Stage;
    }    
    _generateUUID () {
        return Utils.generateUUID();
    }

    // set NowLoading (nowLoading){
    //     this._nowLoading = nowLoading;
    // }
    // get NowLoading () {
    //     return this._nowLoading;
    // }

    get threads () {
        return Threads.getInstance();
    }
    /**
     * render を取得する
     */
    get render () : Render {
        if(this._render == undefined) throw 'render undefined error';
        return this._render;
    }
    /**
     * render を設定する
     */
    set render( render ) {
        // _init() の中で設定される。
        this._render = render;
    }

    set runtime(runtime) {
        this._runtime = runtime;
    }

    get runtime()  {
        if(this._runtime == undefined) throw 'runtime undefined error';
        return this._runtime;
    }

    set stage ( stage ) {
        this._stage = stage;
    }

    get stage () {
        if( this._stage == undefined) throw 'stage undefined error';
        return this._stage;
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }
    get canvas() {
        if(this._canvas == undefined) throw 'canvas undefined error';
        return this._canvas;
    }
    set textCanvas(textCanvas) {
        this._textCanvas = textCanvas;
    }
    get textCanvas() {
        if(this._textCanvas == undefined) throw 'textCanvas undefined error';
        return this._textCanvas;
    }
    get $stageWidth () {
        if(this._render){
            return this._render.stageWidth;
        }
        throw 'unable calclulate stageWidth';
    }

    get $stageHeight () {
        if(this._render){
            return this._render.stageHeight;
        }
        throw 'unable calclulate stageHeight';
    }


    /**
     * get randering rate ( when resized )
     * @returns 
     */
    getRenderRate() : {x:number, y:number}{
        return this._libs.renderRate;        
    }


    set flag ( flag:HTMLElement ) {
        this._flag = flag;
    }

    get flag (): HTMLElement {
        if(this._flag){
            return this._flag;
        }
        throw 'unable to get flag element';
    }

    ifMainExist() {
        const main = document.getElementById('main');
        if(main) return main;
        return false;
    }
    removeMainIfExist(){
        const main = this.ifMainExist();
        if(main){
            main.remove();
        }
    }
    async _reStart() {
        await this._setting();
    }
    /**
     * HTMLヘッダーtitle
     */
    get title() {
        return document.title;
    }
    set title(_title) {
        document.title = _title;
    }

    async _init() {
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
        await Utils.wait(100);
        this._preload();
        await this._waitUntilPreloadDone();

        S3Element.p = this;
        this.main = await S3Element.init();
        const main = this.main;
        if(main == undefined){
            throw 'unable to add main classList';
        }
        main.classList.add(S3Element.DISPLAY_NONE);
        this._render = new Render();
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
            await Utils.wait(1000/Env.fps);
            if( this._stage ) {
                this._stage.update();
                this._stage.draw();
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
    $loadFont(fontUrl:string, name:string) : Promise<{name:string, data:string}>{
        //console.log('$loadFont', fontUrl, name);
        const font = FontLoader.fontLoad(fontUrl, name);
        this._preloadFontPromise.push(font);
        return font;
    }
    spriteClone( src, callback ) {
        if( src instanceof Sprite ) {
            const _src = src;
            _src.$clone().then( async( c ) =>{
                if( callback ) {
                    const _callback = callback.bind( c );
                    _callback();
                }
            });
        }
    }

    get preloadDone() {
        return this._preloadDone;
    }
    async _waitUntilPreloadDone() {
        if(this._preloadImagePromise.length > 0 ) {
            const _images = await Promise.all(this._preloadImagePromise);
            for(const v of _images) {
                this._loadedImages[v.name] = {'name': v.name, 'data': v.data };
            }    
        }
        if( this._preloadSoundPromise.length > 0 ) {
            const _sounds = await Promise.all(this._preloadSoundPromise);
            for(const v of _sounds) {
                this._loadedSounds[v.name] = {'name' : v.name, 'data': v.data };
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
    private _p : PlayGround;
    constructor(playGround: PlayGround) {
        this._p = playGround;
    }
    async load(path:string, name:string, translate?:{x:number,y:number}): Promise<void>{
        await this._p.$loadImage(path, name, translate);
    }
}
class PgSound implements IPgSound{
    private _p : PlayGround;
    constructor(playGround: PlayGround) {
        this._p = playGround;
    }
    async load(path:string, name:string): Promise<void>{
        await this._p.$loadSound(path, name);
    }
}
class PgFont implements IPgFont{
    private _p : PlayGround;
    constructor(playGround: PlayGround) {
        this._p = playGround;
    }
    async load(path:string, name:string): Promise<void>{
        await this._p.$loadFont(path, name);
    }
}