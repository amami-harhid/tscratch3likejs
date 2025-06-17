/**
 * 【01】桜の花びらが舞う
 */
import {Pg, Lib} from '../../build/index.js';
import { Constant } from './sub/constants.js';
import { addSvg } from './sub/text.js';
import { BlackBackdrop } from './sub/blackBacdrop.js';

Pg.title = "【01】桜の花びらが舞う"

let stage;
let textSprite;
let cherry;

Pg.preload = async function preload() {
    this.Image.load('./assets/Forest.png', Constant.Forest );
    this.Image.load('./assets/Cherry.svg', Constant.Cherry);
    this.Sound.load('./assets/ClassicalPiano.wav', Constant.ClassicPiano );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add( Constant.Forest );
    stage.SvgText.add( "Black", BlackBackdrop );
    textSprite = new Lib.Sprite('Introduction');
    textSprite.Font.add(Constant.Togemaru);
    addSvg(textSprite, "0", ["Gathering cherry blossom petals"], Constant.Togemaru );
    addSvg(textSprite, "1", ["Touch me to start."], Constant.Togemaru );
    textSprite.Looks.hide();

    cherry = new Lib.Sprite('Cherry');
    cherry.Image.add( Constant.Cherry );
    cherry.Looks.Size.scale = {w: 20, h: 20};
    cherry.Looks.hide();

}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(){
        this.Looks.Backdrop.name = "Black";
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 95);
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
                this.Event.broadcast('CherryStart');
                this.Control.stopOtherScripts(this);
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
    cherry.Event.whenFlag(async function(){
        this.Pen.prepare();
        this.Looks.hide();
        this.Looks.Size.scale = {w:200, h:200};
        this.Looks.Effect.clear();
        this.Motion.Rotation.style = Lib.RotationStyle.ALL_AROUND;
    });
    cherry.Event.whenBroadcastReceived('CherryStart', async function*(){
        // どこかの場所に移動してクローンを作りつづける。
        for(;;){
            this.Motion.Move.randomPosition();
            this.Motion.Position.y = Lib.getRandomValueInRange(100,180);
            const size = Lib.getRandomValueInRange(10,50);
            this.Looks.Size.scale = {w:size,h:size};
            this.Control.clone();
            await this.Control.wait(0.05);
            yield;
        }
    });

    cherry.Control.whenCloned(async function*(){
        this.Looks.show();
        // BUG: CloneがEffectを継承しない
        this.Looks.Effect.set(Lib.ImageEffective.COLOR,Lib.getRandomValueInRange(0,240))
        const size = this.Looks.Size.w;
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 100 - size/50*100);
        let degree = Lib.getRandomValueInRange(-15,15);
        for(;;) {
            let ySpeed = (180 - this.Motion.Position.y + 20)/360;
            this.Motion.Position.y -= Lib.getRandomValueInRange(5,10) * ySpeed;
            this.Motion.Position.x += Lib.getRandomValueInRange(-2,2);
            this.Motion.Direction.degree += degree;
            this.Pen.stampStage();
            this.Pen.stamp();

            if(this.Motion.Position.y < -170){
                break;
            }
            yield;
        }
        this.Control.remove();
    });
}
