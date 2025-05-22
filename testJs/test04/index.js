/**
 * sample24
 * ステージ背景がないとき
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Sample24】ステージ背景がないとき"

//dconst NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";

let stage;
let ball;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload() {
    //dthis.Image.load('../../assets/white_backdrop.svg', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', BallA );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    //await stage.Image.add( NeonTunnel );
    await stage.Sound.add( Chill );

    ball = new Lib.Sprite('ball');
    await ball.Image.add( BallA );
    ball.Looks.setSize(150, 150);
    ball.Sensing.DragMode.draggable = true;
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    stage.Event.whenFlag(async function*(){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function*(){
        //this.Motion.gotoXY(0,0);
        this.Motion.Direction.degree = 45;
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        this.Pen.setPenSize(1500);
        this.Pen.penClear();
        this.Pen.setPenTransparency(99.9);
        this.Pen.penDown();
        const drawableId = this.drawableID;
        this.Looks.setEffect(Lib.ImageEffective.GHOST, 0);
        for(const _ of Lib.Iterator(5000)){
            //this.Motion.Direction.degree += 5;
            this.Motion.moveSteps(2);
            this.Motion.ifOnEdgeBounds();
            this.Pen.drawLine();
            this.Looks.changeEffectBy(Lib.ImageEffective.COLOR, 25);
            this.Pen.stamp(drawableId);

            yield;
        }
    });
    

}