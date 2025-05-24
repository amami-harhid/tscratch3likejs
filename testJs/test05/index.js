/**
 * test05
 * 端に触れたら跳ね返るの動作を本家に近づける
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test05】端に触れたら跳ね返るの動作を本家に近づける"

//dconst NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const Cat = "Cat";

let stage;
let cat;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload() {
    //dthis.Image.load('../../assets/white_backdrop.svg', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite(Cat);
    await cat.Image.add( Cat );
    cat.Looks.setSize(150, 150);
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    cat.Event.whenFlag(async function*(){
        this.Motion.Direction.degree = 60;
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        this.Pen.setPenSize(1000);
        this.Pen.penClear();
        this.Pen.penDown();
        for(const _ of Lib.Iterator(5000)){
            this.Motion.moveSteps(10);
            //this.Pen.drawLine();
            this.Motion.ifOnEdgeBounds();
            //this.Pen.drawLine();
            this.Looks.changeEffectBy(Lib.ImageEffective.COLOR, 5);
            yield;
        }
    });
}