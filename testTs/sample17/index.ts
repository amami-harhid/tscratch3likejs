/**
 * Sample17
 * スプライト（CROSS) : 右側に回転 、マウスポインターに触れたら 蝶のクローンを作る（クローンの位置はマウスポインターの位置）
 * スプライト（butterfly) : 非表示、クローンされたら表示に切り替える、クローンは指定した時間数（ﾐﾘ秒）だけ生きている。
 * 
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample17】十字にマウスポインターが触れたら 蝶のクローンを作る"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cross01:string = "Cross01";
const Cross02:string = "Cross02";
const Butterfly01:string = "Butterfly01";
const Butterfly02:string = "Butterfly02";

let stage: Stage;
let cross: Sprite;
let butterfly: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cross1.svg`, Cross01);
    this.Image.load(`${ASSETS_HOST}/assets/cross2.svg`, Cross02);
    this.Image.load(`${ASSETS_HOST}/assets/butterfly1.svg`, Butterfly01);
    this.Image.load(`${ASSETS_HOST}/assets/butterfly2.svg`, Butterfly02);
}

// 事前準備処理
Pg.prepare = async function() {
    // ステージを作る
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    // 十字を作る
    cross = new Lib.Sprite("Cross");
    await cross.Image.add( Cross01 );
    await cross.Image.add( Cross02 );
    cross.Looks.setSize(300, 300);
    // 蝶を作る
    butterfly = new Lib.Sprite("Butterfly");
    await butterfly.Image.add( Butterfly01 );
    await butterfly.Image.add( Butterfly02 );
    butterfly.Looks.hide();
}
// イベント定義処理
Pg.setting = async function() {
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function*( this:Stage ) {
        // 音量=20
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20 )
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    const ChangeDirection = 1;
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag( async function*( this: Sprite ){
        // 位置の初期化
        cross.Motion.gotoXY(0, 0);
        // サイズを３倍にする
        cross.Looks.setSize(300, 300);
        // ずっと繰り返す
        for(;;){
            // 右へ回転する
            this.Motion.turnRightDegrees(ChangeDirection);
            yield;
        }
    });
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag( async function*( this: Sprite ){
        // ずっと繰り返す
        for(;;){
            // マウスカーソルに触ったとき
            if( this.Sensing.isMouseTouching() ){
                // 次のコスチュームへ切り替える
                this.Looks.nextCostume();
                // マウスタッチしている間、待つ
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching());
                // 次のコスチュームへ切り替える(元のコスチュームへ戻す)
                this.Looks.nextCostume();
            }
            yield;
        }
    });
    // 旗が押されたときの動作(十字)
    cross.Event.whenFlag(async function*( this: Sprite ){
        // ずっと繰り返す
        for(;;){
            // マウスカーソルに触ったとき( this は cross である)
            if ( this.Sensing.isMouseTouching() ) {
                // 蝶のクローンを作る
                butterfly.Control.clone();
                // 下をコメントアウトすると、十字にさわっている間は クローンを作り続ける
                // 下を生かすと、十字に触ったときにクローンを作るが、次には進まない
                //await Libs.waitUntil( this.isNotMouseTouching, this); // 「マウスポインターが触らない」迄待つ。
                await this.Control.wait(0.1); // 100ミリ秒待つ。 <== クローン発生する間隔
            }
            yield;
        }
    });
    // 旗が押されたときの動作（蝶）
    butterfly.Event.whenFlag(async function(this:Sprite){
        this.Looks.hide();
    })
    // 蝶がクローンされたときの動作
    butterfly.Control.whenCloned( async function*( this: Sprite ) {
        const clone: Sprite = this;
        // マウス位置を取得する
        const mousePosition = Lib.mousePosition;
        // 取得した位置へ蝶を移動させる
        clone.Motion.gotoXY(mousePosition.x, mousePosition.y);
        // 蝶のサイズを 縦横 15% にする
        clone.Looks.setSize(15, 15);
        // ランダムな方向へ蝶を向ける
        clone.Motion.pointInDirection(Lib.randomDirection);
        // ミリ秒。クローンが生きている時間。（およその時間）
        clone.life = 5000; 
        // 表示する
        clone.Looks.show();
    });
    // 蝶がクローンされたときの動作
    butterfly.Control.whenCloned( async function*( this: Sprite ) {
        // this がクローンであることを明示するために 変数cloneに入れる
        const clone: Sprite = this;
        // ずっと繰り返す
        for(;;){
            // lifeが尽きたら『繰り返し』を抜ける
            if(clone.life < 0 ){
                // このクローンを削除する
                this.Control.remove();
                break;
            }
            yield;
        }
    });
    // 蝶がクローンされたときの動作
    butterfly.Control.whenCloned( async function*( this: Sprite ) {
        // this がクローンであることを明示するために 変数cloneに入れる
        const clone: Sprite = this;
        // ずっと繰り返す
        for(;;){
            // lifeが尽きたら『繰り返し』を抜ける
            if(clone.life < 0 ){
                break;
            }
            // 次のコスチュームへ切り替える
            this.Looks.nextCostume();
            // コスチューム切り替えが速すぎないように少しだけ待つ
            await clone.Control.wait(0.05);
            yield;
        }
    });
    // 蝶がクローンされたときの動作
    butterfly.Control.whenCloned( async function*( this: Sprite ) {
        // this がクローンであることを明示するために 変数cloneに入れる
        const clone: Sprite = this;
        // ずっと繰り返す
        for(;;){
            // ランダムな位置を取得する
            const randomPoint = Lib.randomPoint;
            // 取得した位置へ１秒で移動する
            await clone.Motion.glideToPosition(5, randomPoint.x, randomPoint.y);
            // lifeが尽きたら『繰り返し』を抜ける
            if( clone.life < 0) {
                break;
            }        
            yield;
        }
    });
}