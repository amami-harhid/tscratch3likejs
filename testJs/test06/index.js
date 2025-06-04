/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test06】テキストを描画する"

const Env = Lib.Env;
Env.fps = 60;
//dconst NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const Cat = "Cat";

let stage;
let cat;
let text;
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
    cat.Looks.Size.scale = {w: 300, h: 300};

    text = new Lib.TextSprite();
    text.drawText('Hello World!Hello World!Hello World!');
    text.position = {x: -150, y:0};
}

Pg.setting = async function setting() {
    stage.Event.whenFlag(async function*(){
        for(;;){
            text.update();
            yield;
        }
    });
}