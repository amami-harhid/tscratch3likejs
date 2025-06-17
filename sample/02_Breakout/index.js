/**
 * 【02】Breakout
 */
import {Pg, Lib} from '../../build/index.js';
import { Constant } from './sub/constants.js';
import { addSvg } from './sub/text.js';
import { Block } from './sub/Block.js';
import { Ball } from './sub/Ball.js';
import { Bar } from './sub/Bar.js'
import { Bottom } from './sub/Bottom.js';
import { PositionRegist } from './sub/PositionRegist.js';

Pg.title = "ブロック崩し"

let stage;
let block;
let textSprite;
let ball;
let bar;
let bottom;
const positionRegist = PositionRegist.getInstance();

Pg.preload = async function preload() {
    this.Image.load('./assets/Forest.png', Constant.Forest );
    this.Sound.load('./assets/ClassicalPiano.wav', Constant.ClassicPiano );
    this.Sound.load('./assets/Pew.wav', Constant.Pew );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
    this.Font.load('./assets/HarryPotter-ov4z.woff', Constant.HarryPotter);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add( Constant.Forest );
    stage.Sound.add(Constant.ClassicPiano);
    stage.Sound.setOption(Lib.SoundOption.VOLUME, 10);
    

    block = new Lib.Sprite('block');
    block.SvgText.add( "B1", Block("#f00000") );
    block.SvgText.add( "B2", Block("#00F000") );
    block.SvgText.add( "B3", Block("#0000F0") );
    block.Sound.add(Constant.Pew);
    block.Looks.hide();

    textSprite = new Lib.Sprite('Introduction');
    textSprite.Font.add(Constant.Togemaru);
    addSvg(textSprite, "T0", ["ブロック崩し"], Constant.Togemaru );
    addSvg(textSprite, "T1", ["Touch me to start."], Constant.Togemaru );
    textSprite.Looks.hide();

    ball = new Lib.Sprite('ball');
    ball.SvgText.add("Ball", Ball("#ff0000") );
    ball.Font.add(Constant.HarryPotter);
    const X = ball.SvgText.toSvg(['X'], 20, "normal", "red", Constant.HarryPotter);
    ball.SvgText.add("X", X, Constant.HarryPotter);
    ball.Motion.Position.xy = [0, -100];//{x:0,y:-100};
    ball.Looks.hide();

    bar = new Lib.Sprite('bar');
    bar.SvgText.add("Bar", Bar("blue"));
    bar.Motion.Position.xy = [0, -160];//{x:0,y:-160};
    bar.Looks.hide();

    bottom = new Lib.Sprite('Bottom');
    bottom.SvgText.add('Bottom', Bottom('#ff0000'));
    bottom.Motion.Position.xy = [0, -183]; //{x:0,y:-183};


}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(){
        this.Looks.Backdrop.name = "Black";
        let volume = 5;
        for(;;){
            stage.Sound.setOption(Lib.SoundOption.VOLUME, volume);
            await stage.Sound.playUntilDone(Constant.ClassicPiano);
            if(volume < 100)
                volume += 10;
            yield;
        }
    });
    block.Event.whenFlag(async function(){
        this.Looks.hide();
    });
    block.Event.whenBroadcastReceived('Start', async function*(){
        this.Looks.hide();
        this.Motion.Position.y = 150;
        const xArr = [-160,-120,-80,-40, 0, 40, 80, 120, 160];
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for(const _ of Lib.Iterator(5)){
            //const promise = [];
            // eslint-disable-next-line loopCheck/s3-loop-plugin
            for(const x of xArr){
                this.Motion.Position.x = x;
                this.Control.clone();
                this.Looks.Costume.next();
                // const clone = this.Control.clone();
                // promise.push(clone);
            }
            // await Promise.all(promise);
            this.Motion.Position.y -= 25;
        }
    });
    
    block.Control.whenCloned(async function(){
        this.Looks.show();
    });
    block.Control.whenCloned(async function*(){
        for(;;){
            if(this.Sensing.isTouchingToSprites([ball])){
                this.Sound.play(Constant.Pew);
                this.Event.broadcast('ballTouch');
                this.Looks.hide();
                break;
            }
            yield;
        }
        await this.Control.wait(0.5);
        this.Control.remove();
    });

    textSprite.Event.whenFlag(async function*(){
        this.Looks.Costume.name = "T1";
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
                this.Event.broadcast('Question');
                this.Looks.hide();
                break;
            }
            yield;
        }
    });
    let barSize = 0;
    stage.Event.whenBroadcastReceived('Question', async function*(){
        for(;;) {
            const level = await this.Sensing.askAndWait('PLAY MODE( 1:EASY, 2:NORMAL, 3:HARD )');
            if(level == '1' || level == '2' || level == '3'){
                const _level = parseInt(level);
                if(_level == 1) barSize = 3;
                if(_level == 2) barSize = 2;
                if(_level == 3) barSize = 1;
                break;
            }
            yield;
        }
        this.Event.broadcast('Start');
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
    ball.Event.whenFlag(async function(){
        this.Looks.hide();
    });

    ball.Event.whenBroadcastReceived('Start', async function(){
        this.Motion.Position.xy = [0,0];//{x:0,y:0};
        this.Looks.show();
        const key = Lib.Keyboard.SPACE
        const isKeyDown = ()=>{
            return this.Sensing.isKeyDown(key)
        }
        await this.Control.waitUntil(isKeyDown);
        this.Event.broadcast('GAME_START');
    });

    ball.Event.whenBroadcastReceived('ballTouch', async function(){
        this.Motion.Direction.degree += (Lib.getRandomValueInRange(-5, 5)+180);
    });
    ball.Event.whenBroadcastReceived('GAME_START', async function*(){
        this.Motion.Direction.degree = 180;
        const barDimension = bar.Looks.Size.drawingSize;
        for(;;){
            this.Motion.Move.steps(10);
            if(this.Sensing.isTouchingToSprites([bar])){
                this.Motion.Position.y += barDimension.h*3;
                const speed = positionRegist.get(3) - bar.Motion.Position.x;
                const degree = this.Motion.Direction.degree;
                this.Motion.Direction.degree += (Lib.getRandomValueInRange(-5, -5)*speed -degree);
            }else if(this.Sensing.isTouchingToSprites([bottom])) {
                break;
            }
            this.Motion.Move.ifOnEdgeBounds();
            yield;
        }
        this.Control.stopAll();
        console.log('GameOver');

    });
    bar.Event.whenFlag(async function(){
        this.Looks.hide();
    });
    bar.Event.whenBroadcastReceived('Start', async function(){
        this.Motion.Position.xy = [0, -160];//{x:0,y:-160};
        this.Looks.Size.scale = [barSize*100, 150];//{w:barSize*100, h:150};
        positionRegist.clear(this.Motion.Position.x);
        this.Looks.show();
    });
    bar.Event.whenBroadcastReceived('Start', async function*(){
        for(;;){
            const mousePos = Lib.mousePosition;
            const selfPosition = this.Motion.Position.xy;
            this.Motion.Move.toXY(mousePos.x, selfPosition.y);
            positionRegist.set(this.Motion.Position.x);
            yield;
        }
    });
}
