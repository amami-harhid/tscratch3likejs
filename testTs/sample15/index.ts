/**
 * Sample15
 * スプライト（CAT) は端を越えて進めない。
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample15】端を越えては進めない。"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: Stage;
let cat: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: PlayGround) {
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
    cat.Motion.Move.toXY( 0, 0 );
    await cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*(this: Stage) {
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this: Sprite){
        // (0,0)へ移動する
        this.Motion.Move.toXY( 0, 0 );
    });

    // 進む速さ
    const CAT_WALK_STEP = 5;
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*(this: Sprite){
        // ずっと繰り返す
        for(;;){
            // 進む
            this.Motion.Move.steps(CAT_WALK_STEP);
            yield;
        }
    });
}