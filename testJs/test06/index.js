/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test06】テキストを描画する"

//const Env = Lib.Env;
//Env.fps = 30;

//const NeonTunnel = "NeonTunnel";
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

    text = new Lib.TextSprite('Text');
    text.fontSize = 350;
    text.Looks.Size.scale = {w:30, h:30};
    text.svgScale = {w:1500, h:400};
    text.textAttributes = {x:0, y:350};
    text.text = 'あい';
    text.Motion.Position.xy = {x: -150, y:0};
}

Pg.setting = async function setting() {
    text.Event.whenFlag(async function*(){
        let counter = 0;
        for(;;){
            counter += 1;
            this.text = `${counter}`;
            this.Motion.Move.steps(10);
            if(this.Motion.Position.x > 240) {
                this.Motion.Position.x = -240;
            }
            yield;
        }
    });
    cat.Event.whenFlag(async function*(){
        for(;;) {
            // 進む。
            this.Motion.Move.steps(5);
            // 端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            yield;
        }
    });
    
}