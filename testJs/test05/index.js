/**
 * test05
 * 端に触れたら跳ね返るの動作を本家に近づける
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test05】端に触れたら跳ね返るの動作を本家に近づける"

const Env = Lib.Env;
Env.fps = 30;
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
    stage.Sound.add( Chill );
    cat = new Lib.Sprite(Cat);
    cat.Motion.Position.xy = [100,100];
    cat.Image.add( Cat );
    cat.Looks.Size.scale = {w: 500, h: 500};
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    cat.Event.whenFlag(async function*(){
        this.Motion.Position.xy = {};
        this.Looks.Size.scale = {};
        this.Motion.Direction.degree = 60;
        this.Pen.prepare();
        this.Pen.clear();
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        //this.Pen.down();
        for(;;){
            await this.Control.waitUntil(()=>this.Sensing.isKeyDown(Lib.Keyboard.SPACE));
            await this.Control.waitUntil(()=>this.Sensing.isKeyNotDown (Lib.Keyboard.SPACE));
            this.Motion.Move.steps(10);
            this.Motion.Move.ifOnEdgeBounce();
            //this.Looks.Effect.change(Lib.ImageEffective.COLOR, 5);
            this.Pen.stamp();
            yield;
        }
    });
}