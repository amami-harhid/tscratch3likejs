/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';
Pg.title = "【Test06】テキストを描画する"

import { backdrop } from './sub/bacdrop.js';

const Env = Lib.Env;
Env.fps = 30;

const Jurassic = 'Jurassic';
const Cat = "Cat";
const Apple = "Apple";
const RosetE = "RosetE";
const Kaisotai = 'Kaisotai';
const TogeMaruGothic = 'TogeMaruGothic';
const HarryPotter = 'HarryPotter';
const Gion = 'Gion';
let stage;
let cat, cat2, cat3;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

import { Texts } from './sub/texts.js';
import { Texts2 } from './sub/texts2.js';
import { Texts3 } from './sub/texts3.js';

Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load('./assets/gionsyojya.wav', Gion);
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
    this.Image.load('/assets/Apple.svg', Apple);
    this.Font.load('/assets/fonts/ResotE-Rose-89c1.woff', RosetE);
    this.Font.load('/assets/fonts/Kaisotai-Next-UP-B.woff2', Kaisotai);
    this.Font.load('/assets/fonts/TogeMaruGothic-700-Bold.woff', TogeMaruGothic);
    this.Font.load('/assets/fonts/HarryPotter-ov4z.woff', HarryPotter);
}
Pg.prepare = async function prepare() {

    stage = new Lib.Stage();
    await stage.Sound.add( Gion );
    await stage.SvgText.add('BackDrop', backdrop);    
    cat = new Lib.Sprite(Cat);
    cat.Font.add(HarryPotter);
    cat.Looks.hide();
    const promiseArr = []
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts.length)){
        const texts = Texts[counter];
        const color = 'white';
        const fontSize = 25;
        const fontStyle = 'normal';
        const svg = cat.SvgText.toSvg(texts, fontSize, fontStyle, color, TogeMaruGothic);
        const add = cat.SvgText.add(`${counter}`, svg, TogeMaruGothic);
        promiseArr.push(add);
    }
    await Promise.all(promiseArr);

    cat2 = new Lib.Sprite(Cat);
    await cat2.Font.add( RosetE );
    await cat2.Font.add( Kaisotai );
    await cat2.Font.add( TogeMaruGothic );
    cat2.Looks.hide();

    const promiseArr2 = []
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts2.length)){
        const texts = Texts2[counter];
        const color = 'red';
        const fontSize = 15;
        const fontStyle = 'normal';
        const svg = cat2.SvgText.toSvg(texts, fontSize, fontStyle, color, Kaisotai);
        const add = cat2.SvgText.add(`${counter}`, svg, Kaisotai);
        promiseArr2.push(add);
    }
    await Promise.all(promiseArr2);

    cat3 = new Lib.Sprite(Cat);
    await cat3.Font.add( HarryPotter );    
    cat3.Looks.hide();
    const promiseArr3 = []
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts3.length)){
        const texts = Texts3[counter];
        const color = 'red';
        const fontSize = 12;
        const fontStyle = 'normal';
        const svg = cat3.SvgText.toSvg(texts, fontSize, fontStyle, color, HarryPotter);
        const add = cat3.SvgText.add(`${counter}`, svg, HarryPotter);
        promiseArr3.push(add);
    }
    await Promise.all(promiseArr3);


}
Pg.setting = async function setting() {
    cat.Event.whenFlag(async function*(){
        this.Looks.show();
        const names = this.Looks.Costume.names;
        for(const name of names){
            this.Looks.Costume.name = name;
            await this.Control.wait(2);
            yield;
        }
        this.Looks.hide();
        await this.Control.wait(1);
        this.Event.broadcast('Start');
    });
    stage.Event.whenBroadcastReceived('Start', async function*(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 95);
        this.Pen.clear();
        for(;;){
            await this.Sound.playUntilDone(Gion);
            yield;
        }
    })
    stage.Event.whenBroadcastReceived('Clear', async function*(){
        this.Pen.clear();
    })
    cat2.Event.whenBroadcastReceived('Start', async function*(){
        this.Looks.Size.scale = {w:200, h:200};
        this.Looks.show();
        this.Motion.Position.xy = {x:0, y:0};
        this.Looks.Costume.name = '1';
        for(;;) {
            this.Looks.Costume.next();
            if(this.Looks.Costume.name == '1') {
                break;
            }
            await this.Control.wait(2);
            yield;
        }
        this.Event.broadcast('Start2');
    });   
    cat2.Event.whenBroadcastReceived('Start2', async function*(){
    
        const names = this.Looks.Costume.names;
        for(const _ of Lib.Iterator(names.length*5)) {
            await this.Control.wait(3);
            this.Looks.Costume.next();
            yield;
        }
        for(const _ of Lib.Iterator(10)){
            this.Looks.Effect.change(Lib.ImageEffective.GHOST, 10);
            await this.Control.wait(0.1);
            yield;
        }
        await this.Control.wait(1);
        this.Looks.hide();
        this.Event.broadcast('Clear');
        await this.Control.wait(3);
        this.Control.stopAll();
    
    });

    cat2.Event.whenBroadcastReceived('Start2', async function*(){
        this.Motion.Direction.degree = 90;
        this.Pen.prepare();
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.brightness = 0;
        this.Pen.HSVColor.transparency = 100;//99.5;
        //this.Pen.clear();
        this.Pen.down();
        let dx = 2;
        for(;;) {
            this.Looks.Size.w += dx;
            this.Looks.Size.h += dx;
            if(this.Looks.Size.h > 900 || this.Looks.Size.h < 50) {
                dx *= -1;
            }
            // 進む。
            this.Motion.Move.steps(1);
            //console.log(this.Looks.Size.drawingSize);
            // 端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            this.Pen.stampStage();
            this.Pen.stamp();
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 1);
            this.Motion.Direction.degree += 1;
            yield;
        }
    });

    cat3.Event.whenBroadcastReceived('Start2', async function*(){
        this.Looks.Size.scale = {w:200, h:250};
        this.Motion.Position.xy = {x:0, y:180};
        this.Looks.Costume.name = '1';
        this.Motion.Direction.degree = 90;
        this.Looks.Layer.gotoBack();
        this.Looks.show();
        for(;;) {
            this.Motion.Position.y += -2;
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 2);
            if(this.Motion.Position.y < -180){
                this.Looks.Costume.next();
                this.Motion.Position.y = 180;
            }
            yield;
        }
    });   

}