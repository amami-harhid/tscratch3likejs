/**
 * Libs
 */
import { Backdrops } from '../entity/backdrops';
import { Cast } from '../util/cast';
import { Controls, Loop } from './controls';
import { Costumes } from '../entity/costumes';
import { Env } from '../env';
import { EventEmitter } from "events";
import { FunctionChecker } from '../util/functionChecker';
import { Keyboard } from '../io/keyboard';
import { MathUtil } from '../util/math-util';
import { Monitors } from '../monitor/monitors';
import { PlayGround } from '../playGround';
import { Render } from '../render/render';
import { Sounds } from '../sounds/sounds';
import { Sprite } from '../entity/sprite';
import { Stage } from '../entity/stage';
import { StageLayering } from '../entity/stageLayering';
import { SVGParser } from '../svgParser/parser';
import { Utils } from '../util/utils';
import { IRotationStyle, RotationStyle } from '../../Type/entity/RotationStyle';
import { IImageEffective, ImageEffective } from '../../Type/entity/ImageEffective';
import { ISoundOption, SoundOption } from '../../Type/entity/SoundOption';
import { I_KEYBOARD_KEYS, KEYBOARD_KEYS } from '../../Type/io/IKeyboard';
import { Point } from '@Type/common/point';
import { IMonitors, SMonitors } from '@Type/monitors';
import { ISprite } from '@Type/sprite';
import { IEntitySound } from '@Type/entity/IEntitySound';
//import { ImageEffective, SoundOption } from '../_type/entity/CEntityConstant';
export class Libs {

    /** @internal */
    get Backdrops () {
        return Backdrops;
    }
    /** @internal */
    get Cast () {
        return Cast;
    }
    /** @internal */
    get Costumes () {
        return Costumes;
    }
    /** @internal */
    get Controls () {
        return Controls;
    }
    /** @internal */
    get Env () {
        return Env;
    }
    /** @internal */
    get EventEmitter () {
        return EventEmitter;
    }
    /** @internal */
    get FunctionChecker () {
        return FunctionChecker;
    }
    /** @internal */
    get Keyboard (): I_KEYBOARD_KEYS {
        return KEYBOARD_KEYS;
    }
    get ImageEffective (): IImageEffective {
        return ImageEffective;
    }
    get SoundOption () : ISoundOption{
        return SoundOption;
    }
    get RotationStyle () : IRotationStyle{
        return RotationStyle;
    }
    get Monitors () : SMonitors {
        return Monitors;
    }
    get MathUtil () : MathUtil{
        return MathUtil;
    }
    /** @internal */
    get svgParser () {
        return SVGParser.getInstance();
    }
    /**
     * 指定したkeyが押されているとき TRUE
     * key 省略時は 何かのキーが押されているとき TRUE
     * @param {*} key 
     * @returns {boolean} TRUE/FALSE
     * @internal
     */
    keyIsDown(key?: string): boolean {
        const _r = this.p.runtime;
        if(_r){
            return _r.keyIsDown(key);
        }
        return false;
    }
    /**
     * 指定したkeyが押されていないとき TRUE
     * key 省略時は 何かのキーが押されていないとき TRUE
     * 
     * @param {*} key 
     * @returns TRUE/FALSE
     */
    keyIsNotDown(key:string): boolean {
        return !(this.keyIsDown(key));        
    }

    /**
     * 何かのキーが押されているとき TRUE
     * @returns TRUE/FALSE
     */
    anyKeyIsDown() {
        return this.keyIsDown();
    }
    /**
     * マウスが押されているとき TRUE
     * @returns 
     */
    mouseIsPressed() {
        const mouse = this.p.stage.mouse;       
        return mouse.down;
    }
    /**
     * ステージ幅
     */
    get stageWidth (): number {
        return  this.p.$stageWidth;
    }
    /**
     * ステージ高さ
     */
    get stageHeight (): number {
        return this.p.$stageHeight;
    }
    /**
     * get rendering rate object
     * @internal
     */
    get renderRate() {
        if(this.p.render != null && this.p.canvas){
            const _rateX = this.p.render.stageWidth / this.p.canvas.width;
            const _rateY = this.p.render.stageHeight / this.p.canvas.height;
            return {x: _rateX, y:_rateY};    
        }
        throw `unable calculate renderRate`;
    }
    /**
     * mousePosition ( on canvas )
     */
    get mousePosition () : Point {
        const rate = this.renderRate;
        if(this.p.canvas){
            const _mouseX = (this.p.stage.mouse.x - this.p.canvas.width/2 ) * rate.x;
            const _mouseY = (this.p.canvas.height/2 - this.p.stage.mouse.y) * rate.y;
            return {x: _mouseX, y: _mouseY};    
        }
        throw `unable calculate mouse position`;
    }
    get randomPoint () {
        const randomPointX = (Math.random()-0.5)*this.p.$stageWidth;
        const randomPointY = (Math.random()-0.5)*this.p.$stageHeight;
        return { x: randomPointX, y: randomPointY };
    }
    get randomDirection ()  {
        const direction = (Math.random()-0.5)* 2 * 360;
        if( direction > 180 ){
            return direction - 180;
        }
        return direction;
    }
    /**
     * 
     * @param from {number} ランダム範囲の最小値
     * @param to {number} ランダム範囲の最大値
     * @param forceAsDecimal {boolean} False/省略時は整数、True時は10進数
     * @returns 
     */
    getRandomValueInRange( from:number , to:number, forceAsDecimal=false ){
        return Utils.randomizeInRange( from , to, forceAsDecimal);
    }
    /** @internal */
    get Render () {
        return Render;
    }
    /** @internal */
    get Sounds () {
        return Sounds;
    }
    get Stage () {
        return Stage;
    }
    /** @internal */
    get StageLayering () {
        return StageLayering;
    }
    get Sprite () {
        return Sprite;
    }
    // get TextDraw () {
    //     return TextDraw;
    // }
    // get TextOption () {
    //     return TextOption;
    // }
    get Utils () {
        return Utils;
    }

    async wait ( t ) {
        await Utils.wait( t );
    }
    /**
     * 条件成立する間、待つ
     * @param condition {CallableFunction} 条件式を返す関数
     * @param entity {object} condition内のthisを指すオブジェクト
     */
    async waitWhile( condition: CallableFunction, entity: object):Promise<void> {
        const _condition = (entity)?condition.bind(entity):condition;
        while(_condition()){
            await Utils.wait(Env.pace);
        }
    }
    /**
     * 条件成立するまで待つ
     * @param condition {CallableFunction} 条件式を返す関数
     * @param entity {object} condition内のthisを指すオブジェクト
     */
    async waitUntil( condition: CallableFunction , entity: object): Promise<void> {
        const _condition = (entity)?condition.bind(entity):condition;
        for(;;) {
            if( _condition() ) {
                break;
            }
            await Utils.wait(Env.pace);
        }
    }
    /**
     * @internal
     * ブラウザ座標をScratch3の座標に変換する
     * @param x {number} - Canvas上の実座標(X)
     * @param y {number} - Canvas上の実座標(Y)
     * @returns {{x:number,y:number}} - Canvas上の実座標
     */
    toScratchPosition(x:number, y:number): {x:number,y:number} {
        // Base position -> canvas 
        const rate = this.renderRate;
        const _x = x * rate.x;
        const _y = y * rate.y;
        return {x: _x, y: _y};
    }
    /**
     * @internal
     * Canvasの実座標へ変換する
     * @param x {number} - Scratch3の座標(X)
     * @param y {number} - Scratch3の座標(Y)
     * @returns {{x:number,y:number}} - Canvas上の実座標
     */
    toActualPosition( x:number, y:number ): {x:number, y:number} {

        const rate = this.renderRate;
        const _x = x / rate.x;
        const _y = y / rate.y;
        return {x: _x, y: _y};

    }
    /**
     * @internal
     * change scratch position to local position
     * @param {number} x  scratch x position
     * @param {number} y  scratch y position
     * @returns local position
     */
    scratchToLocalPos( x:number, y:number ): {x:number, y:number} {
        if(this.p.render){
            const w = this.p.render.stageWidth;
            const h = this.p.render.stageHeight;
    
            let localPosX = x + w / 2;
            let localPosY = h / 2 - y;
            return {x: localPosX, y: localPosY};    
        }
        throw `unable calculate scratchToLocalPos`;
    }

    /**
     * @internal
     * change local position to scratch position
     * @param {number} x  local x position
     * @param {number} y  local y position
     * @returns {x:number, y:number} scratch position
     */
    localToScratchPos( x:number, y:number ): {x:number,y:number} {
        if(this.p.render){
            const w = this.p.render.stageWidth;
            const h = this.p.render.stageHeight;
            let scratchPosX = x - w / 2;
            let scratchPosY = h / 2 - y;    
            return {x: scratchPosX, y: scratchPosY};
        }
        throw 'unable calculate localToScratchPos';
    }
    /**
     * 繰り返し回数のイテレーター(Generator)
     * @param n {number} - 繰り返し回数
     */
    *Iterator(n:number): Generator<number> {
        for(let i=0; i<n; i++){
            yield(i);
        }
    }
    /** @internal */
    static _instance: Libs;
    /** @internal */
    static getInstance() {
        if( Libs._instance == undefined ) {
            Libs._instance = new Libs();
        }
        return Libs._instance;
    }
    /** @internal */
    get p ( ) {
        if(this._p == undefined) throw 'playGround is undefined';
        return this._p;
    }
    /** @internal */
    set p ( playGround: PlayGround) {
        this._p = playGround;
    }
    /** @internal */
    public _p : PlayGround | undefined;
    constructor () {
        this._p = undefined;
    }
}
