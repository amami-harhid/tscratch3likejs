/**
 * Sprite
 */
import { Backdrops } from "./backdrops";
import { Bubble } from "./sprite/bubble";
import type {BubbleProperties} from "@Type/sprite/TBubble";
import { DragSprite } from "./drag/dragSprite";
import { Entity } from "./entity";
import { Env } from "../env";
import { MathUtil } from "../util/math-util";
import { PenSprite } from './pen/penSprite';
import type { IPenSprite } from "@Type/sprite/pen/IPenSprite";
import { QuestionBoxElement } from "../io/questionBoxElement";
import { SpriteBackdrop } from "./sprite/spriteBackdrop";
import { SpriteControl } from './sprite/spriteControl';
import { SpriteMotion } from './sprite/spriteMotion';
import { SpriteLooks } from './sprite/spriteLooks';
import { SpriteEvent } from './sprite/spriteEvent';
import { SpriteSensing } from './sprite/spriteSensing';
import { SpriteSound } from './sprite/spriteSound';
import { SpritePen } from './sprite/spritePen';
import type { ISpritePen } from "@Type/sprite/ISpritePen";
import { SpriteSensingDistance } from './sprite/spriteSensingDistance';
import { SpriteTextToSpeech } from './sprite/spriteTextToSpeech';
import { SpriteBubble } from "./sprite/spriteBubble";
import { StageLayering } from "./stageLayering";
import { Utils } from "../util/utils";
import { Costumes } from "./costumes";
import type { TypeRotationStyle } from "@Type/entity/TRotationStyle";
import { RotationStyle } from "../../Type/entity/RotationStyle";//"/Type/entity/RotationStyle";
//import { PlayGround } from "lib/playGround";
import { Stage } from "./stage";
import type { TEntityEffects, TEntityOptions } from '@Type/entity/TEntityOptions';
import type { S3ImageData, S3SoundData } from '@Type/common/typeCommon';
//import { Backdrops } from "./backdrops";
import type { ISprite } from "@Type/sprite/ISprite";
import type { ISpriteControl } from "@Type/sprite/ISpriteControl";
import type { ISpriteMotion } from "@Type/sprite/ISpriteMotion";
import type { ISpriteLooks } from "@Type/sprite/ISpriteLooks";
import type { ISpriteMotionPosition } from "@Type/sprite/ISpriteMotionPosition";
import type { ISpriteSensing } from "@Type/sprite/ISpriteSensing";
import type { ISpriteSensingDistance } from "@Type/sprite/ISpriteSensingDistance";
import type { ISpriteBackdrop } from "@Type/sprite/ISpriteBackdrop";
import type { ISpriteBubble } from "@Type/sprite/ISpriteBubble";
import { ISpriteDragMode } from "@Type/sprite/ISpriteDragMode";
import { SpriteDragMode } from "./sprite/spriteDragMode";
export class Sprite extends Entity implements ISprite {
    private bubble?: Bubble;
    /** @internal */
    public costumes?: Costumes;
    private _rotationStyle: TypeRotationStyle;
    private stage: Stage;
    /** @internal */
    public skinId: number;
    /** @internal */
    public skinIdx: number;
    /** @internal */
    public z: number;
    /** @internal */
    public clones?: Sprite[];
    /** @internal */
    public isClone: boolean;
    private originalSprite?: Sprite|null;
    private imageDatas?: S3ImageData[];
    private soundDatas?: S3SoundData[];
    private touchingEdge: boolean;
    /** @internal */
    public bubbleDrawableID: string;
    private _bubbleTimeout?: NodeJS.Timeout;
    /**
     * DragSprite
     * 
     * - dragできるようにするとき
     * ```ts
     *   sprite.dragSprite.draggable = true;
     * ```
     * 
     * - Drag中のとき
     * ```ts
     *   if( sprite.dragSprite.dragging === true ) {
     *       console.log('Drag中です');
     *   }
     * ```
     */
    private _dragSprite : DragSprite;
    private _penSprite: IPenSprite;
    /** 動き */
    private _Motion: ISpriteMotion;
    /** 見た目 */
    private _Looks: ISpriteLooks;
    /** 制御 */
    private _Control: ISpriteControl;
    /** イベント */
    private _Event: SpriteEvent;
    /** 調べる */
    private _Sensing: ISpriteSensing;
    /** サウンド */
    private _Sound: SpriteSound;
    /** ペン */
    private _Pen: ISpritePen;
    private _TextToSpeech: SpriteTextToSpeech;
    private _Distance : ISpriteSensingDistance;
    private _Backdrop : ISpriteBackdrop;
    private _SpriteBubble: ISpriteBubble;
    private _DragMode : ISpriteDragMode;
    /**
     * コンストラクター
     * @param name {string} - 名前
     * @param options {TEntityOptions} - オプション
     * @constructor
     */
    constructor(name?:string, options?:TEntityOptions) {
        let _name:string|undefined = undefined;
        if(name){
            _name = name;
        }else{
            _name = "Sprite_"+Utils.generateUUID();
        }
        const _options = (options)? options : {};
        super(_name, StageLayering.SPRITE_LAYER, _options);
        this.isSprite = true;
        const stage = this.playGround.stage;
        this.stage = stage;
        this.bubble = new Bubble(this);
        this.costumes = new Costumes(this.playGround);
        this._rotationStyle = RotationStyle.ALL_AROUND;
        this.costumes.setRotationStyle(this._rotationStyle);
        this.skinId = -1;
        this.skinIdx = -1;
        this.z = -1;
        this.clones = [];
        this.isClone = false
        this.originalSprite = null;
        this.imageDatas = [];
        this.soundDatas = [];
        this.touchingEdge = false;
        this.bubbleDrawableID = '';
        this._dragSprite = new DragSprite(this);
        this._penSprite = new PenSprite(this);
        this._Motion = new SpriteMotion(this);
        this._Looks = new SpriteLooks(this);
        this._Control = new SpriteControl(this);
        this._Event = new SpriteEvent(this);
        this._Sensing = new SpriteSensing(this);
        this._Sound = new SpriteSound(this);
        this._Pen = new SpritePen(this._penSprite);
        this._TextToSpeech = new SpriteTextToSpeech(this);
        this._Distance = new SpriteSensingDistance(this);
        this._Backdrop = new SpriteBackdrop(this);
        this._SpriteBubble = new SpriteBubble(this);
        this._DragMode = new SpriteDragMode(this._penSprite);
        //this._isAlive = true;
        stage.addSprite(this);
    }
    /**
     * @internal
     * 完全に削除する
     */
    $delete () {
        super.$delete();
        //this.bubble = null;
        delete this.bubble;
        //this.costumes = null;
        delete this.costumes;
        //this.clones = null;
        delete this.clones;
        //this.originalSprite = null;
        delete this.originalSprite;
        //this.imageDatas = null;
        delete this.imageDatas;
        //this.soundDatas = null;
        delete this.soundDatas;
        this._isAlive = false;
    }
    /**
     * @internal
     * スプライトを抹消する
     * @returns 
     */
    $remove() : void {
        if(this._isAlive === false) return;
        if(this.isClone === true && this.originalSprite && this.originalSprite.clones) {
            const clones = this.originalSprite.clones;
            this.originalSprite.clones = clones.filter(s=> s.id !== this.id);
        }
        this.stage.removeSprite(this);
        try{
            this.render.renderer.destroyDrawable(this.drawableID, StageLayering.SPRITE_LAYER);

        }catch(e){
            
        }finally{
            this._isAlive = false;
        }
        if(this.costumes)
            this.costumes.destroyAllSkin();

        this.$delete();
    }
    /**
     * @internal
     * クローンを全て削除する。
     */
    $removeClones() : void {
        if(this.clones) {
            for(const clone of this.clones) {
                clone.$remove();
            }
        }
    }
    /**
     * @internal
     * スプライトが生存していることを判定する
     * @returns {boolean} True: 生存している, False: 生存していない
     */
    $isAlive(): boolean {
        return this._isAlive ==  true;
    }
    /**
     * クローンを作って待つ
     * @param {*} options 
     * @returns {Promise<void>}
     */
    protected async $cloneAndWait(options = {}): Promise<void>{
        await this.$clone(options);
    }
    /**
     * @internal
     * クローンを作る
     * @param options 
     * @returns 
     */
    async $clone(options = {}): Promise<void> {
        if(this.isClone == false){
            if(this.clones == undefined) this.clones = [];
            const newName = `${this.name}_${this.clones.length+1}`;
            // クローン時にエフェクトを引き継ぐ。
            // クローン別にエフェクトを設定したいときは
            // clone() 実行後に 個別に設定すること。
            // const COLOR = ImageEffective.COLOR;
            // const FISHEYE = ImageEffective.FISHEYE;
            // const WHIRL = ImageEffective.WHIRL;
            // const PIXELATE = ImageEffective.PIXELATE;
            // const MOSAIC = ImageEffective.MOSAIC;
            // const BRIGHTNESS = ImageEffective.BRIGHTNESS;
            // const GHOST = ImageEffective.GHOST;
            const _options = {
                'position' : {x: this.$_position.x, y:this.$_position.y}, 
                'scale' : this.$_scale,
                'direction' : (this.$_direction)? this.$_direction: 90,
                'visible': this._visible,
                COLOR : (this._effect.color)? this._effect.color: 0,
                FISHEYE : (this._effect.fisheye)? this._effect.fisheye: 0,
                WHIRL: (this._effect.whirl)? this._effect.whirl: 0,
                PIXELATE: (this._effect.pixelate)? this._effect.pixelate: 0,
                MOSAIC: (this._effect.mosaic)? this._effect.mosaic: 0,
                BRIGHTNESS: (this._effect.brightness)? this._effect.brightness: 0,
                GHOST: (this._effect.ghost)? this._effect.ghost: 0,
            };
            const newOptions = Object.assign(_options, options);
            // @ts-ignore this.constructor()エラーを抑止する
            const newSprite = new this.constructor(newName, newOptions);
            if(this.visible){
                newSprite.$show();
            }else{
                newSprite.$hide();
            }

            // デフォでは本体の前に表示されるので、1つ背面へ移動する
            newSprite.$goBackwardLayers(1)
            //const _visible = 
            //newSprite.$setVisible( false );
            if(this.clones)
                this.clones.push(newSprite);
            newSprite.isClone = true;
            if(this.imageDatas){
                for(const d of this.imageDatas) {
                    // svg image の場合、createSVGSkin の中で非同期になることに注意すること
                    await newSprite.$addImage(d.name); 
                }    
            }
            if(this.costumes){
                let _name = this.costumes.currentSkinName();
                if( _name != null && newSprite.costumes){
                    newSprite.costumes.switchCostumeByName(_name);
                }    
            }
            if(this.soundDatas){
                for(const d of this.soundDatas) {
                    // @type {{name?:string, data?:any}}
                    const _soundData:S3SoundData = {};
                    _soundData.name = d.name;
                    _soundData.data = d.data;
                    //const _options = d.options;
                    if(this.soundDatas) await newSprite.$addSound(_soundData.name);
                    //await newSprite.$addSound(_soundData);
                    // options引き継ぐ
                    const _vol = this.$getSoundVolume();
                    const _pitch = this.$getSoundPitch();
                    if(newSprite.sounds) newSprite.$setSoundVolume( _vol );
                    if(newSprite.sounds) newSprite.$setSoundPitch( _pitch );
                }    
            }
            newSprite.update(); // update() は不要かもしれない。
            newSprite.originalSprite = this;

            // whenClone をemitで起動する。
            const runtime = this.playGround.runtime;
            const eventId = `whenClone_${this.name}`; // 本体スプライトの名前で定義
            runtime.emit(eventId, newSprite);
            return newSprite;
        }
    }
    /**
     * コスチュームを更新する
     * @param target {Sprite}
     */
    protected _costumeProperties(target:Sprite): void {
        // スプライトを消すとき costumes はnullになるので 例外回避する
        if(target.costumes) {
            target.costumes.setPosition(target.$_position.x, target.$_position.y);
            target.costumes.setScale(target.$_scale.w, target.$_scale.h);
            target.costumes.setDirection(target.$_direction);
            target.costumes.update(target.drawableID, this._effect);    
        }
        target.$_prev_position.x = target.$_position.x;
        target.$_prev_position.y = target.$_position.y;
        target.$_prev_scale.w = target.$_scale.w;
        target.$_prev_scale.h = target.$_scale.h;
        target.$_prev_direction = target.$_direction;

    }
    /**
     * 指定した層に移す
     * @param {number} nLayers 
     */
    protected _goLayers(nLayers: number){
        if (this.render.renderer) {
            this.render.renderer.setDrawableOrder(this.drawableID, nLayers, StageLayering.SPRITE_LAYER, true);
        }
    }
    /**
     * @internal
     * 最前面にする
     */
    $goToFront() : void {
        this._goLayers(Infinity); // 最上位
    }
    /**
     * @internal
     * 最背面にする
     */
    $goToBack() : void {
        this._goLayers(-Infinity); // 最下位
    }
    /**
     * @internal
     * 手前に出す
     * @param nLayers {number}
     */
    $goForwardLayers (nLayers: number) : void {
        this._goLayers(nLayers);
    }
    /**
     * @internal
     * 奥に下げる
     * @param nLayers {number}
     */
    $goBackwardLayers (nLayers: number) : void {
        this._goLayers(-nLayers);
    }
    /**
     * UPDATE
     * @internal
     */
    update() {
        super.update();
        if(this._dragSprite.draggable === true) {
            this._dragSprite.update();
        }
        //const _renderer = this.render.renderer;
        this._costumeProperties(this);
        //_renderer.updateDrawablePosition(this.drawableID, this.$_position);
        // スプライトを消すとき bubbleを参照できない
        if(this.bubble){
            if(Env.bubbleScaleLinkedToSprite === true) {
                this.bubble.updateScale(this.$_scale.w, this.$_scale.h);
            }
            this.bubble.moveWithSprite();    
        }
    }
    /**
     * @internal
     * @param x 
     * @param y 
     */
    public $setXY( x: number, y: number ) {
        if(this._penSprite.isPenDown()){
            const penSprite = this._penSprite as unknown as PenSprite;
            penSprite.drawLine();
        }
        super.$setXY(x,y);
    }
    /**
     * @internal
     * 動かす
     * @param steps {number}
     */
    $moveSteps(steps: number): void {
        const radians = MathUtil.degToRad(90 - this.$_direction);
        const dx = steps * Math.cos(radians);
        const dy = steps * Math.sin(radians);
        this.$setXY( this.$_position.x + dx, this.$_position.y + dy );
    
    }
    /**
     * @internal
     * スケールを設定する
     * @param {number|{w:number,h:number}} w 
     * @param {number} h 
     */
    public $setScale(w: number|{w:number,h:number}, h?: number): void {
        
        if(h == undefined){
            const obj = w as {w:number,h:number};
            super.$setScale(obj.w,obj.h);
            if(this.bubble)
                this.bubble.setScale(obj.w, obj.h);

        }else if(Utils.isNumber(w)){
            const _w = w as number;
            super.$setScale(_w,h);
            if(this.bubble){
                this.bubble.setScale(_w, h);
            }
        }
        this.update();
    }
    /** 
     * X座標
     * @internal
     */
    get x() {
        return this.$_position.x;
    }
    /** 
     * X座標を設定
     * @internal 
     */
    set x( x ){
        this.$setX(x);
    }
    /** 
     * Y座標
     * @internal 
     */
    get y(): number {
        return this.$_position.y;
    }
    /** 
     * Y座標を設定
     * @internal 
     */
    set y( y:number ){
        this.$setY(y);
    }
    /**
     * 指定した座標へ行く
     * @internal
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    $goToXY( x: number, y: number ): void {

        if(Utils.isNumber(x)){
            if ( !Utils.isNumber(y)) {
                return;
            }
            // @type {number}
            const _x = x;
            this.$setXY( _x, y );
        }
    }
    /**
     * @internal
     * 指定した座標へ行く.
     * @param x 
     * @param y 
     */
    $moveTo( x: number, y: number ): void {
        this.$goToXY( x, y );       
    }
    /**
     * 触っている枠を返す
     * @returns {{'minDist': number, 'nearestEdge': string}}
     */
    protected $_onEdgeBounds(): {'minDist': number, 'nearestEdge': string} {
        const drawable = this.render.renderer._allDrawables[this.drawableID];
        if( drawable == null || drawable.skin == null) 
            return {'minDist': 0, 'nearestEdge': ''};
        const bounds = this.render.renderer.getBounds(this.drawableID);
        if (!bounds) 
            return {'minDist': 0, 'nearestEdge': ''};
        const stageWidth = this.render.stageWidth;
        const stageHeight = this.render.stageHeight;
        const distLeft = Math.max(0, (stageWidth / 2) + bounds.left);
        const distTop = Math.max(0, (stageHeight / 2) - bounds.top);
        const distRight = Math.max(0, (stageWidth / 2) - bounds.right);
        const distBottom = Math.max(0, (stageHeight / 2) + bounds.bottom);
        // find nearest edge
        let nearestEdge = '';
        let minDist = Infinity;
        if (distLeft < minDist) {
            minDist = distLeft;
            nearestEdge = 'left';
        }
        if (distTop < minDist) {
            minDist = distTop;
            nearestEdge = 'top';
        }
        if (distRight < minDist) {
            minDist = distRight;
            nearestEdge = 'right';
        }
        if (distBottom < minDist) {
            minDist = distBottom;
            nearestEdge = 'bottom';
        }
        if (minDist > 0) {
            return {'minDist': 0, 'nearestEdge': ''}// Not touching any edge
        }
        return {'minDist': minDist, 'nearestEdge':nearestEdge};
    }
    /**
     * @internal
     * もし端に触れたら跳ね返る
     */
    $ifOnEdgeBounds() : void {
        this.$_ifOnEdgeBounds();
    }
    /**
     * もし端に触れたら跳ね返る
     * @returns 
     */
    protected $_ifOnEdgeBounds(): void {
//        this._ifOnEdgeBoundsFlag = false;
        if(!this.$isAlive()) return;
        
        const drawable = this.render.renderer._allDrawables[this.drawableID];
        if( drawable == null || drawable.skin == null) return;
        const bounds = this.render.renderer.getBounds(this.drawableID);
        if (!bounds) return;

        const oldX = this.$_position.x;
        const oldY = this.$_position.y;

        const stageWidth = this.render.stageWidth;
        const stageHeight = this.render.stageHeight;
        const distLeft = Math.max(0, (stageWidth / 2) + bounds.left);
        const distTop = Math.max(0, (stageHeight / 2) - bounds.top);
        const distRight = Math.max(0, (stageWidth / 2) - bounds.right);
        const distBottom = Math.max(0, (stageHeight / 2) + bounds.bottom);
        // find nearest edge
        let nearestEdge = '';
        let minDist = Infinity;
        if (distLeft < minDist) {
            minDist = distLeft;
            nearestEdge = 'left';
        }
        if (distTop < minDist) {
            minDist = distTop;
            nearestEdge = 'top';
        }
        if (distRight < minDist) {
            minDist = distRight;
            nearestEdge = 'right';
        }
        if (distBottom < minDist) {
            minDist = distBottom;
            nearestEdge = 'bottom';
        }
        if (minDist > 0) {
            return;// Not touching any edge
        }
//        this._ifOnEdgeBoundsFlag = true;// 端にふれている。
        // Point away from the nearest edge.
        const radians = MathUtil.degToRad(90 - this.$_direction);
        let dx = Math.cos(radians);
        let dy = -Math.sin(radians);
        if (nearestEdge === 'left') {
            dx = Math.max(0.2, Math.abs(dx));
        } else if (nearestEdge === 'top') {
            dy = Math.max(0.2, Math.abs(dy));
        } else if (nearestEdge === 'right') {
            dx = 0 - Math.max(0.2, Math.abs(dx));
        } else if (nearestEdge === 'bottom') {
            dy = 0 - Math.max(0.2, Math.abs(dy));
        }
        const newDirection = MathUtil.radToDeg(Math.atan2(dy, dx)) + 90;
        this.$_direction = newDirection;
        // Keep within the stage.
        if(this.costumes ) {
//            this.$_keepInFence(this.costumes._position.x, this.costumes._position.y);
            this.$_keepInFence(this.$_position.x, this.$_position.y);
        }
    }
    /**
     * 指定したターゲットのどれかにソースがタッチしていることを判定する
     * @param {Entity} src 
     * @param {Entity[]} targets 
     * @returns 
     */
    protected $isTouchingTargetToTarget(src:Sprite, targets:Sprite[]) {
        let _targets:Sprite[];
        if(Array.isArray(targets)){
            _targets = [...targets];
        }else{
            _targets = [targets];
        }
        for(const t of _targets){
            if(t.clones){
                for(const c of t.clones){
                    _targets.push(c);
                }    
            }
        }
        const touch = super.$isTouchingTargetToTarget(src, _targets);
        return touch;
    }
    /**
     * 枠に出ないように位置を変更する
     * @param x {number}
     * @param y {number}
     * @returns 
     */
    protected $_keepInFence(x: number, y: number): void {
        if(!this.$isAlive()) return;
        const fencedPosition = this.$_keepInFencePosition(x, y);
        if(fencedPosition){
            // this._ifOnEdgeBoundsPosition.x = fencedPosition[0];
            // this._ifOnEdgeBoundsPosition.y = fencedPosition[1];
            
            //this.$_position.x = fencedPosition[0];
            //this.$_position.y = fencedPosition[1];
            this.$setXY(fencedPosition[0],fencedPosition[1]);
        }
    }
    /**
     * 枠に出ないための新しい位置を返す
     * @param {number} newX 
     * @param {number} newY 
     * @returns {number[]}
     */
    protected $_keepInFencePosition(newX: number, newY: number): [number, number] {
        const drawable = this.render.renderer._allDrawables[this.drawableID];
        if( drawable == null || drawable.skin == null) 
            return [newX, newY];
        const bounds = this.render.renderer.getBounds(this.drawableID);
        if(!bounds) 
            return [newX, newY];
        const stageWidth = this.render.stageWidth;
        const stageHeight = this.render.stageHeight;

        const fence = {
            left: -(stageWidth / 2),
            top: stageHeight / 2,
            right: stageWidth / 2,
            bottom: -(stageHeight / 2),
        };
        // Adjust the known bounds to the target position.
        if(this.costumes){
            bounds.left += (newX - this.costumes._position.x);
            bounds.right += (newX - this.costumes._position.x);
            bounds.top += (newY - this.costumes._position.y);
            bounds.bottom += (newY - this.costumes._position.y);    
        }
        // Find how far we need to move the target position.
        let dx = 0;
        let dy = 0;
        let hosei = 0; // 補正用（現在補正はゼロ）
        if (bounds.left < fence.left) {
            dx += fence.left - bounds.left +hosei;
        }
        if (bounds.right > fence.right) {
            dx += fence.right - bounds.right -hosei;
        }
        if (bounds.top > fence.top) {
            dy += fence.top - bounds.top -hosei;
        }
        if (bounds.bottom < fence.bottom) {
            dy += fence.bottom - bounds.bottom +hosei;
        }
        return [newX + dx , newY + dy];
    }
    /**
     * @internal
     * 枠に触っていることを判定する
     * @param _callback 
     * @returns 
     */
    public $isTouchingEdge (_callback?: CallableFunction): boolean {
        if(!this.$isAlive()) false;

        const judge = this.$_onEdgeBounds();
        if(judge  == null )  {
            if( this.touchingEdge === true) this.touchingEdge = false;
            return false;
        }
        const nearestEdge = judge.nearestEdge;
        if(nearestEdge == '') {
            if( this.touchingEdge === true) this.touchingEdge = false;
            return false;
        }
        if(this.touchingEdge === true) {
            return false; 
        }
        if(_callback) {
            const callback = _callback.bind(this);
            setTimeout(callback, 0);
        }

        return true;
    }
    /**
     * @internal
     * 縦の枠に触っていることを判定する
     * @returns 
     */
    public $isTouchingVirticalEdge(): boolean {
        if(!this.$isAlive()) return false;

        const touch = this.$isTouchingEdge();
        if( touch === false) {
            return false;
        }        
        const judge = this.$_onEdgeBounds();
        const nearestEdge = judge.nearestEdge;
        if(nearestEdge == 'bottom' || nearestEdge == 'top') {
            return false;
        }
        return true;
    }
    /**
     * @internal
     * 水平方向の枠に触っていることを判定する
     * @returns 
     */
    public $isTouchingHorizontalEdge (): boolean {
        if(!this.$isAlive()) return false;

        const touch = this.$isTouchingEdge();
        if( touch === false) {
            return false;
        }        
        const judge = this.$_onEdgeBounds();
        const nearestEdge = judge.nearestEdge;
        if(nearestEdge == 'right' || nearestEdge == 'left') {
            return false;
        }
        return true;
    }
    /**
     * @internal
     * ランダムな位置へ行く.
     * @returns 
     */
    $gotoRandomPosition() {
        if(!this.$isAlive()) return;

        const _x = (Math.random() - 0.5 ) * this._libs.stageWidth;
        const _y = (Math.random() - 0.5 ) * this._libs.stageHeight;
        this.$setXY( _x, _y);
    }
    /**
     * @internal
     * マウスポインターの位置へ行く.
     */
    $gotoMousePosition() {
        const position = this._libs.mousePosition;
        this.$setXY(position.x, position.y);
    }
    /**
     * @internal
     * 指定したスプライトの位置へ行く.
     * @param {Sprite} sprite 
     * @returns {void}
     */
    $gotoSprite(sprite: Sprite): void {
        if(!this.$isAlive()) return;
        if( sprite instanceof Sprite ) {
            // const _x = sprite.$_position.x;
            // const _y = sprite.$_position.y;
            const _x = sprite.$_prev_position.x;
            const _y = sprite.$_prev_position.y;
            this.$setXY(_x, _y);
        }    
    }
    /**
     * @internal
     * 指定秒数をかけ、位置を移動する
     * @param {number} sec 
     * @param {number} x 
     * @param {number} y 
     * @returns {Promise<void>}
     */
    async $glideToPosition(sec:number, x:number, y:number): Promise<void> {
        if(!this.$isAlive()) return;
        if(typeof sec != 'number') return;
        let _x = 0;
        let _y = 0;
        if(typeof x == 'number'){
            _x = x;
            _y = y;
        }else{
            // @type {{x:number, y:number}}
            const obj = x as {x:number,y:number};
            _x = obj.x;
            _y = obj.y;
        }
//      let _stopper = false;
        // 停止ボタンクリック時にemit-->on でイベントを受け取り、
        // _stopper = true にしようとしたが、これがなくても停止するので実装をしない
        const _glideX = _x;
        const _glideY = _y;
        return new Promise<void>( async (resolve) => {
            const framesPerSecond = 1000 / Env.pace;
            const stepX = (_glideX - this.$_position.x) / (sec * framesPerSecond);
            const stepY = (_glideY - this.$_position.y) / (sec * framesPerSecond);
            let i = 0;
            const me = this;
            const interval = setInterval(() => {
                // -------
                // 停めるボタン（赤）を押したら、移動を停止するように
                // しようと思って、停める仕組みを作ったが、
                // これは使わないでよい。
                // -------
                // if(_stopper == true) {
                //     clearInterval(interval);
                //     resolve();
                // }
                i += 1;
                me.$setForceXY( me.$_position.x + stepX, me.$_position.y + stepY  );
                if (i / framesPerSecond >= sec) {
                    me.$setForceXY( _glideX, _glideY);
                    clearInterval(interval);
                    resolve();
                }
            },Env.pace);
        });
    }
    /**
     * @internal
     */
    static get Global () {
        return 'global'
    }
    /**
     * @internal
     * マウスポインターへ向く
     * @param {string} _global 
     * @returns {void}
     */
    $pointToMouse ( _global?:string ) {
        if(!this.$isAlive()) return;
        if( _global === Sprite.Global ){
            this.pointTowardsMouseCursolGlobal();
        }else{
            this.pointTowardsMouseCursol();
        }
    }
    /**
     * @internal
     * 指定したスプライトへ向く
     * @param {Sprite} target 
     * @returns {void}
     */
    $pointToTarget( target: Sprite): void {
        if(!this.$isAlive()) return;

        let dx = target.$_position.x - this.$_position.x;
        let dy = target.$_position.y - this.$_position.y;

        let direction = 90 - MathUtil.radToDeg(Math.atan2(dy, dx));
        if(direction > 180) {
            direction -= 360;
        }
        this.$pointInDirection( direction );
    }
    /**
     * @internal
     * 向きを指定する
     * @param {number} d 
     * @returns {void}
     */
    $pointInDirection( d: number ): void {
        if(!this.$isAlive()) return;

        if(d < 0) {
            let _direction = d % 360;
            if( _direction < -180) {
                _direction = 360 + _direction;
            }
            this.$_direction = _direction;
        }else{
            // _derection 0 以上 
            let _direction = d % 360;
            if( _direction > 180) {
                _direction = _direction - 360;
            }
            this.$_direction = _direction;
        }
    }
    /**
     * @internal
     * 回転方向を指定する
     * @param {TypeRotationStyle} style 
     * @returns {void}
     */
    $setRotationStyle( style: TypeRotationStyle ): void {
        this._rotationStyle = style;
        if(!this.$isAlive()) return;
        if(this.costumes){
            this.costumes.setRotationStyle( style );
        }
    }
    /** @internal */
    $getRotationStyle() : TypeRotationStyle {
        return this._rotationStyle;
    }
    /**
     * @internal
     * 次のコスチュームにする
     * @returns 
     */
    $nextCostume(): void {
        if(!this.$isAlive()) return;
        if(this.costumes){
            this.costumes.nextCostume();
        }
    }
    /**
     * @internal
     * コスチュームを切り替える
     * @param costume {string|number} 
     * @returns 
     */
    $switchCostume( costume: string|number ): void {
        if(!this.$isAlive()) return;
        if( costume ){
            if( typeof costume === 'string') {
                const _name = costume;
                if(this.costumes)
                    this.costumes.switchCostumeByName(_name);
 
            }else if( Number.isInteger(costume)) {
                const _idx = costume;
                if(this.costumes)
                    this.costumes.switchCostumeByNumber(_idx);
            }    
        }
    }
    /**
     * @internal
     * 次の背景にする
     */
    $nextBackdrop(): void {
        const stage = this.playGround.stage;
        stage.$nextBackDrop();
    }
    /**
     * @internal
     * 背景を切り替える
     * @param {string|number} backdrop 
     */
    $switchBackdrop( backdrop: string|number ): void {
        const stage = this.playGround.stage;
        stage.$switchBackDrop( backdrop );
    }
    /**
     * @internal
     * @returns 
     */
    $getBackdrops() : Backdrops {
        const stage = this.playGround.stage;
        const backdrops = stage.backdrops;
        return backdrops; 
    }

    protected $setVisible( _visible: boolean ) {
        if(!this.$isAlive()) return;
        this.updateVisible(_visible);
    }

    // async loadSound(name,soundUrl, options={}) {
    //     this._loadSound(name, soundUrl, options);
    // }
    // async loadImage(name, imageUrl) {
    //     this._loadImage(name, imageUrl, this.costumes);
    // }

    /**
     * @internal
     * サウンド名を使ってサウンドをスプライトに追加する
     * @param soundName {string}
     * @returns 
     */
    public async $addSound(soundName: string): Promise<void> {
        if(arguments.length > 1){
            throw "Sound.add 引数が多い";
        }
        let _soundData;
        if(soundName == undefined ){
            throw "【Sprite.Sound.add】サウンドデータの指定がありません"
        }else if(soundName == undefined || typeof soundName == "string"){
            _soundData = this.playGround.loadedSounds[soundName];
            if(_soundData == undefined){
                throw "【Sprite.Sound.add】正しいサウンド名を指定してください"
            }
        }else{
            throw "【Sprite.Sound.add】正しいサウンド名を指定してください"
            //_soundData = soundName;
        }
        if(_soundData['name'] == undefined || _soundData['data'] == undefined ){
            throw "【Sprite.Sound.add】正しいサウンドデータを指定してください"
        }
        if(this.soundDatas){
            _soundData.options = {};
            this.soundDatas.push(_soundData);
            const name = _soundData.name;
            const data = _soundData.data;
            const promise = this._addSound(name, data, {});
            return promise;    
        }
    }
    /**
     * イメージ名を使って、スプライトにイメージを追加する
     * @param imageName {string}
     * @returns 
     */
    protected async $addImage(imageName: string): Promise<void> {
        let _imageData:S3ImageData;
        if(imageName == undefined){
            throw "【Sprite.Image.add】イメージデータの指定がありません"
        }else if(typeof imageName == "string"){
            _imageData = this.playGround.loadedImages[imageName];
            if(_imageData == undefined){
                throw "【Sprite.Image.add】正しいイメージ名を指定してください"
            }
        }else{
            //_imageData = imageName;
            throw "【Sprite.Image.add】正しいイメージ名を指定してください"
        }
        if(_imageData['name'] == undefined || _imageData['data'] == undefined ){
            throw "【Sprite.Image.add】正しいイメージデータを指定してください"
        }
        if( this.imageDatas) {
            this.imageDatas.push(_imageData);
            const name = _imageData.name;
            const data = _imageData.data;
            await this._addImage(name, data, this.costumes);    
        }
        return;
    }
    /**
     * イメージ名の配列を返す
     * @returns {string[]}
     */
    protected $getImageNames(): string[] {
        if(this.costumes){
            const iterator = this.costumes.costumes.keys();
            const arr = Array.from(iterator);
            return arr;    
        }
        return [];
    }
    /**
     * @internal
     * 言う
     * @param {string} text 
     * @param {BubbleProperties} properties 
     * @returns 
     */
    $say( text: string, properties: BubbleProperties = {} ): void {
        if(!this.$isAlive() || !this.bubble) return;
        if( text && (typeof text) == 'string') {
            this.bubble.say( text , properties );
            return;
        }
        // 空テキストのときは フキダシを消す。
        this.bubble.destroyBubble();
    }
    /**
     * @internal
     * 指定した秒数だけ言う。
     * @param {string} text 
     * @param {number} secs 
     * @param {BubbleProperties} properties 
     * @returns 
     */
    async $sayForSecs( text:string, secs:number, properties: BubbleProperties={}): Promise<void> {
        if(!this.$isAlive()) return;
        this.$say(text, properties);
        const me = this;
        return new Promise<void>(resolve => {
            this._bubbleTimeout = setTimeout(() => {
                // タイムアウトしたときに吹き出しを消す
                if(me.bubble){
                    me.bubble.destroyBubble();
                    me._bubbleTimeout = undefined;
                }
                resolve();
            }, 1000 * secs);    
        });
    }
    /**
     * @internal
     * 考える
     * @param {string} text 
     * @param {BubbleProperties} properties 
     * @returns 
     */
    $think( text: string, properties: BubbleProperties = {} ): void {
        if(!this.$isAlive() || this.bubble==undefined) return;
        if( text && (typeof text) == 'string') {
            this.bubble.think( text , properties );
            return;
        }

        this.bubble.destroyBubble();
    }
    /**
     * @internal
     * 指定した秒数だけ考える
     * @param {string} text 
     * @param {number} secs 
     * @param {BubbleProperties} properties 
     * @returns {Promise<void>}
     */
    async $thinkForSecs( text:string, secs:number, properties:BubbleProperties={}): Promise<void> {
        if(!this.$isAlive()) return;
        this.$think(text, properties);
        return new Promise<void>(resolve => {
            this._bubbleTimeout = setTimeout(() => {
                this._bubbleTimeout = undefined;
                if(this.bubble)
                    this.bubble.destroyBubble();
                resolve();
            }, 1000 * secs);
        });
    }
    /**
     * Drawableが存在していることを確認する
     * @returns {boolean}
     */
    protected $_isDrawableExist(): boolean {
        const drawable = this.render.renderer._allDrawables[this.drawableID];
        if(drawable == null){
            return false;
        }
        return true;
    }
    /**
     * @internal
     * 自分自身の縦横表示サイズを得る
     * @returns {{w:number, h: number}}
     */
    $drawingDimensions(): {w: number, h: number} {
        return this.$getDrawingDimensions();
    }
    /**
     * 自分自身の縦横表示サイズを得る
     * @returns {{w:number, h: number}}
     */
    protected $getDrawingDimensions(): {w: number, h: number} {
        let width = 0;
        let height = 0  
        if(this.$_isDrawableExist()){
            const bounds = this.render.renderer.getBounds(this.drawableID);
            height = Math.abs(bounds.top - bounds.bottom);
            width = Math.abs(bounds.left - bounds.right);    
        }   
        return {w:width, h:height};
    }
    /**
     * @internal
     * 現在の位置を取得する
     * @returns {{x: number, y: number}}
     */
    $getCurrentPosition(): {x:number, y:number} {
        const x = this.$_position.x;
        const y = this.$_position.y
        return {x:x, y:y};
    }
    /**
     * @internal
     * 現在の向きを取得する
     * @returns {number}
     */
    $getCurrentDirection(): number {
        return this.$_direction;
    }

    /**
     * @internal
     * 現在のスケールを取得する
     * @returns {{w: number, h: number}}
     */
    public $getCurrentSize() {
        return {w: this.$_scale.w, h: this.$_scale.h};
    }
    /**
     * @internal
     * 質問をして答えを待つ
     * @param {string} text 
     * @returns {Promise<string>}
     */
    public async $askAndWait(text: string): Promise<string>  {
        const question = new QuestionBoxElement();
        const me = this;
        return new Promise<string>(async resolve=>{
            const answer = await question.ask(me, text);
//            question.removeAsk(me);
            resolve(answer);
        });
    }

    /**
     * 位置
     */
    get Position() {
        const me = this;
        const position = {
            "x" : 0,
            "y" : 0,
            "xy" : {x:0, y:0},
        };
        Object.defineProperty(position, "x", {
            get : function() {
                return me.$_position.x;
            },
            set : function(x) {
                me.$setX(x);
            }
        })
        Object.defineProperty(position, "y", {
            get : function() {
                return me.$_position.y;
            },
            set : function(y) {
                //me._Motion.Position.y = y;
                me.$setY(y);
            }
        })
        Object.defineProperty(position, "xy", {
            get : function() {
                const x = me.$_position.x;
                const y = me.$_position.y;
                return {x: x, y: y};
            },
            set : function(xy: {x:number, y:number}) {
                me.$setXY(xy.x, xy.y);
            }
        })

        return position;
    }
    /**
     * 向き
     */
    get Direction() {
        const me = this;
        const direction = {"degree": 0};
        Object.defineProperty(direction, "degree", {
            get : function() {
                return me.$getCurrentDirection();
            },
            set : function(degree) {
                me.$pointInDirection(degree);
            }
        })

        return direction;
    }
    // get M(){
    //     return this.Motion;
    // }

    /**
     * 動き
     */
    get Motion() {
        return this._Motion;
    }
    // /**
    //  * 動き
    //  */
    // get Motion() {
    //     return {
    //         /** 位置 */
    //         "Position" : this.Position,
    //         /** 向き */
    //         "Direction": this.Direction,
    //         "getCurrentPosition": this.$getCurrentPosition.bind(this),
    //         "getCurrentDirection": this.$getCurrentDirection.bind(this),
    //         "moveSteps" : this.$moveSteps.bind(this),
    //         "moveTo" : this.$moveTo.bind(this),
    //         "ifOnEdgeBounds" : this.$ifOnEdgeBounds.bind(this),
    //         "gotoRandomPosition": this.$gotoRandomPosition.bind(this),
    //         "gotoMousePosition" : this.$gotoMousePosition.bind(this),
    //         "gotoSprite" : this.$gotoSprite.bind(this),
    //         "glideToPosition": this.$glideToPosition.bind(this),
    //         /** マウスの位置へ向く */
    //         "pointToMouse" : this.$pointToMouse.bind(this),
    //         /** 指定したターゲットの位置へ向く */
    //         "pointToTarget" : this.$pointToTarget.bind(this),
    //         /** 角度を指定して向きを変える */
    //         "pointInDerection" : this.$pointInDerection.bind(this),
    //         /** 回転方法を指定する */
    //         "setRotationStyle" : this.$setRotationStyle.bind(this),
    //         //--- Entity
    //         "gotoXY": this.$goToXY.bind(this),
    //         "pointInDirection": this.$setDirection.bind(this),
    //         "turnRightDegrees": this.$turnRight.bind(this),
    //         "turnLeftDegrees" : this.$turnLeft.bind(this),
    //         "setXY" : this.$setXY.bind(this),
    //         "setX" : this.$setX.bind(this),
    //         "setY" : this.$setY.bind(this),
    //         "changeX" : this.$changeX.bind(this),
    //         "changeY" : this.$changeY.bind(this),

    //     };
    // }

    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     * 使用例：this.Costume.no, this.Costume.name
     * @returns {{no: number, name: string}}
     */
    get Costume(): {no: number, name: string} {
        const me = this;
        const costume = {"no": 0, "name": ""};
        Object.defineProperty(costume, "no", {
            // @type {number}
            get : function() {
                if(me.costumes)
                    return me.costumes.currentSkinNo();
                else
                    return -1;
            },
        })
        Object.defineProperty(costume, "name", {
            // @type {string}
            get : function() {
                if(me.costumes)
                    return me.costumes.currentSkinName();
                else
                    return '';
            },
        })

        return costume;
    }
    
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     * ```ts
     *   this.Backdrop.no // 背景の番号
     *   this.Backdrop.name // 背景の名前
     * ```
     * @returns {{no: number, name: string}}
     */
    get Backdrop(): ISpriteBackdrop { 
        return this._Backdrop;
        // const stage = this.playGround.stage;
        // const backdrop : ISpriteBackdrop = {"no": 0, "name": ""};
        // Object.defineProperty(backdrop, "no", {
        //     get : function() {
        //         return stage.backdrops.currentSkinNo();
        //     },
        // })
        // Object.defineProperty(backdrop, "name", {
        //     get : function() {
        //         return stage.backdrops.currentSkinName();
        //     },
        // })
        // return backdrop;

    }
    // /**
    //  * サイズを操作する
    //  * ```ts
    //  *  console.log(this.Size.w); // 横幅を取得する
    //  *  console.log(this.Size.h); // 縦幅を取得する
    //  * ```
    //  * ```ts
    //  *  this.Size.w = 100; // 横幅100%にする
    //  *  this.Size.w = 50; // 縦幅50%にする
    //  * ```
    //  * ```ts
    //  *  console.log(this.Size.scale); // スケールを取得する
    //  *  this.Size.scale = {w:100, h:50}; // スケールを設定する
    //  * ```
    //  */
    // get Size(){
    //     const me = this;
    //     const size = {
    //         w: 0, h: 0, scale: {w:0,h:0},
    //     }
    //     Object.defineProperty(size, "w", {
    //         get : function() {
    //             const {w} = me.$getCurrentSize();
    //             return w;
    //         },
    //         set : function(w) {
    //             const {h} = me.$getCurrentSize();
    //             me.$setScale(w, h);
    //         }
    //     })
    //     Object.defineProperty(size, "h", {
    //         get : function() {
    //             const {h} = me.$getCurrentSize();
    //             return h;
    //         },
    //         set : function(h) {
    //             const {w} = me.$getCurrentSize();
    //             me.$setScale(w, h);
    //         }
    //     })
    //     Object.defineProperty(size, "scale", {
    //         get : function() {
    //             const {w, h} = me.$getCurrentSize();
    //             return {w:w,h:h};
    //         },
    //         set : function(scale) {
    //             if(scale && scale.w != undefined && scale.h != undefined){
    //                 me.$setScale(scale.w, scale.h);
    //             }
    //         }
    //     })

    //     return size;
    // }
    // get L() {
    //     return this.Looks;
    // }

    /**
     * 見た目
     */
    get Looks() : ISpriteLooks {
        return this._Looks;
    }
    // /**
    //  * 見た目
    //  */
    // get Looks(){
    //     return {
    //         "Costume" : this.Costume,
    //         "Backdrop" : this.Backdrop,
    //         "nextCostume": this.$nextCostume.bind(this),
    //         "switchCostume": this.$switchCostume.bind(this),
    //         "nextBackdrop": this.$nextBackdrop.bind(this),       // Sprite-->Stageへ
    //         "switchBackdrop": this.$switchBackdrop.bind(this),   // Sprite-->Stageへ
    //         "say": this.$say.bind(this),
    //         "sayForSecs": this.$sayForSecs.bind(this),
    //         "think": this.$think.bind(this),
    //         "thinkForSecs": this.$thinkForSecs.bind(this),
    //         "changeSizeBy" : this.$changeSizeBy.bind(this),
    //         "Size": this.Size,
    //         "getSize" : this.$getCurrentSize.bind(this),
    //         "setSize" : this.$setScale.bind(this),
    //         "changeEffectBy": this.$changeEffectBy.bind(this),
    //         "setEffect": this.$setEffectTo.bind(this),
    //         "clearEffects": this.$clearEffect.bind(this),
    //         "show": this.$show.bind(this),
    //         "hide": this.$hide.bind(this),
    //         "goToFront": this.$goToFront.bind(this),
    //         "goToBack": this.$goToBack.bind(this),
    //         "goForwardLayers": this.$goForwardLayers.bind(this),
    //         "goBackwardLayers": this.$goBackwardLayers.bind(this),
    //         "drawingDimensions":this.$drawingDimensions.bind(this),
            

    //     };
    // }
    // get C() {
    //     return this.Control;
    // }

    /**
     * 制御
     */
    get Control(): ISpriteControl {
        return this._Control;
    }
    // /**
    //  * 制御
    //  */
    // get Control() {
    //     return {
    //         "wait" : this.$waitSeconds.bind(this),
    //         "waitUntil": this.$waitUntil.bind(this),
    //         "waitWhile": this.$waitWhile.bind(this),
    //         "cloneAndWait": this.$cloneAndWait.bind(this),
    //         "clone": this.$clone.bind(this),
    //         "removeAllClones": this.$removeClones.bind(this),
    //         "whenCloned": this.$whenCloned.bind(this),
    //         //---- Entity
    //         "forever": this.forever.bind(this),
    //         "while": this.while.bind(this),
    //         "repeat": this.repeat.bind(this),
    //         "repeatUntil": this.repeatUntil.bind(this),
    //         "stopAll" : this.$stopAll.bind(this),
    //         "remove"  : this.$remove.bind(this),
    //         "alive"   : this.$isAlive.bind(this),
    //         "stopThisScript" : this.$stopThisScript.bind(this),
    //         "stopOtherScripts" : this.$stopOtherScripts.bind(this),

    //     };
    // }

    /**
     * 距離
     * 使用例：マウスポインターとの距離 
     * this.Distance.mousePointer
     * 使用例：他スプライトとの距離
     * this.Distance.to( otherSprite )
     * 
     */
    get Distance() : ISpriteSensingDistance{
        return this._Distance;
    }
    // get Distance(){
    //     const me = this;
    //     /** 他スプライトとの距離を計算する */
    //     const distanceToOthers = function(otherSprite:Sprite) {
    //         if(otherSprite && (otherSprite.isSprite === true )){
    //             const obj1 = {
    //                 x: me._Motion.Position.x,
    //                 y: me._Motion.Position.y,
    //             }
    //             const obj2 = {
    //                 x: otherSprite._Motion.Position.x,
    //                 y: otherSprite._Motion.Position.y,
    //             }
    //             const _distance = Utils.distance(obj1, obj2);
    //             return _distance;
    //         }
    //         return -1;
    //     }
    //     const distance = {
    //         "mousePointer": 0,
    //         "to": distanceToOthers,
    //     };
    //     Object.defineProperty(distance, "mousePointer", {
    //         get : function() {
    //             const obj1 = {
    //                 x: me._Motion.Position.x,
    //                 y: me._Motion.Position.y,
    //             }
    //             const obj2 = {
    //                 x: me.Sensing.Mouse.x,
    //                 y: me.Sensing.Mouse.y,
    //             }
    //             const _distance = Utils.distance(obj1, obj2);
    //             return _distance;
    //         },
    //     })
    //     return distance;

    // }
    /**
     * 調べる
     */
    get Sensing() : ISpriteSensing {
        return this._Sensing;
    }
    // get Sensing() {
    //     return {
    //         "askAndWait": this.$askAndWait.bind(this),
    //         "isKeyDown" : this.$isKeyDown.bind(this),
    //         "isKeyNotDown" : this.$isKeyNotDown.bind(this),
    //         "isMouseDown" : this.$isMouseDown.bind(this),
    //         "Mouse" : this.Mouse,
    //         "Distance": this.Distance,
    //         "timer" : this.$timer,
    //         "resetTimer": this.$resetTimer.bind(this),

    //         "isTouchingEdge" : this.$isTouchingEdge.bind(this),
    //         "isTouchingVirticalEdge" : this.$isTouchingVirticalEdge.bind(this),
    //         "isTouchingHorizontalEdge" : this.$isTouchingHorizontalEdge.bind(this),
    //         "isNotMouseTouching" : this.$isNotMouseTouching.bind(this),
    //         "isMouseTouching": this.$isMouseTouching.bind(this),
    //         "isTouchingToSprite": this.$isTouchingTarget.bind(this),
    //         "getTouchingSprites": this.$getTouchingTarget.bind(this),
    //         "isTouchingToColor" : this.$isTouchingColor.bind(this),
    //         "colorIsTouchingToColor" : this.$colorIsTouchingColor.bind(this),
    //         "DragMode": this.DragMode,
    //     }
    // }
    // get E() {
    //     return this.Event;
    // }
    /**
     * イベント
     */
    get Event() {
        return this._Event;
    }
//     get Event() {
//         return {
//             "broadcast" : this.$broadcast.bind(this),
//             "broadcastAndWait" : this.$broadcastAndWait.bind(this),
//             // "broadcastToTargets": this.$broadcastToTargets.bind(this),
//             // "broadcastAndWaitToTargets": this.$broadcastAndWaitToTargets.bind(this),
//             "whenBroadcastReceived": this.$whenBroadcastReceived.bind(this),
//             "whenRightNow": this.$whenRightNow.bind(this),
//             "whenFlag": this.$whenFlag.bind(this),
//             "whenKeyPressed": this.$whenKeyPressed.bind(this),
// //            "whenMouseTouched": this.$whenMouseTouched.bind(this),
// //            "whenTargetMouseTouched": this.$whenTouchingTarget.bind(this),
//             "whenClicked": this.$whenClicked.bind(this),
//             /** 背景が〇〇に変わったとき */
//             "whenBackdropSwitches": this.$whenBackdropSwitches.bind(this),



//         }
//     }
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
        return this._TextToSpeech;
    }
    // get TextToSpeech() {
    //     return {
    //         //---Entity
    //         "setSpeechProperties": this.$setSpeechProperties.bind(this),
    //         "speech": this.$speech.bind(this),
    //         "speechAndWait" : this.$speechAndWait.bind(this),
    //         "speechStopAll": this.$speechStopImmediately.bind(this),
    //     }
    // }

    /**
     * DragModeを設定するためのオブジェクト
     * @returns {{draggable: boolean, dragging: boolean}}
     */
    get DragMode(): ISpriteDragMode {
        return this._DragMode;
        // const draggable = {"draggable": false, dragging: false};
        // const me = this;
        // Object.defineProperty(draggable, "draggable", {
        //     get : function() {
        //         return me._dragSprite.draggable;
        //     },
        //     set : function(draggable) {
        //         return me._dragSprite.draggable = draggable;
        //     },
        // });
        // Object.defineProperty(draggable, "dragging", {
        //     get : function() {
        //         return me._dragSprite.dragging;
        //     },
        //     set : function(dragging) {
        //         return me._dragSprite.dragging = dragging;
        //     },
        // });
        // return draggable;

    }
    /**
     * ペン機能
     */
    get Pen() : ISpritePen{
        return this._Pen;
        // const pen = this._penSprite;
        // return {
        //     'drawLine' : pen.drawLine.bind(pen),
        //     'drawPoint': pen.drawPoint.bind(pen),
        //     'penClear': pen.penClear.bind(pen),
        //     'penUp': pen.penUp.bind(pen),
        //     'penDown': pen.penDown.bind(pen),
        //     'stamp': pen.stamp.bind(pen),
        //     'setPenHue': pen.setPenHue.bind(pen),
        //     'changePenHue': pen.changePenHue.bind(pen),
        //     'setPenSaturation': pen.setPenSaturation.bind(pen),
        //     'changePenSaturation': pen.changePenSaturation.bind(pen),
        //     'setPenBrightness': pen.setPenBrightness.bind(pen),
        //     'changePenBrightness': pen.changePenBrightness.bind(pen),
        //     'setPenTransparency': pen.setPenTransparency.bind(pen),
        //     'changePenTransparency': pen.changePenTransparency.bind(pen),
        //     'setPenSize': pen.setPenSize.bind(pen),
        //     'changePenSize': pen.changePenSize.bind(pen),
        //     'HSVColor': pen.HSVColor,
        //     'Size': pen.Size,
        // }
    }
    get Bubble() : ISpriteBubble {
        return this._SpriteBubble;
    }
};