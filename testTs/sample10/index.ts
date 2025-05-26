/**
 * Sample10
 * スプライトのクローンを作る（スプライトに触ったらクローンを作る）
 * クローンされたら動きだす（端に触れたらミャーとないて折り返す）
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample10】スプライトに触ったらクローンを作る(5秒で死ぬ)";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const Mya:string = "Mya";

let stage: Stage;
let cat: Sprite;

// 事前ロード処理
Pg.preload = async function preload(this: PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Cat.wav', Mya);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    await cat.Image.add( Cat );
    await cat.Sound.add( Mya );
    cat.Motion.gotoXY( 200, 150 );
    cat.Motion.pointInDirection( 90 );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this:Stage) {
        // 音量 50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:Sprite) {
        // 位置初期化
        this.Motion.gotoXY( 200, 150 );
        // 向き初期化
        this.Motion.pointInDirection( 90 );
        // 音量 20
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20);
    });
    // 回転量
    const _changeDirection = 1;
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:Sprite) {
        // ずっと繰り返す
        for(;;){
            // 右へ回転する
            this.Motion.turnRightDegrees(_changeDirection);// 外側Scope 参照可能を実証
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:Sprite) {
        // 次をずっと繰り返す
        for(;;){
            // マウスカーソルでタッチしたら、クローンを作る
            if( this.Sensing.isMouseTouching() ) {
                await this.Control.clone();
                // マウスタッチしている間、待つ
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching() ); 
            }
            yield;
        }
    });

    const steps = 10;
    // クローンされたときの動作(ネコ)
    cat.Control.whenCloned(async function*(this:Sprite){
        this.Motion.gotoXY( 100, -100 );    // 位置
        this.Looks.setSize(50, 50);         // 大きさを縦横50%
        this.Looks.setEffect(Lib.ImageEffective.COLOR, 50); //色の効果
        
        this.Looks.show(); // 表示する
        // ずっと繰り返す
        for(;;){
            // 進む
            this.Motion.moveSteps( steps );
            // 端に触れたら跳ね返る
            this.Motion.ifOnEdgeBounds();
            if(this.Sensing.isTouchingEdge() ){
                // ミャーと鳴く。
                this.Sound.play(Mya)
            }
            if(this.life < 0){ // ライフがゼロより小さくなったとき
                break; // 「ずっと繰り返す」を抜ける
            }
            yield;
        }
    });
    // クローンされたときの動作(ネコ)
    cat.Control.whenCloned(async function*(this:Sprite){
        this.life = 5000; // 約5秒
        // ずっと繰り返す
        for(;;){
            if(this.life < 0){ // ライフがゼロより小さくなったとき
                // このクローンを削除する
                this.Control.remove();
                break; // 「ずっと繰り返す」を抜ける
            }
            yield;
        }
    });

}