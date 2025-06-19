/**
 * sample25
 * 背景を１秒ごとに切り替える
 */
import {Pg, Lib} from "../../s3lib-importer";
import type { IPgMain as PgMain } from "@Type/pgMain";
import type { IStage as Stage } from "@Type/stage";
import type { ISprite as Sprite } from "@Type/sprite";


Pg.title = "【Sample25】背景を１秒ごとに切り替える"

const Jurassic01 = "Jurassic01";
const Jurassic02 = "Jurassic02";
const Chill:string = "Chill";
const BallA:string = "BallA";

let stage: Stage;
let ball: Sprite

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this: PgMain) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic01 );
    this.Image.load('../../assets/Jurassic2.svg', Jurassic02 );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/ball-a.svg', BallA );
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add( Jurassic01 );
    stage.Image.add( Jurassic02 );
    stage.Looks.Backdrop.name = Jurassic01;
    // Chill を追加
    stage.Sound.add( Chill );

    // スプライト(ball)を作る
    ball = new Lib.Sprite("ball");
    // コスチュームを追加
    ball.Image.add( BallA );
    // 大きさを 横120%,縦120% にする
    ball.Looks.Size.scale = {w: 120, h: 120};

}

Pg.setting = async function setting() {

    /**
     * 旗を押されたときの動作
     * 音を追加して、STARTメッセージを送る
     */
    stage.Event.whenFlag(async function(this:Stage){
        this.Looks.Backdrop.name = Jurassic01;
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });

    /**
     * START を受け取ったときの動作
     * ずっと繰返し音を鳴らす
     */
    stage.Event.whenBroadcastReceived('START', async function*(this:Stage){
        // ずっと繰り返し、１秒ごとに背景を切り替える
        for(;;){

            await this.Control.wait(1);
            this.Looks.Backdrop.next();
            yield;
        }
    });

    /**
     * START を受け取ったときの動作
     * ずっと繰返し音を鳴らす
     */
    stage.Event.whenBroadcastReceived('START', async function*(this:Stage){

        // 音量を 5にする
        this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        // ずっと繰り返す
        for(;;){
            // 終わるまで鳴らす
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function(this:Sprite){
        this.Motion.Move.toXY( 0, 0 );
        this.Looks.Size.scale = {w: 120, h: 120};
    });

    /**
     * START を受け取ったときの動作
     * 上下に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function*(this:Sprite){
        
        // 上に5回移動
        for(const _ of Lib.Iterator(5)){
            this.Motion.Position.y += 10;
            yield;
        }
        // ずっと繰り返す
        for(;;){
            // 下に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.Position.y -= 10;
                yield;
            }
            // 上に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.Position.y += 10;
                yield;
            }
            yield;
        }
    });
    /**
     * START を受け取ったときの動作
     * 左右に動かす
     */
    ball.Event.whenBroadcastReceived('START', async function*(this:Sprite){
        
        // 右に5回移動
        for(const _ of Lib.Iterator(5)){
            this.Motion.Position.x += 10;
            yield;
        }
        // ずっと繰り返す
        for(;;){
            // 左に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.Position.x -= 10;
                yield;
            }
            // 右に10回移動
            for(const _ of Lib.Iterator(10)){
                this.Motion.Position.x += 10;
                yield;
            }
            yield;
        }
    });
    

}
