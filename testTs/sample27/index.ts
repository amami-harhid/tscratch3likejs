/**
 * sample27
 * ネコが色にさわったらスコアアップ、
 * 変数モニターを表示する
 */
import {Pg, Lib} from "../../s3lib-importer";
import type { PlayGround } from "@Type/playground";
import type { IStage as Stage } from "@Type/stage";
import type { ISprite as Sprite } from "@Type/sprite";
import type {IMonitors as Monitors} from "@Type/monitors";
import type {IMonitor as Monitor} from "@Type/monitors/monitor";

Pg.title = "【Sample27】色に触れたときカウントアップ ※雲(薄い水色), 植物(オレンジ色)"

const Jurassic01:string = "Jurassic01";
const Chill:string = "Chill";
const Rip:string = "Rip";
const Cat01:string = "Cat01";
const Cat02:string = "Cat02";
const MonitorNameSCORE:string = 'SCORE';
const MonitorNameSecond:string = 'Seconds';

let stage: Stage;
let cat: Sprite
let monitors: Monitors;
let score: Monitor;
let seconds: Monitor;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this:PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic01 );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', Cat01 );
    this.Image.load(AssetHost+'/assets/cat2.svg', Cat02 );
    this.Sound.load('../../assets/Rip.wav', Rip );
}
Pg.prepare = async function prepare() {

    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add( Jurassic01 );
    // Chill を追加
    await stage.Sound.add( Chill );

    // スプライト(ball)を作る
    cat = new Lib.Sprite("cat");
    // コスチュームを追加
    await cat.Image.add( Cat01 );
    await cat.Image.add( Cat02 );
    await cat.Sound.add( Rip );

    monitors = new Lib.Monitors();
    monitors.add(MonitorNameSCORE, 'スコア');
    score = monitors.get(MonitorNameSCORE);
    score.position = {x:-240, y:180};
    score.value = 0;

    monitors.add(MonitorNameSecond, '秒数');
    seconds = monitors.get(MonitorNameSecond);
    seconds.position = {x:-240, y:150};
    seconds.value = 0;

}

Pg.setting = async function setting() {

    /**
     * 旗を押されたときの動き
     * STARTメッセージを送る
     */
    stage.Event.whenFlag(async function(this:Stage){
        // メッセージを送る
        this.Event.broadcast('START');
    });

    /**
     * メッセージ(START)を受け取ったときの動き
     */
    stage.Event.whenBroadcastReceived('START', async function*(this:Stage){
        // ずっと繰り返す
        for(;;){
            // 1秒待つ
            await this.Control.wait(1.0);
            seconds.value += 1;
            yield;
        }
    })
    
    /**
     * メッセージ(START)を受け取ったときの動き
     */
    stage.Event.whenBroadcastReceived('START', async function*(this:Stage){
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
     * メッセージ(START)を受け取ったときの動き
     * マウスカーソルへ向かって進む
     */
    cat.Event.whenBroadcastReceived('START', async function*(this:Sprite){
        this.Sensing.resetTimer();
        // ずっと繰り返し、マウスカーソルへ向いて進む
        for(;;){
            // マウスカーソルへ向く
            this.Motion.Point.toMouse();
            // 進む
            this.Motion.Move.steps(5);
            // 現在座標を取得してログ出力
            const {x,y} = this.Motion.Position.xy;
            const mx = this.Sensing.Mouse.x;
            const my = this.Sensing.Mouse.y;
            console.log(`x=${x}, y=${y}, mx=${mx},my=${my}`);
            if(this.Sensing.isMouseDown()) {
                const timer = this.Sensing.timer;
                console.log('マウスダウン検出 timer='+timer);
                //break;
            }
            yield;
        }
    });

    /**
     * メッセージ(START)を受け取ったときの動き
     * 色に触れたらスコアアップする
     */
    cat.Event.whenBroadcastReceived('START', async function*(this:Sprite){
        const ColorCloud = '#aadcdc'; // 雲の色、薄い水色 
        const ColorPlantOrange = '#e6781e';// オレンジ色の植物
        // ずっと繰り返す
        for(;;){
            // オレンジの植物の色にふれたとき
            if(await this.Sensing.isTouchingToColor(ColorPlantOrange)){
                this.Sensing.resetTimer();
                //カウントアップ
                score.value += 1;
                // 音を鳴らす
                this.Sound.play( Rip );
                // オレンジの植物の色にふれている間、待つ
                while(await this.Sensing.isTouchingToColor(ColorPlantOrange)){
                    yield;
                }
            }
            // 雲の色にふれたとき
            if(await this.Sensing.isTouchingToColor(ColorCloud)){
                this.Sensing.resetTimer();
                //カウントアップ
                score.value += 1;
                // 音を鳴らす
                this.Sound.play( Rip );
                // 雲の色にふれている間、待つ
                while(await this.Sensing.isTouchingToColor(ColorCloud)){
                    yield;
                }
            }
            yield;
        }
    });

}
