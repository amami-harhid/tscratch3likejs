/**
 * sample32 
 * テキスト描画 
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample32】テキスト描画"


/**
 * Stage Extra class
 */
let stage: Stage;
/**
 * Cat Sprite Class
 */
let cat: Sprite, cat2:Sprite;

const Cat = 'cat';
const Cat2 = 'cat2';
const Gion = 'Gion';
const RosetE = "RosetE";
const Kaisotai = 'Kaisotai';
const TogeMaruGothic = 'TogeMaruGothic';
import { backdrop } from './sub/bacdrop.js';
import { Texts } from './sub/texts.js';
import { Texts2 } from './sub/texts2.js';

Pg.preload = async function (this: PgMain) {
    this.Sound.load('./assets/gionsyojya.wav', Gion);
    this.Font.load('/assets/fonts/ResotE-Rose-89c1.woff', RosetE);
    this.Font.load('/assets/fonts/Kaisotai-Next-UP-B.woff2', Kaisotai);
    this.Font.load('/assets/fonts/TogeMaruGothic-700-Bold.woff', TogeMaruGothic);

}
Pg.prepare = async function () {
    // create instance
    stage = new Lib.Stage();
    stage.Sound.add( Gion );
    stage.SvgText.add('BackDrop', backdrop);   

    // create instance
    cat = new Lib.Sprite(Cat);
    cat.Looks.hide();
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts.length)){
        const texts = Texts[counter];
        const color = 'white';
        const fontSize = 25;
        const fontStyle = 'normal';
        const svg = cat.SvgText.toSvg(texts, fontSize, fontStyle, color, RosetE);
        cat.SvgText.add(`${counter}`, svg);
    }

    cat2 = new Lib.Sprite(Cat2);
    cat2.Font.add( RosetE );
    cat2.Font.add( Kaisotai );
    cat2.Font.add( TogeMaruGothic );
    cat2.Looks.hide();

    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(Texts2.length)){
        const texts = Texts2[counter];
        const color = 'red';
        const fontSize = 15;
        const fontStyle = 'normal';
        const svg = cat2.SvgText.toSvg(texts, fontSize, fontStyle, color, Kaisotai);
        cat2.SvgText.add(`${counter}`, svg);
    }

}

Pg.setting = async function () {

    cat.Event.whenFlag(async function*(this:Sprite){
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
    stage.Event.whenBroadcastReceived('Start', async function*(this:Stage){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 95);
        for(;;){
            await this.Sound.playUntilDone(Gion);
            yield;
        }
    })
    cat2.Event.whenBroadcastReceived('Start', async function*(this:Sprite){
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
    cat2.Event.whenBroadcastReceived('Start2', async function*(this:Sprite){
        
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
        await this.Control.wait(1);
        this.Control.stopAll();
        
    });
    
    cat2.Event.whenBroadcastReceived('Start2', async function*(this:Sprite){
        this.Motion.Direction.degree = 90;
        this.Pen.prepare();
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.brightness = 0;
        this.Pen.HSVColor.transparency = 100;//99.5;
        this.Pen.clear();
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
            this.Motion.Move.ifOnEdgeBounce();
            this.Pen.stampStage();
            this.Pen.stamp();
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 1);
            this.Motion.Direction.degree += 1;
            yield;
        }
    });
}
