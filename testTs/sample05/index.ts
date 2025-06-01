/**
 * Sample05 旗クリックでスプライトを表示する
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample05】旗クリックでスプライトを表示する";

const Jurassic = "Jurassic";
const Cat = "Cat";

let stage: Stage;
let cat: Sprite;

// 事前ロード処理
Pg.preload = async function(this: PlayGround) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', Jurassic);
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/cat.svg', Cat);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    cat = new Lib.Sprite( Cat );
    await cat.Image.add( Cat );
    cat.Looks.hide();
}
// イベント定義処理
Pg.setting = async function() {

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:Sprite) {
        // ネコのスプライトを表示する
        this.Looks.show();
    });
    
};