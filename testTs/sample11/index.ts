/**
 * Sample11
 * スプライト（CAT)を １秒で「どこかの」場所へ移動する
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample11】１秒で「どこかの」場所へ移動する"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: Stage;
let cat: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function preload(this: PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    cat.Motion.gotoXY( 0, 0 );
    await cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this:Stage ) {
        // 音量 10
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 10);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    cat.Event.whenFlag(async function(this:Sprite){
        // 初期位置
        this.Motion.gotoXY( 0, 0 );
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag(async function*( this:Sprite ) {
        // ずっと繰り返す
        for(;;){
            // 1秒待つ
            await this.Control.wait(1);
            // 場所をランダムに決める
            const randomPoint = Lib.randomPoint;
            // 1秒で決めた場所へ移動する
            await this.Motion.glideToPosition(1,  randomPoint.x, randomPoint.y);
            yield;
        }
    });
}