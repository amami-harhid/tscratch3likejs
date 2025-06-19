/**
 * test of sample30
 * スプライトをドラッグする
 */
import {Pg, Lib, Env} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Sample30】スプライトをドラッグする(FPS=120)"

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

// FPS = 60に設定する(通常の２倍速)
Env.fps = 60;
/**  ステージ */
let stage: Stage;
/**  スプライト（ネコ）*/
let cat: Sprite;
/** 背景 Jurassic */
const Jurassic = 'Jurassic';
/** 音Chill */
const Chill = 'Chill';
/** コスチュームネコ */
const Cat = 'Cat';

Pg.preload = async function (this: PgMain) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic);
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill);
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
}
Pg.prepare = async function () {

    // ステージを作成
    stage = new Lib.Stage();
    // 背景追加
    stage.Sound.add(Chill);

    // スプライトネコを作成
    cat = new Lib.Sprite(Cat);
    // コスチューム追加
    cat.Image.add(Cat);
    // 大きさ
    cat.Looks.Size.scale = {w: 150, h:150};
}

Pg.setting = async function () {

    // ステージ：旗が押されたときの動作
    stage.Event.whenFlag(async function*(this:Stage){
        // ずっと繰り返す
        for(;;){
            // 終わるまで音を鳴らす（Chill)
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })

    // スプライト：旗が押されたときの動作
    cat.Event.whenFlag(async function*(this:Sprite){
        // 大きさ
        this.Looks.Size.scale = {w:150, h:150};
        // ドラッグ可能とする
        this.Sensing.DragMode.draggable = true;
        // ペン準備
        this.Pen.prepare();
        // ペン描画をクリア
        this.Pen.clear();
        // Pen Color(HSV)を設定する        
        this.Pen.HSVColor.hue = 200;            // 色相
        this.Pen.HSVColor.saturation = 90;      // 彩度
        this.Pen.HSVColor.brightness = 85;      // 明度
        this.Pen.HSVColor.transparency = 95;    // 透明度
        // ペンの太さ
        this.Pen.Size.thickness = 1500;
        // 幽霊の効果
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 40);
        // ペンを下す
        this.Pen.down();
        // ずっと繰り返す
        for(;;){
            // 向きを 5度ずつ回転( 右回り )
            this.Motion.Direction.degree += 5;
            // 色の効果を 1ずつ変える
            this.Looks.Effect.change(Lib.ImageEffective.COLOR,1);
            this.Motion.Move.steps(5);
            this.Motion.Move.ifOnEdgeBounce();
            // スタンプをとる
            this.Pen.stamp();
            this.Pen.down();
            yield;
        }

    });

}
