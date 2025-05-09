/**
 * Sample05 旗クリックでスプライトを表示する
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample05】旗クリックでスプライトを表示する";

const Jurassic = "Jurassic";
const Cat = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

// 事前ロード処理
Pg.preload = function(this: S3PlayGround) {
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
Pg.setting = function() {

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function(this:S3Sprite) {
        // ネコのスプライトを表示する
        this.Looks.show();
    });
    
};