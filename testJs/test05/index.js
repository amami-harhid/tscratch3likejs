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
let text;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload() {
    this.Image.load('./assets/Neon Tunnel.png', "Neon" );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', "Togemaru");
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Sound.add( Chill );
    stage.Image.add("Neon")

    cat = new Lib.Sprite(Cat);
    cat.Motion.Position.xy = [100,100];
    cat.Image.add( Cat );
    //cat.Looks.Size.scale = {w: 500, h: 500};

    //----------------
    text = new Lib.Sprite('text');
    text.Font.add("Togemaru");
    const fontSize = 35;
    const fontStyle = 'bold';
    const color = '#ff0000';
    const fontFamily = "Togemaru";
    const text1 = text.SvgText.toSvg(["カラー円盤ゲーム"], fontSize, fontStyle, color, fontFamily);
    //await stage.Control.wait(0.3);
    console.log('text.SvgText.add');
    text.SvgText.add( "Title", text1, fontFamily );
    //await stage.Control.wait(0.3);
    // 0.3秒待つと SVGTextを表示する
    // 0.2秒待つと 表示できない。
    // fontFamily を指定すると 0.2秒では表示できなかった。
    // font data を取り出して、defs.appendChild(style)するところで時間がかかっている模様。
    // --> 実測 48 msec
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