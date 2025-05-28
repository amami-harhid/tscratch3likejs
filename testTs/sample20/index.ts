/**
 * Sample20
 * メッセージを送信受信し、フキダシ(SAY,THINK)を制御する
 * メッセージはEventEmitterを使い実装している。
 * EventEmitterは同一IDの受信(on)の定義は10個までの制限があるが、
 * 『whenBroadcastReceived』を使うことで、同一IDの受信登録数について
 * 実装上の上限はない（ただし受信登録数が極端に多いときは動きが遅くなるかも）
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite, SayProperty} from "@typeJS/s3Sprite";

Pg.title = "【Sample20】二匹のネコ、メッセージを送信受信して会話"

const BackDrop = "BackDrop";
const Cat1:string = "Cat";
const Cat2:string = "Cat";
let stage: Stage;
let cat: Sprite;
let cat2: Sprite;
import {
    bubbleTextArr, 
    bubbleTextArr2, 
    MessageCat1Say, 
    MessageCat2Say,
    MessageCat2Think,
    MessageByeBye,
    MessageTAIJYO} from './bubble';

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

// 事前ロード処理
Pg.preload = async function(this: PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/backdrop.png`, BackDrop);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat1);
    this.Image.load(`${ASSETS_HOST}/assets/cat2.svg`, Cat2);
}

// 事前準備処理
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( BackDrop );

    cat = new Lib.Sprite("Cat");
    cat.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
    //cat.Motion.setRotationStyle( Lib.RotationStyle.LEFT_RIGHT );
    await cat.Image.add( Cat1 );
    await cat.Image.add( Cat2 );
    cat.Motion.Move.gotoXY( -150, 0 );
    cat.Motion.Point.pointInDirection( 90 );
    cat.Looks.hide();
    cat2 = new Lib.Sprite("Cat2");
    cat2.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
    await cat2.Image.add( Cat1 );
    await cat2.Image.add( Cat2 );
    cat2.Motion.Point.pointInDirection( -90 );
    cat2.Motion.Move.gotoXY( 150, 0 );
    cat2.Looks.hide();
}
// イベント定義処理
Pg.setting = async function setting() {
    
    const BubbleScale:SayProperty = {scale:{w:100,h:100}};

    stage.Event.whenFlag( async function(this: Stage) {
        // 1秒待つ
        await this.Control.wait(1); // 1秒待つ
        
        // (↓)順番にメッセージを送って待つ
        //(左) "こんにちは。良い天気ですね" (3秒間)
        await this.Event.broadcastAndWait(MessageCat1Say, bubbleTextArr[0], 3); 
        //(右) "💚こんにちは💚青空がよい感じですね" (1秒間)
        await this.Event.broadcastAndWait(MessageCat2Say, bubbleTextArr2[0], 1);
        //(右) "どこにおでかけですか" (2秒間)
        await this.Event.broadcastAndWait(MessageCat2Say, bubbleTextArr2[1], 2);
        //(左) "ちょっと近くのスーパーに買い物にいくんですよ" (1秒間)
        await this.Event.broadcastAndWait(MessageCat1Say, bubbleTextArr[1], 1);
        //(右) "あらあらそれはいいですね" (4秒間)
        await this.Event.broadcastAndWait(MessageCat2Think, bubbleTextArr2[2], 4);
        // それではまた！ (2秒間) 
        await this.Event.broadcastAndWait(MessageByeBye, "それでは、また！", 2);
        // 退場する
        this.Event.broadcast(MessageTAIJYO);

    });
    // 緑の旗が押されたときの動作
    cat.Event.whenFlag(async function(this:Sprite){
        this.Motion.Move.gotoXY( -150, 0 );
        this.Motion.Point.pointInDirection( 90 );
        this.Looks.show();
    });
    // MessageCat1Say を受け取る。引数は受け取らずに 上下に変化させるだけ。
    cat.Event.whenBroadcastReceived(MessageCat1Say, async function*(this:Sprite) {
        // 上下に揺らす。
        for(let count=0; count<10; count++){
            this.Motion.Position.y += 2;
            yield;
        }
        for(let count=0; count<10; count++){
            this.Motion.Position.y -= 2;
            yield;
        }
    });
    // MessageCat1Say を受け取る。引数を受け取り、フキダシを表示する。
    cat.Event.whenBroadcastReceived(MessageCat1Say, 
        async function(this:Sprite, text:string, time:number) {
            const self = this;
            // Cat の フキダシ を出す
            if(time>0) {
                await self.Looks.sayForSecs(text, time, BubbleScale);
            }else{
                self.Looks.say(text);
            }
        });
    // MessageTAIJYO を受け取る。引数を受け取り、フキダシを表示したあと、退場する
    cat.Event.whenBroadcastReceived(MessageTAIJYO, async function*(this:Sprite) {
        const self = this;
        // Cat 退場
        self.Looks.say('');
        self.Motion.Direction.degree += 180; // 反対方向へ
        for(;;){
            self.Motion.Move.moveSteps(5);
            if(self.Sensing.isTouchingEdge()) {
                break;
            }
            yield;
        }
        self.Looks.hide(); 
    });
    // 緑の旗が押されたときの動作
    cat2.Event.whenFlag(async function(this:Sprite){
        this.Motion.Point.pointInDirection( -90 );
        this.Motion.Move.gotoXY( 150, 0 );
        this.Looks.show();
    });
    // MessageTAIJYO を受け取る。引数を受け取り、フキダシを表示したあと、退場する
    cat2.Event.whenBroadcastReceived(MessageTAIJYO, async function*(this:Sprite) {
        const self = this;
        // Cat2 退場
        //console.log('Cat2 退場');
        self.Looks.say('');
        self.Motion.Direction.degree += 180; // 反対方向へ
        for(;;){
            self.Motion.Move.moveSteps(5);
            if(self.Sensing.isTouchingEdge()) {
                break;
            }
            yield;
        }
        self.Looks.hide();       
    });
    // MessageCat2Say を受け取る。引数は受け取らずに 上下に変化させるだけ。
    cat2.Event.whenBroadcastReceived(MessageCat2Say, async function*(this:Sprite) {
        // 上下に揺らす。
        for(let count=0; count<10; count++){
            this.Motion.Position.y += 2;
            yield;
        }
        for(let count=0; count<10; count++){
            this.Motion.Position.y -= 2;
            yield;
        }
    });
    // MessageCat2Say を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageCat2Say, async function(this:Sprite, text="", time=-1) {
        // Cat2 の フキダシ を出す
        if(time>0) {
            await this.Looks.sayForSecs(text, time, BubbleScale);
        }else{
            this.Looks.say(text);
        }    
    });
    // MessageCat2Think を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageCat2Think, async function(this:Sprite, text="", time=-1) {
        // Cat2 の フキダシ を出す
        //console.log('CAT2 フキダシ time='+time + " text="+text);
        if(time>0) {
            await this.Looks.thinkForSecs(text, time);
        }else{
            this.Looks.think(text);
        }    
    });
    // MessageByeBye を受け取る。引数を受け取り、フキダシを表示する。
    cat.Event.whenBroadcastReceived(MessageByeBye, async function(this:Sprite, text="", time=-1) {
        // それでは、という
        //console.log('CAT フキダシ time='+time + " text="+text);
        await this.Looks.thinkForSecs(text, time);
    });
    // MessageByeBye を受け取る。引数を受け取り、フキダシを表示する。
    cat2.Event.whenBroadcastReceived(MessageByeBye, async function(this:Sprite, text="", time=-1) {
        // それでは、という
        //console.log('CAT2 フキダシ time='+time + " text="+text);
        await this.Looks.sayForSecs(text, time);
    });
}