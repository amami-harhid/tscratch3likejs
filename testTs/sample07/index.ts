/**
 * Sample07 スプライトを左右に動かす。端に触れたら跳ね返る
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample07】スプライトが横向きに動き、端に触れたら跳ね返る";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const SpriteCatName:string = "cat";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill);
    cat = new Lib.Sprite( SpriteCatName );
    await cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function*(this:S3Stage){
        // 音量 150
        await stage.Sound.setOption( Lib.SoundOption.VOLUME, 150);
        // ずっと繰り返す
        while(true){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:S3Sprite){
        // (0,0)へ移動
        this.Motion.gotoXY( 0, 0 );
        // 向き=90
        this.Motion.pointInDirection( 90 );
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:S3Sprite){
        // 歩く速さ
        const catStep = 5;
        // ずっと繰り返す。
        for(;;){
            // 進む
            this.Motion.moveSteps(catStep);
            // もし端に触れたら跳ね返る
            this.Motion.ifOnEdgeBounds();
            yield;
        }
    });
}