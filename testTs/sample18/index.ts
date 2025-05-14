/**
 * Sample18
 * 
 * キーボード操作
 * 左矢印、右矢印で、シップが左右に動く。
 * スペースキーで 弾を発射（発射する弾はクローン）
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample18】左右矢印でシップが左右に動き、スペースキーで弾を発射。"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cross01:string = "Cross01";
const Cross02:string = "Cross02";
const Pew:string = "Pew";

let stage: S3Stage;
let cross: S3Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: S3PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cross1.svg`, Cross01);
    this.Image.load(`${ASSETS_HOST}/assets/cross2.svg`, Cross02);
    this.Sound.load(`${ASSETS_HOST}/assets/Pew.wav`, Pew);
}

// 事前準備処理
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    // 十字を作る
    cross = new Lib.Sprite("Cross");
    await cross.Image.add( Cross01 );
    await cross.Image.add( Cross02 );
    await cross.Sound.add( Pew );
    cross.Looks.setSize({w:100,h:100});
    // 座標x を ステージの真ん中にする 
    cross.Motion.setX(0); 
    // 座標y を ステージの高さの半分×0.6だけ下げる 
    cross.Motion.setY(-Lib.stageHeight/2 * 0.6); 
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag(async function*( this: S3Stage) {
        // 音量=50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag(async function*( this: S3Sprite ){
        // 向き初期化
        this.Motion.pointInDirection( 90 );
        // 黒いコスチューム
        this.Looks.switchCostume(Cross01);
        // サイズを 100%にする
        this.Looks.setSize({w:100,h:100});
        // 座標x を ステージの真ん中にする 
        this.Motion.setX(0); 
        // 座標y を ステージの高さの半分×0.6だけ下げる 
        this.Motion.setY(-Lib.stageHeight/2 * 0.6); 
        // 音量=200
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 200 );
        // ピッチ=150 (再生速度をあげる = 音を短く高く)
        await this.Sound.setOption( Lib.SoundOption.PITCH, -150 );
    });

    // 進む速さ
    const MoveSteps = 15;
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        // ずっと繰り返す
        for(;;){
            // キー(右矢印)が押されているとき
            if(Lib.keyIsDown(Lib.Keyboard.RIGHT)){
                this.Motion.moveSteps(MoveSteps);
            }
            // キー(左矢印)が押されているとき
            if(Lib.keyIsDown(Lib.Keyboard.LEFT)){
                this.Motion.moveSteps(-MoveSteps);
            }
            yield;
        }
    });
    // 矢印キーを押しながら、スペースキー押していることが分かることを実証
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag( async function*( this: S3Sprite ){
        // ずっと繰り返す
        for(;;){
            // キー(スペース)が押されているとき
            if(Lib.keyIsDown(Lib.Keyboard.SPACE)){ 
                // 音を鳴らす
                this.Sound.play(Pew);
                // クローンを作る
                this.Control.clone();
                //次をコメントアウトしているときは キー押下中連続してクローン作る  
                //await this.Control.waitWhile( ()=>Lib.keyIsDown(Lib.Keyboard.SPACE));
            }
            yield;
        }
    });
    // クローンが作られたときの動作(十字)
    cross.Control.whenCloned( async function( this: S3Sprite ){
        // サイズを 20%にしておく
        this.Looks.setSize(20, 20);
        // 上方向にしておく
        this.Motion.pointInDirection(0);
        // スプライトの大きさを取得（高さのみ）
        const {height} = this.Looks.drawingDimensions();
        // Y座標を 高さの半分だけ変える
        this.Motion.changeY( height / 2);
        // 次のコスチュームにする（本体とは別のコスチュームにする）
        this.Looks.nextCostume();
        // 表示する
        this.Looks.show();
    });
    cross.Control.whenCloned( async function*( this: S3Sprite ) {
        // ずっと繰り返す
        for(;;){
            this.Motion.changeY(+15); // 15ずつ上昇する
            // 端にふれたとき
            if(this.Sensing.isTouchingEdge()){
                // 隠す
                this.Looks.hide();
                // 繰り返しを抜ける
                break;
            }
            yield;
        }
    });

    // 右回転する量
    const TURN_RIGHT_DEGREE= 25;
    // クローンされたときの動作（十字）
    cross.Control.whenCloned( async function*( this: S3Sprite ) {
        // 音量 50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50 );
        // ピッチ 50 ( 低音にする )
        await this.Sound.setOption( Lib.SoundOption.PITCH, -50 );
        // ずっと繰り返す
        for(;;){
            // 右へ回転する
            this.Motion.turnRightDegrees(TURN_RIGHT_DEGREE);
            // 端に触れたとき
            if(this.Sensing.isTouchingEdge()){
                // 音を鳴らす
                this.Sound.play(Pew);
                // 繰り返しを抜ける
                break;
            }
            yield;
        }
        // 少し待つ
        await this.Control.wait(0.2);
        // このクローンを削除する
        this.Control.remove();
    });
}