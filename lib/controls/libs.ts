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
import { ImageEffective, SoundOption, RotationStyle } from '../entity/entityConstant';
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
export class Libs {

    get Backdrops () {
        return Backdrops;
    }
    get Cast () {
        return Cast;
    }
    get Costumes () {
        return Costumes;
    }
    get Controls () {
        return Controls;
    }
    get Env () {
        return Env;
    }
    get EventEmitter () {
        return EventEmitter;
    }
    get FunctionChecker () {
        return FunctionChecker;
    }
    get Keyboard () {
        return Keyboard;
    }
    get ImageEffective () {
        return ImageEffective;
    }
    get SoundOption () {
        return SoundOption;
    }
    get RotationStyle () {
        return RotationStyle;
    }
    get Loop () {
        return Loop;
    }
    get Monitors () {
        return Monitors;
    }
    get MathUtil () {
        return MathUtil;
    }
    get svgParser () {
        return SVGParser.getInstance();
    }
    /**
     * 指定したkeyが押されているとき TRUE
     * key 省略時は 何かのキーが押されているとき TRUE
     * @param {*} key 
     * @returns {boolean} TRUE/FALSE
     */
    keyIsDown(key?) {
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
    keyIsNotDown(key) {
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

    get stageWidth () {
        return  this.p.$stageWidth;
    }

    get stageHeight () {
        return this.p.$stageHeight;
    }
    /**
     * get rendering rate object
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
    get mousePosition () {
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

    getRandomValueInRange( from , to, forceAsDecimal=false ){
        return Utils.randomizeInRange( from , to, forceAsDecimal);
    }

    get Render () {
        return Render;
    }
    get Sounds () {
        return Sounds;
    }
    get Stage () {
        return Stage;
    }
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
    async waitWhile( condition, entity) {
        const _condition = (entity)?condition.bind(entity):condition;
        while(_condition()){
            await Utils.wait(Env.pace);
        }
    }
    async waitUntil( condition , entity) {
        const _condition = (entity)?condition.bind(entity):condition;
        for(;;) {
            if( _condition() ) {
                break;
            }
            await Utils.wait(Env.pace);
        }
    }

    toScratchPosition(x, y) {
        // Base position -> canvas 
        const rate = this.renderRate;
        const _x = x * rate.x;
        const _y = y * rate.y;
        return {x: _x, y: _y};
    }

    toActualPosition( x, y ) {

        const rate = this.renderRate;
        const _x = x / rate.x;
        const _y = y / rate.y;
        return {x: _x, y: _y};

    }
    /**
     * change scratch position to local position
     * @param {number} x  scratch x position
     * @param {number} y  scratch y position
     * @returns local position
     */
    scratchToLocalPos( x, y ) {
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
     * change local position to scratch position
     * @param {number} x  local x position
     * @param {number} y  local y position
     * @returns {x:number, y:number} scratch position
     */
    localToScratchPos( x, y ) {
        if(this.p.render){
            const w = this.p.render.stageWidth;
            const h = this.p.render.stageHeight;
            let scratchPosX = x - w / 2;
            let scratchPosY = h / 2 - y;    
            return {x: scratchPosX, y: scratchPosY};
        }
        throw 'unable calculate localToScratchPos';
    }

    *Iterator(n) {
        for(let i=0; i<n; i++){
            yield(i);
        }
    }
    static _instance;
    static getInstance() {
        if( Libs._instance == undefined ) {
            Libs._instance = new Libs();
        }
        return Libs._instance;
    }
    get p ( ) {
        if(this._p == undefined) throw 'playGround is undefined';
        return this._p;
    }
    set p ( playGround: PlayGround) {
        this._p = playGround;
    }
    public _p : PlayGround | undefined;
    constructor () {
        this._p = undefined;
    }
}
