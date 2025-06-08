/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test06】テキストを描画する"

//const Env = Lib.Env;
//Env.fps = 30;

const Jurassic = 'Jurassic';
const Chill = "Chill";
const Cat = "Cat";
const RosetE = "RosetE";

let stage;
let cat;
let text;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

const Svg = function(textStr, mesure, fontFamily) {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${mesure.w}" height="${mesure.h}" viewBox="0 0 ${mesure.w} ${mesure.h}">
    <defs><style>
        .text {
            font: normal 50px "${fontFamily}", sans-serif;
        }
    </style></defs>
    <text class="text" x="0" y="${mesure.h}">${textStr}</text>
</svg>`;
    return svg;
}


Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
    this.Font.load('/assets/fonts/ResotE-Rose-89c1.woff', RosetE);

}
Pg.prepare = async function prepare() {

    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite(Cat);
    //await cat.Image.add( Cat );
    await cat.Font.add( RosetE );

    cat.Looks.Size.scale = {w: 100, h: 100};

    text = new Lib.TextSprite('Text');
    // https://hsmt-web.com/blog/svg-text/
    await text.setFontFamily([
        {
            font:'ResotE',
            //href:'/assets/fonts/ResotE-Rose-89c1.woff2',
            href:'/assets/fonts/ResotE-Rose-89c1.woff',
            descriptors: { style: 'normal', weight: 700}
        },
    ]);
    const textAttr = {
        font: 'ResotE',
        font_size: 12,
        //font_weight: 'bold',
        //fill: 'blue',
        //stroke: 'blue',
        //stroke_mode : 'outside',
        //stroke_width: 0,
        // use:[
        //     {x:0,y:0,fill:'black',stroke:'white',stroke_width:130},
        //     {x:4,y:-4,fill:'blue'},
        // ]
    }
    text.textAttributes = textAttr;
    //text.font = 'red';
    text.padding = 10;
    //text.fontSize = 700;
    text.Looks.Size.scale = {w:100, h:100};
    //text.svgScale = {w:1500, h:400};
    text.Motion.Position.xy = {x: 0, y:0};

    const promiseArr = []
    // eslint-disable-next-line loopCheck/s3-loop-plugin
    for(const counter of Lib.Iterator(20)){
        console.log(counter);
        const mesure = cat.SvgText.mesure(`${counter}`, 50, 'normal', RosetE);
        const svg = Svg(`${counter}`, mesure, RosetE);
        const add = cat.SvgText.add(`${counter}`, svg, RosetE);
        promiseArr.push(add);
    }
    await Promise.all(promiseArr);

}
const Text = `
    これから開始します<br>
    クリックはできません
    `;

Pg.setting = async function setting() {
    text.Event.whenFlag(async function*(){
        await this.setText(Text);
        this.Looks.Size.scale = {w:100, h:100};
        this.Looks.show()
        let counter =20;
        for(;;){
            if(counter == 500){
                this.setText('GO!');
                this.Looks.Size.scale = {w:300,h:300};
                await this.Control.wait(1);
                break;
            }
            this.Looks.Size.scale = {w:counter,h:counter};
            //await this.setText(`カウントダウン (${counter})`);
            //this.text = `Count Down (${counter})`;
            //await this.Control.wait(0.5);
            counter += 5;
            yield;            
        }
        await this.Control.wait(1);
        this.Looks.hide();
    });
    cat.Event.whenFlag(async function*(){
        this.Looks.Costume.name = '1';
        this.Motion.Direction.degree = 40;
        for(;;) {
            // 進む。
            this.Motion.Move.steps(10);
            // 端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            if(this.Sensing.isTouchingToSprites([text])){
                this.Looks.Bubble.say('さわった');
            }else{
                this.Looks.Bubble.say('');
            }
            this.Looks.Costume.next();
            yield;
        }
    });
    
}