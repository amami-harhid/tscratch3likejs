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
    // https://hsmt-web.com/blog/svg-text/
    await text.setFontFamily([
        {
            font:'TogeMaruGothic',
            href:'../../assets/fonts/TogeMaruGothic-700-Bold.woff',
        },
    ]);
    const textAttr = {
        font: 'TogeMaruGothic',
        font_size: 700,
        font_weight: 'bold',
        fill: 'white',
        stroke: 'blue',
        stroke_mode : 'outside',
        stroke_width: 30,
        use:[
            {x:0,y:0,fill:'black',stroke:'black',stroke_width:30},
            {x:0,y:0,fill:'white',stroke:'white',stroke_width:30},
            {x:0,y:0,fill:'blue'},
        ]
    }
    text.textAttributes = textAttr;
    //text.font = 'red';
    text.padding = 70;
    //text.fontSize = 700;
    text.Looks.Size.scale = {w:50, h:50};
    //text.svgScale = {w:1500, h:400};
    text.text = 'あい';
    text.Motion.Position.xy = {x: 0, y:0};
}

Pg.setting = async function setting() {
    text.Event.whenFlag(async function*(){
        let counter = 5;
        for(;;){
            this.text = `${counter}`;
            await this.Control.wait(1);
            counter -= 1;
            if(counter == 0){
                break;
            }
            yield;            
        }
        this.text = 'GO!';
        await this.Control.wait(1);
        this.Looks.hide();

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