/**
 * Sample14
 * スプライト（CAT) がマウスポインターを追いかける
 * マウスポインターがステージの外に出た最後の位置へ追いかける
 * 5秒経過したら 1秒かけて移動する！に切り替わる
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample14】マウスポインターを追いかける（５秒経過後『１秒間でマウスポインターの位置へ移動する』に変化する）"

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
    stage.Event.whenFlag( async function*( this:S3Stage ) {
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
    cat.Event.whenFlag( async function( this: S3Sprite ){
        // (0,0)へ移動する
        this.Motion.gotoXY( 0, 0 );
    })

    // ms の値
    const sec1 = 1;
    const sec5 = 5;
    // 「5秒経過した」フラグ
    let _5SecondsTimerOn = false;
    // ネコの速度
    const catStep = 5;

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function( this:S3Sprite ){        
        _5SecondsTimerOn = false; // 5秒経過していない
        await this.Control.wait(sec1+sec5); // 1秒 + 5秒待つ
        _5SecondsTimerOn = true;  // 5秒経過した
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*( this:S3Sprite ){
        // 旗をおした瞬間ではなく マウス移動させる時間余裕をもたせるために 待つ時間を設ける
        await this.Control.wait(sec1); // 1秒待つ 
        // ずっと繰り返す
        for(;;){
            // マウスの方向へ向く
            this.Motion.pointToMouse();
            // 5秒経過しているとき
            if(_5SecondsTimerOn){
                // マウスカーソルの位置（枠内にあった最後の位置）
                const mousePosition = Lib.mousePosition;
                // 取得した位置へ1秒かけて移動する
                await this.Motion.glideToPosition( 1, mousePosition.x, mousePosition.y );
            }else{
                // 5秒経過していないときは
                // マウスカーソルのある方向へ移動する
                this.Motion.moveSteps(catStep);
            }
            yield;
        }
    });

}