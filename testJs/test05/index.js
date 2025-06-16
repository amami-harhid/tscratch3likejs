/**
 * test05
 * 端に触れたら跳ね返るの動作を本家に近づける
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test05】端に触れたら跳ね返るの動作を本家に近づける"

const Env = Lib.Env;
Env.fps = 60;
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
    cat.Image.set( Cat );
    cat.Looks.Size.scale = {w: 300, h: 300};
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    cat.Event.whenFlag(async function*(){
        this.Motion.Direction.degree = 60;
        console.log('b1')
        this.Pen.prepare();
        console.log('b2')
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.transparency = 95;
        this.Pen.clear();
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        this.Pen.down();
        for(const _ of Lib.Iterator(5000)){
            this.Motion.Move.steps(10);
            this.Motion.Move.ifOnEdgeBounds();
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 5);
            this.Pen.stamp();
            yield;
        }
    });
}