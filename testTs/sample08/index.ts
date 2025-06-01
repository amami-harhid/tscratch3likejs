/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample08】スプライトが動き、端に触れたらミャーと鳴く";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Mya: string = "Mya";
const Cat1:string = "Cat1";
const Cat2:string = "Cat2";
const SpriteCatName:string = "cat";

let stage: Stage;
let cat: Sprite;

// 事前ロード処理
Pg.preload = async function preload(this: PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat1);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat2.svg', Cat2);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    await cat.Sound.add( Mya );
    // 位置の初期化
    cat.Motion.Move.toXY( 0, 0 );
    // 向きの初期化
    cat.Motion.Direction.degree = 40;
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this:Stage){
        // 音量= 20
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:Sprite){
        // 位置の初期化
        this.Motion.Move.toXY( 0, 0 );
        // 向きの初期化
        this.Motion.Direction.degree = 40;
        // コスチューム
        this.Looks.Costume.name = Cat1;
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:Sprite){
        // ずっと繰り返す
        for(;;){
            // 次のコスチュームに切り替える
            this.Looks.Costume.next();
            // ０．１秒待つ
            await this.Control.wait(0.1);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:Sprite){
        // ネコが進む速さ
        const catStep = 5;
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと繰り返す
        for(;;){
            // ネコが進む
            this.Motion.Move.steps(catStep);
            // もし端に触れていたら
            if(this.Sensing.isTouchingEdge()){
                // ネコの音を鳴らす
                this.Sound.play(Mya);
            }
            // もし端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            yield;
        }
    });

}