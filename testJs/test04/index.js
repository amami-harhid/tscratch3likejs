/**
 * test04
 * DragとPenのテスト
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test05】DragとPenのテスト"

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
    ball.Looks.Size.scale = {w: 150, h: 150};
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
        this.Pen.Size.thickness = 1500;
        this.Pen.clear();
        this.Pen.HSVColor.hue = 240;
        this.Pen.HSVColor.saturation = 100;
        this.Pen.HSVColor.brightness = 100;
        this.Pen.HSVColor.transparency = 95;
        this.Pen.down();
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 50);
        for(const _ of Lib.Iterator(5000)){
            this.Motion.Direction.degree += 5;
            this.Motion.Move.steps(10);
            this.Motion.Move.ifOnEdgeBounds();
            this.Pen.HSVColor.hue += 5;
            //this.Pen.setPenHue(hue);
            //this.Pen.drawLine();
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 5);
            //this.Looks.changeEffectBy(Lib.ImageEffective.COLOR, 5);
            this.Pen.stamp();
            yield;
        }
    });
    

}