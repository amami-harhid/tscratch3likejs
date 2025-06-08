/**
 * test06
 * テキストを描画する
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test06】テキストを描画する"

const Env = Lib.Env;
Env.fps = 30;

const Jurassic = 'Jurassic';
const Chill = "Chill";
const Cat = "Cat";
const RosetE = "RosetE";
const Kaisotai = 'Kaisotai';

let stage;
let cat;
let text;
const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

const Svg = function(textStr, fontSize, mesure, padding, fontFamily) {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${mesure.w+padding*2}" height="${mesure.h+padding*2}" viewBox="0 0 ${mesure.w+padding*2} ${mesure.h+padding*2}">
    <defs><style>
            svg {
            fill: none;
            stroke: black;
            transform-box:fill-box;
            transform-origin:center;
        }
        .text {
            font: normal ${fontSize}px "${fontFamily}", sans-serif;
            border: 1px solid black;
        }
    </style></defs>
    <dummy/>
    <text id="text" class="text" x="0" y="${mesure.h+padding}">${textStr}</text>
</svg>`;
    return svg;
}


Pg.preload = async function preload() {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
    this.Font.load('/assets/fonts/ResotE-Rose-89c1.woff', RosetE);
    this.Font.load('/assets/fonts/Kaisotai-Next-UP-B.woff2', Kaisotai);

}
Pg.prepare = async function prepare() {

    stage = new Lib.Stage();
    await stage.Image.add(Jurassic);
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite(Cat);
    //await cat.Image.add( Cat );
    await cat.Font.add( RosetE );
    await cat.Font.add( Kaisotai );

    cat.Looks.Size.scale = {w: 250, h: 250};
    cat.Motion.Rotation.style = Lib.RotationStyle.DONT_ROTATE;
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
    for(const counter of Lib.Iterator(5)){
        //console.log(counter);
        const fontSize = 75;
        const padding = Math.ceil(fontSize*0.1);
        if(counter % 2 == 0){
            const mesure = cat.SvgText.mesure(`${counter}`, fontSize, 'normal', RosetE);
            const svg = Svg(`${counter}`, fontSize, mesure, padding, RosetE);       
            const add = cat.SvgText.add(`${counter}`, svg, RosetE);
            promiseArr.push(add);
        }else{
            const mesure = cat.SvgText.mesure(`${counter}`, fontSize, 'normal', RosetE);
            const svg = Svg(`${counter}`, fontSize, mesure, padding, RosetE);       
            const add = cat.SvgText.add(`${counter}`, svg, RosetE);
            promiseArr.push(add);

        }
    }
    await Promise.all(promiseArr);
}
Pg.setting = async function setting() {
    cat.Event.whenFlag(async function*(){
        this.Looks.Costume.name = '1';
        this.Motion.Direction.degree = 50;
        this.Pen.prepare();
        this.Pen.Size.thickness = 1000;
        this.Pen.HSVColor.brightness = 100;
        this.Pen.HSVColor.transparency = 0;//99.5;
        this.Pen.clear();
        this.Pen.down();
        for(;;) {
            // 進む。
            this.Motion.Move.steps(10);
            console.log(this.Looks.Size.drawingSize);
            // 端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            this.Pen.stamp();
            if(this.Sensing.isTouchingToSprites([text])){
                this.Looks.Bubble.say('さわった');
            }else{
                this.Looks.Bubble.say('');
            }
            this.Looks.Effect.change(Lib.ImageEffective.COLOR, 5);
            this.Looks.Costume.next();
            //this.Motion.Direction.degree += 1;
            yield;
        }
    });   
}