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
const Gion = 'Gion';
let stage;
let cat;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

import { Texts } from './sub/texts.js';

Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load('./assets/gionsyojya.wav', Gion);
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
    this.Image.load('/assets/Apple.svg', Apple);
    this.Font.load('/assets/fonts/ResotE-Rose-89c1.woff', RosetE);
    this.Font.load('/assets/fonts/Kaisotai-Next-UP-B.woff2', Kaisotai);
    this.Font.load('/assets/fonts/TogeMaruGothic-700-Bold.woff', TogeMaruGothic);

}
Pg.prepare = async function prepare() {

    //const renderRate = Lib.renderRate;
    //console.log(renderRate);
    stage = new Lib.Stage();
    //await stage.Image.add(Jurassic);
    await stage.SvgText.add('BackDrop', backdrop);
    await stage.Sound.add( Gion );
    cat = new Lib.Sprite(Cat);
    //await cat.Image.add( Cat );
    await cat.Font.add( RosetE );
    await cat.Font.add( Kaisotai );
    await cat.Font.add( TogeMaruGothic );
    cat.Looks.hide();

    const promiseArr = []
    const toSvg = cat.SvgText.toSvg.bind(cat.SvgText);
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts.length)){
        const texts = Texts[counter];
        const color = 'red';
        const fontSize = 15;
        const fontStyle = 'normal';
        const svg = toSvg(texts, fontSize, fontStyle, color, Kaisotai);
        const add = cat.SvgText.add(`${counter}`, svg, Kaisotai);
        promiseArr.push(add);
    }
    await Promise.all(promiseArr);

}
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function*(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 95);
        for(;;){
            await this.Sound.playUntilDone(Gion);
            yield;
        }
    })
    cat.Event.whenFlag(async function*(){
        this.Looks.Size.scale = {w:200, h:200};
        this.Looks.show();
        this.Motion.Position.xy = {x:0, y:0};
        this.Looks.Costume.name = '1';
        for(;;) {
            this.Looks.Costume.next();
            if(this.Looks.Costume.name == '1') {
                break;
            }
            await this.Control.wait(1);
            yield;
        }
        for(;;) {
            await this.Control.wait(2);
            this.Looks.Costume.next();
            await this.Control.wait(2);
            yield;
        }
    });   

    cat.Event.whenFlag(async function*(){
        this.Motion.Direction.degree = 90;
        this.Pen.prepare();
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.brightness = 0;
        this.Pen.HSVColor.transparency = 100;//99.5;
        this.Pen.clear();
        this.Pen.down();
        let dx = 2;
        await this.Control.wait(4);
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
}