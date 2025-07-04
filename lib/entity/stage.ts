import { Backdrops } from "./backdrops";
import { StageControl } from "./stage/stageControl";
import { StageLooks } from "./stage/stageLooks";
import { StageEvent } from "./stage/stageEvent";
import { StageSensing } from "./stage/stageSensing";
import { StageSound } from './stage/stageSound';
import { Entity } from "./entity";
import { QuestionBoxElement } from "../io/questionBoxElement";
import { Sprite } from "./sprite";
import { StageLayering } from "../../Type/stage/CStageLayering";
import { StagePen } from "./stage/stagePen";
import { SvgText } from "./entity/svgText";
import { TextSprite } from "./text/textSprite";
import { StageFont } from "./stage/stageFont";

import type { TEntityOptions } from '@Type/entity/TEntityOptions';
import type { TMouse } from "@Type/mouse";
import type { S3ImageData, TScale } from "@Type/common/typeCommon";
import type { IStage } from "@Type/stage";
import type { IStageControl } from "@Type/stage/IStageControl";
import type { IStageLooks } from "@Type/stage/IStageLooks";
import type { IStageEvent } from "@Type/stage/IStageEvent";
import type { IStageSensing } from "@Type/stage/IStageSensing";
import type { IStageSound } from "@Type/stage/IStageSound";
import type { ISprite } from "@Type/sprite";
import type { ITextSprite } from "@Type/text";
import type { ISvgText } from "@Type/svgText/ISvgText";
import type { IStagePen } from "@Type/stage/IStagePen";
import type { IStageFont } from "@Type/stage/IStageFont";
/**
 * ステージ
 */
export class Stage extends Entity implements IStage{
    private scale: TScale;
    private direction: number;
    /** @internal */
    public backdrops: Backdrops;
    private _sprites: Sprite[];
    private _textSprites: ITextSprite[];
    /** @internal */
    public mouse: TMouse;
    private _Control: IStageControl;
    private _Looks : IStageLooks;
    private _Event : IStageEvent;
    private _Sensing : IStageSensing;
    private _Sound: IStageSound;
    private _Pen: IStagePen;
    private _SvgText: ISvgText;
    private _Font: IStageFont;
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

        this.backdrops = new Backdrops(this.pgMain);
        this._sprites = [];
        this._textSprites = [];

        this.mouse = {scratchX:0, scratchY:0, x:0, y:0, down: false, pageX: 0, pageY: 0, clientX: 0, clientY: 0};
        const me = this;
        // これは Canvasをつくる Element クラスで実行したほうがよさそう（関連性強いため）
        const canvas = this.pgMain.canvas;
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
            
            me.mouse.scratchX = e.offsetX - this.pgMain.canvas.width/2;
            me.mouse.scratchY = this.pgMain.canvas.height/2 - e.offsetY;

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
  
        this.pgMain.stage = this;
        this._Control = new StageControl(this);
        this._Looks = new StageLooks(this);
        this._Event = new StageEvent(this);
        this._Sensing = new StageSensing(this);
        this._Sound = new StageSound(this);
        this._SvgText = new SvgText(this);
        this._Pen = new StagePen(this);
        this._Font = new StageFont(this);
    }
    /** @internal */
    get $sprites (): Sprite[] {
        return this._sprites;
    }
    /** @internal */
    get textSprites(): ITextSprite[] {
        return this._textSprites;
    }
    get sprites (): ISprite[] {
        const sprites : ISprite[] = this._sprites as unknown as ISprite[];
        return sprites;
    }
    /** @internal */
    $addSprite (sprite: Sprite): void {
        this._sprites.push( sprite );
        sprite.z = this._sprites.length
        this._sortSprites();
    }
    /** @internal */
    addSprite (sprite: ISprite): void {
        const _sprite:Sprite = sprite as unknown as Sprite;
        this.$addSprite(_sprite);
    }

    addTextSprite( textSprite: ITextSprite) : void {
        this._textSprites.push(textSprite);
    }
    /** @internal */
    _sortSprites(): void {
        const n0_sprites = this._sprites;
        const n1_sprites = n0_sprites.sort( function( a, b ) {
            if (a.z > b.z) return -1;
            if (b.z > a.z) return +1;
            return 0;
        });
        let _z = n1_sprites.length-1;
        const n2_sprites = n1_sprites.map(s=>{
            s.z = --_z;
            return s;
        });
        this._sprites = n2_sprites;

    }
    /** @internal */
    removeSprite ( sprite: ISprite ): void {
        const curSprite:Sprite = sprite as unknown as Sprite;
        this.$removeSprite(curSprite);
    }
    /** @internal */
    $removeSprite ( sprite: Sprite ): void {
        const curSprite:Sprite = sprite;
        const n_sprites = this._sprites.filter( ( item ) => item !== curSprite );
        this._sprites = n_sprites;
        this._sortSprites();
    }

    /** @internal */
    removeTextSprite( textSprite: ITextSprite ) {
        const n_sprites = this._textSprites.filter( ( item ) => item !== textSprite );
        this._textSprites = n_sprites;

    }
    /**
     * ステージと全スプライトを更新する
     */
    update(): void {
        super.update();
        this.backdrops.setPosition(this.position.x, this.position.y);
        this.backdrops.setScale(this.scale.w, this.scale.h);
        this.backdrops.setDirection(this.direction);
        this.backdrops.update(this.drawableID, this._effect);
        for(const _sprite of this._sprites){
            _sprite.update();
        }
        for(const _sprite of this._textSprites){
            const s : TextSprite = _sprite as unknown as TextSprite;
            s.update();
        }

    }
    /**
     * @internal
     * 描画する
     */    
    draw(): void {
        this.render.renderer.draw();
    }

    public $setSound(soundName: string): void {
        const _soundData = this.pgMain.loadedSounds[soundName];
        if(_soundData == undefined){
            throw "【Sprite.Sound.add】正しいサウンド名を指定してください"
        }
        const soundPlayer = _soundData.soundPlayer;
        const effectChain = _soundData.effectChain;
        super.$setSound(soundName);
        if(this.sounds) {
            this.sounds.set(soundName, soundPlayer, {effects: effectChain} );
        }
    }

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
            _soundData = this.pgMain.loadedSounds[soundName];
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
    public $setSkin(imageName: string) : void {
        let _imageData:S3ImageData = this.pgMain.loadedImages[imageName];
        if(_imageData == undefined) {
            throw "【Stage.Image.add】正しいイメージ名を指定してください"
        }

        const skinId = _imageData.skinId;
        if(this.backdrops){
            this.backdrops.setSkin(imageName, this.drawableID, skinId);    
        }

    }

    /**
     * @internal
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
            _imageData = this.pgMain.loadedImages[imageName];
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
     * @internal
     * イメージ名の配列を返す
     * @returns {string[]}
     */
    $getImageNames(): string[] {
        const iterator = this.backdrops.costumes.keys();
        return Array.from(iterator);
    }
    /**
     * @internal
     * 新しい名前の背景に切り替わったとき、イベント通知をする
     * @param {string} backdropName 
     * @param {string} newBackdropName 
     */
    $emitWhenBackdropChange(backdropName: string, newBackdropName: string): void {
        // 新しい名前の背景に切り替わったとき
        if(backdropName !== newBackdropName){
            this.$broadCastBackdropSwitch(newBackdropName);
        }
    }
    /** @internal */
    async $emitWhenBackdropChangeAndWait(backdropName: string, newBackdropName: string): Promise<void> {
        // 新しい名前の背景に切り替わったとき
        if(backdropName !== newBackdropName){
            await this.$broadCastBackdropSwitchAndWait(newBackdropName);
        }
    }

    /**
     * @internal
     * 次の背景に切り替える
     */
    $nextBackDrop(): void {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.nextCostume();
                const name_after = this.backdrops.currentSkinName();
                this.$emitWhenBackdropChange(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * 次の背景に切り替える
     */
    async $nextBackDropAndWait(): Promise<void> {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.nextCostume();
                const name_after = this.backdrops.currentSkinName();
                await this.$emitWhenBackdropChangeAndWait(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * 前の背景に切り替える
     */
    $prevBackdrop() : void {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.prevCostume();
                const name_after = this.backdrops.currentSkinName();
                this.$emitWhenBackdropChange(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * 前の背景に切り替えて待つ
     */
    async $prevBackdropAndWait() : Promise<void> {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.prevCostume();
                const name_after = this.backdrops.currentSkinName();
                await this.$emitWhenBackdropChangeAndWait(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * どれかの背景にする
     */
    $randomBackdrop() : void {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.randomCostume();
                const name_after = this.backdrops.currentSkinName();
                this.$emitWhenBackdropChange(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * どれかの背景にして待つ
     */
    async $randomBackdropAndWait() : Promise<void> {
        if(!this.$isAlive()) return;
        if(this.backdrops){
            if(this.backdrops.skinSize > 1) {
                const name_before = this.backdrops.currentSkinName();
                this.backdrops.randomCostume();
                const name_after = this.backdrops.currentSkinName();
                await this.$emitWhenBackdropChangeAndWait(name_before, name_after);
            }
        }
    }
    /**
     * @internal
     * 背景名、または背景番号で背景を切り替える
     * @param {string|number} backdrop 
     */
    $switchBackDrop( backdrop: string|number ): void {
        if(!this.$isAlive()) return;
        if( backdrop ){
            if( this.backdrops.skinSize > 0) {
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
    }
    /**
     * @internal
     * 背景名、または背景番号で背景を切り替えて待つ
     * @param {string|number} backdrop 
     */
    async $switchBackdropAndWait( backdrop: string|number ): Promise<void> {
        if(!this.$isAlive()) return;
        if( backdrop ){
            if( this.backdrops.skinSize > 0) {
                if( typeof backdrop === 'string') {
                    const _name = backdrop;
                    if(this.backdrops) {
                        const name_before = this.backdrops.currentSkinName();
                        this.backdrops.switchCostumeByName(_name);
                        const name_after = this.backdrops.currentSkinName();
                        if(name_after != name_before){
                            await this.$emitWhenBackdropChangeAndWait(name_before, name_after);
                        }
                    }
                }else if( Number.isInteger(backdrop)) {
                    const _idx = backdrop;
                    if(this.backdrops){
                        const name_before = this.backdrops.currentSkinName();
                        this.backdrops.switchCostumeByNumber(_idx);
                        const name_after = this.backdrops.currentSkinName();
                        if(name_after != name_before){
                            await this.$emitWhenBackdropChangeAndWait(name_before, name_after);
                        }
                    }
                }
            }
        }
    }
    /**
     * ステージを削除する、同時にスプライトを全て削除する
     */
    remove() {
        for(const _s of this.sprites){
            const s: Sprite = _s as unknown as Sprite;
            s.$remove();
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
     * 見た目
     */
    get Looks(): IStageLooks {
        return this._Looks;
    }
    /**
     * 制御
     */
    get Control() : IStageControl {
        return this._Control;
    }
    /**
     * 調べる
     */
    get Sensing() : IStageSensing {
        return this._Sensing;
    }

    /**
     * イベント
     */
    get Event() {
        return this._Event;
    }
    /**
     * イメージ
     */
    get Image() {
        return {
            "add": this.$setSkin.bind(this),
            "names" : this.$getImageNames.bind(this),
        }
    }
    /**
     * Font
     */
    get Font (): IStageFont{
        return this._Font;
    }
    /**
     * サウンド
     */
    get Sound() {
        return this._Sound;
    }

    get SvgText() : ISvgText {
        return this._SvgText;
    }

    get Pen() : IStagePen {
        return this._Pen;
    }
};