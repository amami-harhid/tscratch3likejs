/**
 * Render
 */
const ScratchRender = require('scratch-render');
import { Canvas } from '../elements/canvas';
import { S3Element } from '../elements/element';
import { PlayGround } from '../playGround';
import { StageLayering } from '../entity/stageLayering';
import { IRenderWebGL } from './IRenderWebGL';

export class Render {
    /**
     * ステージ縦横比(縦÷高さの率)
     */
    static get WHRate(): number {
        return 0.75;
    }
    /**
     * ステージの横ピクセル数(CSSピクセル)
     */
    static get W(): number {
        //const Scratch3StageWidth = 240;
        const WHRate = Render.WHRate; // ( 3/4 )
        // 上部にコントロールバースペースを確保するため少しだけ縮小する
        // 縮小率は試行錯誤して決めた。
        const InnerWidthRate = 0.95;// 0.95; //0.8;
        const InnerHeightRate = 0.95;
        // devicePixelRatio:CSSピクセルが何個の物理ピクセルで表示されるのかという値
        const _devicePixelRatio = window.devicePixelRatio;
        // ブラウザビューポートの幅
        const _innerWidth = window.innerWidth;
        // ブラウザビューポートの高さ
        const _innerHeight = window.innerHeight;
        let w = (_innerWidth / _devicePixelRatio)* InnerWidthRate;
        let h = w * WHRate;
        const hLimit = (_innerHeight / _devicePixelRatio) * InnerHeightRate;
        if( h > hLimit ) {
            h = hLimit;
            w = h / WHRate;
        }
        return w;
    }
    /**
     * ステージの縦ピクセル数(CSSピクセル)
     */
    static get H() {
        return Render.W * Render.WHRate;
    }
    private static playGround: PlayGround|undefined;
    /** PlayGroundのGetter @returns {PlayGround} */
    static get p(): PlayGround {
        if(Render.playGround==undefined) throw 'PlayGround is undefined.';
        return Render.playGround;
    }
    /** PlayGroundのSetter @param {PlayGround} playGround */
    static set p(playGround: PlayGround){
        Render.playGround = playGround;
    }
    private layerGroups: StageLayering[];
    public stageWidth: number;
    public stageHeight: number;
    private _renderer: IRenderWebGL|null;
    private canvas: HTMLCanvasElement|null;
    /**
     * @constructor
     * @param layerGroups {StageLayering[]}
     */
    constructor(layerGroups = StageLayering.LAYER_GROUPS) {
        this.layerGroups = layerGroups;
        this.stageWidth = 0;
        this.stageHeight = 0;
        this._renderer = null;
        this.canvas = null;
        this.createRenderer();
        const me = this;
        const resizeWindow = function() {
            const main = Render.p.main;
            S3Element.mainPositioning(main);
            me.stageResize();
        };
        window.addEventListener('resize', resizeWindow);
    }
    /**
     * ステージをリサイズする
     * @param w {number} - 横
     * @param h {number} - 縦
     */
    stageResize(w: number = Render.W , h: number = Render.H): void {
        if(this._renderer){
            this._renderer.resize( w, h ); // stage(canvas)のサイズ property(width,height)の値をリサイズ
            const _nativeSize = this._renderer.getNativeSize ();
            this.stageWidth = _nativeSize[0];
            this.stageHeight = _nativeSize[1];
            Canvas.resize2DContext( w, h);
            Render.monitorCanvasResize( w, h);    
        }
    }
    /**
     * MonitorCanvasをリサイズする
     * @param w {number} 横幅
     * @param h {number} 縦幅
     */
    static monitorCanvasResize(w: number = Render.W , h: number = Render.H): void {
        Canvas.resizeMonitorCanvas(w, h);

    }
    /**
     * Rendererを作成する
     * @param w 
     * @param h 
     */
    createRenderer (w = Render.W , h = Render.H ) {
        this.canvas = S3Element.canvas;
        this._renderer = new ScratchRender(this.canvas);
        if(this._renderer){
            this._renderer.setLayerGroupOrdering(this.layerGroups);
            this.stageResize(w,h);    
        }    
    }
    /**
     * Drawableを作成する
     * @param layer {StageLayering} - layer name
     * @returns {number} - drawableID.
     */
    createDrawable(layer: StageLayering) : number {
        if(this._renderer){
            const drawableID = this._renderer.createDrawable(layer);
            return drawableID;    
        }
        throw `'createDrawable' failed, renderer is null `;
    }
    /**
     * Rendererを取得する
     */
    get renderer(): IRenderWebGL {
        if(this._renderer == undefined) throw 'Not found renderer error';
        return this._renderer;
    }
    
};