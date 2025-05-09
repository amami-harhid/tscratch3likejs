/**
 * Sample13
 * スプライト（CAT) クリックした位置へ１秒で動く
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";
import type {S3Point} from "@typeJS/s3Point";

Pg.title = "【Sample13】クリックした位置へ１秒で動く"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: S3PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}

// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    await cat.Image.add( Cat );
}
// イベント定義処理
Pg.setting = async function() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function( this: S3Stage ) {
        // 音を登録
        await this.Sound.add( Chill );
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 )
    });
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this:S3Stage ) {
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 )
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });

    // ステージをタッチしたときの動作
    stage.Event.whenClicked(async function(this:S3Stage){
        // マウスカーソルの位置を取得する
        const mousePosition = Lib.mousePosition;
        // メッセージ(MOUSE_CLICK)を送って待つ
        await this.Event.broadcastAndWait('MOUSE_CLICK', mousePosition);
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag(async function( this:S3Sprite ){
        // (0,0)へ移動する
        this.Motion.gotoXY( 0, 0 );
    });

    // メッセージ(MOUSE_CLICK)を受け取ったときの動作
    cat.Event.whenBroadcastReceived('MOUSE_CLICK', 
        async function(this:S3Sprite, mousePosition:S3Point){
            // 取得した位置へ1秒で移動させる
            await cat.Motion.glideToPosition( 1, mousePosition );
        }
    );
}