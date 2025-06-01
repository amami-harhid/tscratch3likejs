/**
 * Sample07 スプライトを左右に動かす。端に触れたら跳ね返る
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample07】スプライトが横向きに動き、端に触れたら跳ね返る";

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";
const SpriteCatName:string = "cat";

let stage: Stage;
let cat: Sprite;

// 事前ロード処理
Pg.preload = async function preload(this: PlayGround) {
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
    stage.Event.whenFlag( async function*(this:Stage){
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
    cat.Event.whenFlag( async function(this:Sprite){
        // (0,0)へ移動
        this.Motion.Move.toXY( 0, 0 );
        // 向き=90
        this.Motion.Direction.degree = 90;
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this:Sprite){
        // 歩く速さ
        const catStep = 5;
        // ずっと繰り返す。
        for(;;){
            // 進む
            this.Motion.Move.steps(catStep);
            // もし端に触れたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            yield;
        }
    });
}