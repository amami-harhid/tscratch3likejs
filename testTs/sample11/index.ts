/**
 * Sample11
 * スプライト（CAT)を １秒で「どこかの」場所へ移動する
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {IPgMain as PgMain} from '@Type/pgMain';
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample11】１秒で「どこかの」場所へ移動する"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: Stage;
let cat: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function preload(this: PgMain) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    cat.Motion.Move.toXY( 0, 0 );
    cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this:Stage ) {
        // 音量 10
        this.Sound.setOption( Lib.SoundOption.VOLUME, 10);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    cat.Event.whenFlag(async function(this:Sprite){
        // 初期位置
        this.Motion.Move.toXY( 0, 0 );
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
            await this.Motion.Move.glideTo(1,  randomPoint.x, randomPoint.y);
            yield;
        }
    });
}