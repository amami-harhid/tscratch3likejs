/**
 * Sample19
 * 
 * 吹き出し(SAY, THINK)
 */

import {Pg, Lib, Env} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";
Pg.title = "【Sample19】いろんな文字列でフキダシ(言う, 思う)。20秒間。"

// Bubbleスケールがスプライトにリンクする
Env.bubbleScaleLinkedToSprite = true;

const Jurassic:string = "Jurassic";
const Cat1:string = "Cat1";
const Cat2:string = "Cat2";


let stage: Stage;
let cat: Sprite;
let cat2: Sprite;

import {bubble, bubbleTextArr, bubble2, bubbleTextArr2} from './bubble'

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: PgMain) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat1);
    this.Image.load(`${ASSETS_HOST}/assets/cat2.svg`, Cat2);
}

// 事前準備処理
Pg.prepare = async function prepare() {

    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );

    cat = new Lib.Sprite("Cat");
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    cat.Motion.Direction.degree = 75;
    cat2 = new Lib.Sprite("Cat2");
    await cat2.Image.add( Cat1 );
    await cat2.Image.add( Cat2 );
    cat2.Motion.Direction.degree = 115;
    cat2.Motion.Move.toXY( -20, -120 );
}
// イベント定義処理
Pg.setting = async function setting() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function(this:Stage) {
        bubble.exit = false;
        bubble2.exit = false;
        await this.Control.wait(20); // 20秒たったらバブルループを終わらせる。
        bubble.exit = true;
        bubble2.exit = true;
    });

    // 歩く速さ
    const WALK_STEP = 1;
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*( this: Sprite ) {
        // 位置の設定
        this.Motion.Move.toXY( 0, 0 );
        // 向きの設定
        this.Motion.Direction.degree = 75;
        // ずっと繰り返す
        for(;;){
            // もし端に着いたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            // 進む
            this.Motion.Move.steps(WALK_STEP);
            yield;
        }
    });

    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*( this: Sprite ) {
        // ちょっとだけ待つ
        await this.Control.wait(0.1);
        // ずっと繰り返す
        for(;;){
            // 次のコスチュームに切り替える
            this.Looks.Costume.next();
            // ちょっとだけ待つ
            await this.Control.wait(0.1)
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*( this: Sprite ) {
        // ちょっとだけ待つ
        await this.Control.wait(0.1);
        // サイズの変更量
        const CHANGE_SIZE = 2;
        // 最小サイズ、最大サイズ
        const SCALE = {MIN:50, MAX:150};
        // ずっと繰り返す
        for(;;){
            // ずっと繰り返す(入れ子)
            for(;;){
                // サイズを指定した量だけ変える（減らす）
                const size = this.Looks.Size;
                size.scale = {w: size.w -CHANGE_SIZE, h: size.h -CHANGE_SIZE};
                // サイズが決めた値より小さくなったとき繰り返しを抜ける
                if(size.w < SCALE.MIN) break;
                yield;
            }
            // ずっと繰り返す(入れ子)
            for(;;){
                // サイズを指定した量だけ変える（増やす）
                const size = this.Looks.Size;
                size.scale = {w: size.w +CHANGE_SIZE, h: size.h +CHANGE_SIZE};
                // サイズが決めた値より大きくなったとき繰り返しを抜ける
                if(size.w > SCALE.MAX) break;
                yield;
            }
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ)
    cat.Event.whenFlag( async function*( this: Sprite ) {
        // 言う・思う を切り替えるためのフラグ的な変数
        let counter = 0;
        // ずっと繰り返す
        for(;;){
            // フキダシテキスト配列からランダムな要素を取り出す
            const text = bubbleTextArr[ Math.ceil(Math.random() * bubbleTextArr.length) - 1 ];
            // 端についたとき
            if( this.Sensing.isTouchingEdge() ) {
                // 0, 1 を入れ替える
                counter += 1;
                counter = counter % 2;
            }
            if( counter == 0 ) {
                // 言う
                this.Looks.Bubble.say(text);

            }else{
                // 思う
                this.Looks.Bubble.think(text);

            }
            // フキダシが終わりになったら
            if( bubble.exit === true) {
                // 空文字で「言う」( ==> フキダシ消える )
                this.Looks.Bubble.say();
                // 他のスクリプトを止める
                this.Control.stopOtherScripts();
                // このスクリプトを止める
                this.Control.stopThisScript();
            }
            // 少しだけまつ
            await this.Control.wait(0.5);
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ２)
    cat2.Event.whenFlag( async function*( this: Sprite ) {
        // 位置の設定
        this.Motion.Move.toXY( -20, -120 );
        // 向きの設定
        this.Motion.Direction.degree = 115;
        // ずっと繰り返す
        for(;;){
            // もし端に着いたら跳ね返る
            this.Motion.Move.ifOnEdgeBounds();
            // 進む
            this.Motion.Move.steps(WALK_STEP);
            yield;
        }
    });
    // 旗が押されたときの動作(ネコ２)
    cat2.Event.whenFlag( async function*( this: Sprite ) {
        // 大きさ 60 %
        const scale = {w: 60, h:60};
        // ずっと繰り返す
        for(;;){
            // フキダシテキスト配列からランダムな要素を取り出す
            const text = bubbleTextArr2[ Math.ceil(Math.random() * bubbleTextArr2.length) - 1 ]
            // 「思う」
            this.Looks.Bubble.think(text, {scale:scale});
            // フキダシ 終わりのとき
            if( bubble2.exit === true) {
                // 空文字で「言う」( ==> フキダシ消える )
                this.Looks.Bubble.say();
                // 他のスクリプトを止める
                this.Control.stopOtherScripts();
                // このスクリプトを止める
                this.Control.stopThisScript();
                // 繰り返しを抜ける
                break;
            }
            // 少し待つ
            await this.Control.wait(0.5)
            yield;
        }
    });
}