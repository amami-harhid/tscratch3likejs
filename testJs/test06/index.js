/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';
Pg.title = "【Test06】テキストを描画する"

const Env = Lib.Env;
Env.fps = 30;

const Jurassic = 'Jurassic';
const Chill = "Chill";
const Cat = "Cat";
const Apple = "Apple";
const RosetE = "RosetE";
const Kaisotai = 'Kaisotai';
const TogeMaruGothic = 'TogeMaruGothic';

let stage;
let cat, apple;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

import { Texts } from './sub/texts.js';

Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
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
    await stage.Image.add(Jurassic);
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite(Cat);
    apple = new Lib.Sprite(Apple);
    await apple.Image.add(Apple);
    apple.Looks.Size.scale = {w:10,h:10}
    //await cat.Image.add( Cat );
    await cat.Font.add( RosetE );
    await cat.Font.add( Kaisotai );
    await cat.Font.add( TogeMaruGothic );

    //cat.Looks.Size.scale = {w: 150, h: 150};
    const promiseArr = []
    const toSvg = cat.SvgText.toSvg.bind(cat.SvgText);
    //const toSvg = svgTextCreator;
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts.length)){
        //console.log(counter);
        const texts = Texts[counter];
        const color = 'red';
        const fontSize = 20;
        const fontStyle = 'normal';
        //console.log(texts);
        //const mesure = textMesure.mesure(texts, fontSize, 'normal', TogeMaruGothic);
        //console.log(mesure);
        const svg = toSvg(texts, fontSize, fontStyle, color, Kaisotai);
        //console.log('svg=', svg);
        const add = cat.SvgText.add(`${counter}`, svg, Kaisotai);
        promiseArr.push(add);
    }
    await Promise.all(promiseArr);

    //const main = document.getElementById('main');
    //const mainTmp = document.getElementById('mainTmp');
    //main.remove();
    //mainTmp.remove();
}
Pg.setting = async function setting() {

    cat.Event.whenFlag(async function*(){
        this.Motion.Position.xy = {x:0, y:0};
        this.Looks.Costume.name = '1';
        for(;;) {
            this.Looks.Costume.next();
            await this.Control.wait(0.5);
            yield;
        }
    });   

    cat.Event.whenFlag(async function*(){
        this.Looks.Size.scale = {w:200, h:200};
        this.Motion.Direction.degree = 90;
        this.Pen.prepare();
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.brightness = 0;
        this.Pen.HSVColor.transparency = 95;//99.5;
        this.Pen.clear();
        this.Pen.down();
        let dx = 1;
        for(;;) {
            this.Looks.Size.w += dx;
            this.Looks.Size.h += dx;
            if(this.Looks.Size.h > 800 || this.Looks.Size.h < 90) {
                dx *= -1;
            }
            // 進む。
            this.Motion.Move.steps(1);
            //console.log(this.Looks.Size.drawingSize);
            // 端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            this.Pen.stamp();
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 5);
            this.Motion.Direction.degree += 1;
            yield;
        }
    });
}