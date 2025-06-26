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
    this.Font.load('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap&text='+encodeURIComponent("跳ね返る0123456789秒"), "GoogleFont");
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
    text.Font.add("GoogleFont");
    text.Looks.Layer.gotoBack();
    const fontSize = 75;
    const fontStyle = 'bold';
    const color = '#ffffff';
    const fontFamily = "GoogleFont";
    //await stage.Control.wait(0.3);
    const option = {
        fontFamily: fontFamily,
        color: color,
        fontSize: fontSize,
        fontStyle: fontStyle,
    }
    const texts = [
        "跳ね返る",
    ]
    text.SvgText.addTexts( "Title", texts, option );
    text.SvgText.addTexts( "0", [`0秒`], option );
    text.SvgText.addTexts( "1", [`1秒`], option );
    text.SvgText.addTexts( "2", [`2秒`], option );
    text.SvgText.addTexts( "3", [`3秒`], option );
    text.SvgText.addTexts( "4", [`4秒`], option );
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
    text.Event.whenFlag(async function*(){
        let count = 0;
        for(;;) {
            console.log(`${count}秒`)
            this.Looks.Layer.gotoBack();
            text.Looks.Costume.next();
            await this.Control.wait(1);
            count += 1;
            yield;
        }
    });
}