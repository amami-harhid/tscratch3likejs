/**
 * sample28
 * スプライトをクリックしたとき、ステージをクリックしたときに
 * 質問を出す。
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";
import type {S3Monitors,S3Monitor} from "@typeJS/s3Monitors";

Pg.title = "【Sample28】質問をする(ネコをクリック、ステージをクリック)"

const Jurassic01:string = "Jurassic01";
const Chill:string = "Chill";
const Cat01:string = "Cat01";
const Cat02:string = "Cat02";

let stage: S3Stage;
let cat: S3Sprite;
let monitors: S3Monitors;
let who: S3Monitor;
let answer: S3Monitor;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

const MonitorId = {
    WHO : 'who',
    ANSER: 'answer',
}

Pg.preload = async function preload(this:S3PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic01 );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat01 );
    this.Image.load('./assets/blackCat.svg', Cat02 );
}
Pg.prepare = async function prepare() {

    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( Jurassic01 );
    // Chill を追加
    await stage.Sound.add( Chill );

    // スプライト(ネコ)を作る
    cat = new Lib.Sprite("cat");
    // コスチュームを追加
    await cat.Image.add( Cat01 );
    await cat.Image.add( Cat02 );

    // 変数モニター
    monitors = new Lib.Monitors();
    monitors.add(MonitorId.WHO, '誰が？');
    who = monitors.get(MonitorId.WHO);
    monitors.add(MonitorId.ANSER, '答え');
    answer = monitors.get(MonitorId.ANSER);

    who.text = '';
    answer.text = '';
    
    who.position = {x:-240, y:180};
    answer.position = {x:-240, y:150};
}

Pg.setting = async function setting() {

    /**
     * 旗を押されたときの動き
     * STARTメッセージを送る
     */
    cat.Event.whenFlag(async function*(this:S3Sprite){
        this.Looks.switchCostume(Cat01);
        await this.Looks.sayForSecs('ステージやネコをクリックすると質問をするよ',1);
        await this.Looks.sayForSecs('連続してクリックすると前回の質問応答の後に質問が続くよ',1);
        await this.Looks.sayForSecs('答えはコンソールへ出力するよ',1);
        this.Looks.say('');
        who.text = '';
        answer.text = '';
        // メッセージを送る
        this.Event.broadcast('START');
        // ずっと繰り返す
        for(;;){
            // 向きを +1 する
            this.Motion.Direction.degree += 1;
            yield;
        }
    });

    /**
     * STARTを受け取ったときの動き（ステージ） 
     */ 
    stage.Event.whenBroadcastReceived('START', async function*(this:S3Stage){
        // 音量 10
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 10);
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })

    /**
     * STARTを受け取ったときの動き（ステージ） 
     */ 
    stage.Event.whenBroadcastReceived('START', async function(this:S3Stage){
        // STARTを受け取ったら クリックの動きを始める
        this.Event.whenClicked(async function(this:S3Stage){
            who.text = 'ステージ';
            answer.text = '';
            const answerValue = await this.Sensing.askAndWait('ステージから質問をするよ');
            await this.Event.broadcastAndWait('ANSWER', answerValue, "ステージ");
        });
    });

    /**
     * STARTを受け取ったときの動き（ネコ） 
     */ 
    cat.Event.whenBroadcastReceived('START', async function(this:S3Sprite){
        // STARTを受け取ったら クリックの動きを始める
        this.Event.whenClicked(async function(this:S3Sprite){
            who.text = 'ネコ';
            answer.text = '';
            const answerValue = await this.Sensing.askAndWait('ネコから質問をするよ');
            await this.Event.broadcastAndWait('ANSWER', answerValue, "ネコ");
        });
    });

    /**
     * STARTを受け取ったときの動き（ネコ） 
     */ 
    cat.Event.whenBroadcastReceived('START', async function*(this:S3Sprite){
        this.Looks.switchCostume(Cat02);
        this.Looks.Size.w = -100;
        for(;;){
            for(const _ of Lib.Iterator(20)){
                this.Looks.Size.w += 10;
                if(this.Looks.Size.w < 0) {
                    this.Looks.switchCostume(Cat02);
                }else{
                    this.Looks.switchCostume(Cat01);
                }
                yield;
            }
            for(const _ of Lib.Iterator(20)){
                this.Looks.Size.w -= 10;
                if(this.Looks.Size.w < 0) {
                    this.Looks.switchCostume(Cat02);
                }else{
                    this.Looks.switchCostume(Cat01);
                }
                yield;
            }
            yield;
        }
    });
    
    /**
     * ANSWERを受け取ったときの動き（ネコ） 
     */ 
    cat.Event.whenBroadcastReceived('ANSWER', async function(this:S3Sprite, answerValue:string, from:string){
        // 1秒間、答えを考える。
        const message = `${from}の質問への答えは 『${answerValue}』でした`;
        console.log(message);
        answer.text = answerValue;
        await this.Looks.thinkForSecs(message, 1);
    });
}
