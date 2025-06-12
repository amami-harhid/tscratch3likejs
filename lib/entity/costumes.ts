/**
 * Costumes
 */
import { Env } from "../env";
import { ImageLoader } from "../importer/imageLoader";
import { MathUtil } from "../util/math-util";
import { RotationStyle } from "../../Type/entity/RotationStyle"; 
import { Utils } from "../util/utils";
import { Render } from '../render/render';
import { PlayGround } from "../playGround";
import { TPosition, TSizeXY } from "@Type/common/typeCommon";
import type { ISvgSkin } from "@Type/render/ISvgSkin";
import type { ScratchRenderProperties } from "@Type/render/IRenderWebGL";

export class Costumes {
    static get RotationStyle () {
        return RotationStyle;
    }
    private _p: PlayGround;
    private render: Render;
    public skinId: number;
    public costumes: Map<string,number>;
    public _position: TPosition;
    private _direction: number;
    private _scale: TSizeXY;
    private _rotationStyle: RotationStyle;
    private _rotationStylePatterns: RotationStyle[];
    /**
     * @constructor
     */
    constructor(playGround: PlayGround) {
        this._p = playGround;
        this.render = this._p.render;
        this.skinId = -1;
        this.costumes = new Map();
        this._position = {x:0, y:0};
        this._direction = 90;
        this._scale = {x:100, y:100};
        this._rotationStyle = RotationStyle.ALL_AROUND;
        this._rotationStylePatterns = [RotationStyle.LEFT_RIGHT, RotationStyle.DONT_ROTATE, RotationStyle.ALL_AROUND];
    }
    get names() : string[] {
        return Array.from(this.costumes.keys());
    }
    async addImageDirectSVG(name: string, image: string): Promise<number> {
        const skinId = this.render.renderer.createSVGSkin(image);
        this.costumes.set( name , skinId);
        if( this.skinId == -1) {
            this.skinId = skinId; // 初回のSkinId 
        }
        await Utils.wait(1000/Env.fps);
        return skinId;
    }
    async updateSkinDirectSVG(name: string, image:string): Promise<number> {
        const skinId = this.costumes.get(name);
        if(skinId ) {
            this.render.renderer.updateSVGSkin(skinId, image);
            await Utils.wait(1000/Env.fps);
            return skinId;
        }else{
            return this.skinId;
        }
    }
    async addImage(name:string, image: string|HTMLImageElement): Promise<void> {
        await this._setSkin(name, image);
        await Utils.wait(1000/Env.fps);
    }
    async updateImage(name:string, image: string|HTMLImageElement): Promise<number> {
        await this._updateSkin(name, image);
        return this.skinId;
    }

    // async loadImage(name:string, image:string) {
    //     const _img = await ImageLoader.loadImage(image, name);
    //     console.log('--- Costumes, loadImage _img ---')
    //     console.log(_img);
    //     this.addImage(name,_img);
    // }
    async _setSkin(name: string, _img: string|HTMLImageElement) {
        if(typeof _img == "string" && ImageLoader.isSVG(_img)) {
            // 複数回ロードしたら、その都度 skinId は変わる
            const _svgText = _img;
            //console.log('costumes._setSkin _setSvgSkin ')
            this._setSvgSkin(_svgText).then(v=>{
                const _skinId = v;
                this.costumes.set( name , _skinId);
                if( this.skinId == -1) {
                    this.skinId = _skinId; // 初回のSkinId 
                }    
            });
        }else{
            //console.log('costumes._setSkin _setBitmapSkin ', _img)
            const _bitmap = _img as HTMLImageElement;
            const _skinId = await this._setBitmapSkin(_bitmap);
            this.costumes.set( name , _skinId);
            if( this.skinId == -1) {
                this.skinId = _skinId; // 初回のSkinId 
            }
        }
    }
    async _setSvgSkin(_svgText: string) {
        if(this.render && this.render.renderer){
            //console.log('before this.render.renderer.createSVGSkin');
            const skinId = this.render.renderer.createSVGSkin(_svgText);
            // [2025/2/27] 姑息な対応
            // willReadFrequently を設定するために SKINインスタンスを取り出し、
            // SVGSkinのコンストラクターで実施すみの下記【A】２行をやり直す。
            const _skin = this.render.renderer._allSkins[skinId];
            if(_skin._canvas) _skin._canvas.remove(); // <== 意味があるのか不明。
            const _svgSkin: ISvgSkin = _skin as ISvgSkin;
            /*【A】*/_svgSkin._canvas = document.createElement('canvas');
            /*【A】*/_svgSkin._context = _svgSkin._canvas.getContext("2d", { willReadFrequently: true });
            return skinId;    
        }
        throw 'unable to execute createSVGSkin';
    }
    async _setBitmapSkin( bitmap: HTMLImageElement) {
        if(this.render && this.render.renderer){
            const skinId = await this.render.renderer.createBitmapSkin(bitmap);
            return skinId;        
        }
        throw 'unable to execute createBitmapSkin';
    }
    async _updateSkin(name: string, _img: string|HTMLImageElement) {
        const skinId = this.costumes.get(name);
        if(skinId == undefined) return;
        if(typeof _img == "string" && ImageLoader.isSVG(_img)) {
            const svgText = _img as string;
            this.render.renderer.updateSVGSkin(skinId, svgText)
        }else{
            const _bitmap = _img as HTMLImageElement;
            this.render.renderer.updateBitmapSkin(skinId,_bitmap);
        }
        await Utils.wait(1000/Env.fps);
    }
    getRotationStyle (): RotationStyle {
        return this._rotationStyle;
    }
    setRotationStyle ( style: RotationStyle ) {
        if( this._rotationStylePatterns.includes( style ) ) {
            this._rotationStyle = style;
        }
    }
    setDirection( direction:number) {
        const _direction = MathUtil.wrapClamp( direction, -179, 180);
        if ( this._rotationStyle == RotationStyle.LEFT_RIGHT ) {
            if( _direction < 0 || _direction > 180) {
                // left 
                this._direction = 90;
                this._scale.x = - Math.abs(this._scale.x);
            } else {
                // right
                this._direction = 90;
                this._scale.x = Math.abs(this._scale.x);
            }
            return;
        } 
        if ( this._rotationStyle == RotationStyle.ALL_AROUND ) {
            this._direction = _direction;
            return;
        } 
        return;
    }
    setPosition(x:number, y:number) {
        this._position.x = x;
        this._position.y = y;
    }
    setScale(x:number,y:number) {
        this._scale.x = x;
        this._scale.y = y;
    }
    switchCostumeByName(name: string) {
        if( this.costumes.has(name)) {
            this.skinId = this.getSkinId(name);
        }
        // do nothing
    }
    switchCostumeByNumber(idx: number) {
        if(Utils.isInteger(idx)) {
            const _keys = this.costumes.keys;
            if( 0 > idx  || idx == _keys.length || idx > _keys.length ) {
                // do nothing
            }else{
                const _name =  _keys[idx];
                this.skinId = this.getSkinId(_name);
            }    
        }
        // do nothing
    }
    destroyAllSkin() {
        if(this.render && this.render.renderer){
            const costumesKeys = Array.from(this.costumes.keys());
            for(const name of costumesKeys) {
                const skinId = this.getSkinId(name);
                if(skinId > 0){
                    this.render.renderer.destroySkin(skinId);
                }
            }
            this.costumes.clear();    
        }
    }
    currentSkinName() {
        const costumesKeys = Array.from(this.costumes.keys());
        if(costumesKeys.length == 0) {
            return '';
        }
        if(this.skinId == -1) {
            const name = costumesKeys[0];
            return name;
        }
        for(const _name of costumesKeys) {
            const _skinId = this.getSkinId(_name);
            if(_skinId == this.skinId) {
                return _name;
            }
        }
        return '';
    }
    currentSkinNo() {
        const costumesKeys = Array.from(this.costumes.keys());
        if(costumesKeys.length == 0) {
            return -1;
        }
        if(this.skinId == -1) {
            return -1;
        }
        for(let _idx=0; _idx<costumesKeys.length; _idx++) {
            const _name = costumesKeys[_idx];
            const _skinId = this.getSkinId(_name);
            if(_skinId == this.skinId) {
                return _idx;
            }
        }
        return -1;
    }
    get skinSize() {
        const costumesKeys = Array.from(this.costumes.keys());
        return costumesKeys.length;
    }
    randomCostume() {
        const costumesKeys = Array.from(this.costumes.keys());
        if(costumesKeys.length == 0 || costumesKeys.length == 1) {
            return; // do nothing
        }
        if(this.skinId == -1) {
            const name = costumesKeys[0];
            this.skinId = this.getSkinId(name);
            return;
        }
        let idx = Utils.randomizeInRange(0, costumesKeys.length-1);
        this.skinId = idx;
    }
    prevCostume() {
        const costumesKeys = Array.from(this.costumes.keys());
        if(costumesKeys.length == 0 || costumesKeys.length == 1) {
            return; // do nothing
        }
        if(this.skinId == -1) {
            const name = costumesKeys[0];
            this.skinId = this.getSkinId(name);
            return;
        }
        // search next skinId
        let _idx = 0;
        for(const _name of costumesKeys) {
            const _skinId = this.costumes.get(_name);
            if(_skinId == this.skinId) {
                if( _idx == 0 ){
                    // 先頭のスキンのとき最後のスキンにする
                    const nextName = costumesKeys[costumesKeys.length-1];
                    this.skinId = this.getSkinId(nextName);
                }else{
                    const nextName = costumesKeys[_idx-1];
                    this.skinId = this.getSkinId(nextName);
                }
                return;
            }
            _idx += 1;
        }
    }
    nextCostume() {
        const costumesKeys = Array.from(this.costumes.keys());
        if(costumesKeys.length == 0 || costumesKeys.length == 1) {
            return; // do nothing
        }
        if(this.skinId == -1) {
            const name = costumesKeys[0];
            this.skinId = this.getSkinId(name);
            return;
        }
        // search next skinId
        let _idx = 0;
        for(const _name of costumesKeys) {
            const _skinId = this.costumes.get(_name);
            if(_skinId == this.skinId) {
                if( _idx == (costumesKeys.length - 1) ){
                    // 最後のSkinのとき先頭にする
                    const nextName = costumesKeys[0];
                    this.skinId = this.getSkinId(nextName);
                }else{
                    const nextName = costumesKeys[_idx+1];
                    this.skinId = this.getSkinId(nextName);
                }
                return;
            }
            _idx += 1;
        }
        // do nothing

    }
    getSkinId( name : string){
        const _skinId = this.costumes.get(name);
        if(_skinId != undefined){
            return _skinId;
        }else{
            return -1;
        }
    } 
    update( drawableID: number, effect = {} ) {
        if(this.render && this.render.renderer){
            const _skinId = this.skinId;
            if( _skinId > -1 && this.isSvgSkin( _skinId ) ) {
                if( !this.isSvgComplete( _skinId )) {
                    return;
                }     
            }
            const properties:ScratchRenderProperties = {skinId:-1,position:[0,0],scale:{x:-1,y:-1}};
            const skinObj = { skinId: _skinId };
            const directionObj = { direction: this._direction };
            const scaleObj = { scale: [ this._scale.x, this._scale.y ] };
            const positionObj = { position: [this._position.x, this._position.y] };
            Object.assign( properties, skinObj, directionObj, scaleObj, positionObj, effect );
            this.render.renderer.updateDrawableProperties( drawableID, properties );
        }
    }
    isSvgSkin( skinId: number ): boolean {
        if(this.render && this.render.renderer){
            const _skin = this.render.renderer._allSkins[ skinId ];
            if( _skin && _skin.constructor.name == 'SVGSkin' ) {
                return true;
            }
        }
        return false;
    }
    isSvgComplete( skinId: number): boolean {
        if(this.render && this.render.renderer){
            const _skin = this.render.renderer._allSkins[ skinId ];
            if(_skin && _skin.constructor.name == 'SVGSkin'){
                const _svgSkin: ISvgSkin = _skin as ISvgSkin;
                const _svgImage = _svgSkin._svgImage;
                if( _svgImage.complete ) {
                    return true;
                }
            }
            return true;
        }
        return false;
    }
};