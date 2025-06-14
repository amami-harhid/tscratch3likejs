/**
 * 【02】Breakout
 */
import {Pg, Lib} from '../../build/index.js';
import { Constant } from './sub/constants.js';
import { addSvg } from './sub/text.js';
import { Block } from './sub/Block.js';

Pg.title = "ブロック崩し"

let stage;
let block;
let textSprite;

Pg.preload = async function preload() {
    this.Image.load('./assets/Forest.png', Constant.Forest );
    this.Sound.load('./assets/ClassicalPiano.wav', Constant.ClassicPiano );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( Constant.Forest );
    
    block = new Lib.Sprite('block');
    await block.SvgText.add( "1", Block("#f00000") );
    await block.SvgText.add( "2", Block("#00F000") );
    await block.SvgText.add( "3", Block("#0000F0") );
    block.Looks.hide();

    textSprite = new Lib.Sprite('Introduction');
    await textSprite.Font.add(Constant.Togemaru);
    await addSvg(textSprite, "0", ["ブロック崩し"], Constant.Togemaru );
    await addSvg(textSprite, "1", ["Touch me to start."], Constant.Togemaru );
    textSprite.Looks.hide();


}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(){
        this.Looks.Backdrop.name = "Black";
    });
    block.Event.whenFlag(async function(){
        this.Looks.hide();
    });
    block.Event.whenBroadcastReceived('Start', async function*(){
        this.Looks.hide();
        this.Motion.Position.y = 150;
        const xArr = [-160,-120,-80,-40, 0, 40, 80, 120, 160];
        // eslint2-disable-next-line loopCheck/s3-loop-plugin
        for(const _ of Lib.Iterator(5)){
            // eslint2-disable-next-line loopCheck/s3-loop-plugin
            for(const x of xArr){
                this.Motion.Position.x = x;
                this.Control.clone();
                console.log('name========>', this.Looks.Costume.name);
                yield;
            }
            this.Motion.Position.y -= 25;
            this.Looks.Costume.next();
            yield;
        }
    });
    
    block.Control.whenCloned(async function(){
        console.log('whenCloned')
        console.log('name------->', this.Looks.Costume.name);
        //this.Looks.Costume.name = "1";
        console.log(this.Looks.Costume.names);
        this.Looks.show();
        console.log('x,y=',this.Motion.Position.x, this.Motion.Position.y);
    });

    textSprite.Event.whenFlag(async function*(){
        this.Looks.Costume.name = "1";
        this.Looks.show();
        this.Event.broadcast('IntroStart');
        for(;;) {
            await this.Control.wait(1);
            this.Looks.Costume.next();
            yield;
        }
    });

    textSprite.Event.whenBroadcastReceived('IntroStart', async function*(){
        for(;;){
            if(this.Sensing.isMouseTouching()){
                this.Event.broadcast('Start');
                // StopOtherScriptの後でhideをするとhideしない。
                this.Looks.hide();
                break;
            }
            yield;
        }
    });

    textSprite.Event.whenBroadcastReceived('IntroStart', async function*(){
        for(;;){
            await this.Control.wait(0.5);
            this.Looks.Effect.set(Lib.ImageEffective.GHOST, 50);
            await this.Control.wait(0.5);
            this.Looks.Effect.set(Lib.ImageEffective.GHOST, 0);
            yield;
        }
    });

}
