/**
 * Sample06 スプライトをタッチしたらＢＧＭを繰返し鳴らす
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playGround";
import type {Stage} from "@Type/stage";
import type {Sprite} from "@Type/sprite";

Pg.title = "【Sample06】スプライトをタッチしたらＢＧＭを繰返し鳴らす";

const Jurassic = "Jurassic";
const Chill = "Chill";
const Cat = "Cat";

let stage: Stage;
let cat: Sprite;

// 事前ロード処理
Pg.preload = async function preload(this:PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat = new Lib.Sprite( Cat );
    await cat.Image.add( Cat );
    await cat.Sound.add( Chill );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:Sprite) {
        // 音量 10
        await cat.Sound.setOption( Lib.SoundOption.VOLUME, 10 );
    });
    
    // スプライト（ネコ）をクリックしたときの動作
    cat.Event.whenClicked( async function*(this:Sprite){
        // 「終わるまで音を鳴らす」をずっと繰り返す
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
}
