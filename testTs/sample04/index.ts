import {Pg, Lib} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";

Pg.title = "【Sample04】 旗をクリックした後、ステージをクリック（タッチ）したら音を鳴らす";

const ImageNameJurassic = "Jurassic";
const Chill = "Chill";
let stage: Stage;

// 事前ロード処理
Pg.preload = async function(this:PgMain) {
    this.Image.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Jurassic.svg', ImageNameJurassic);
    this.Sound.load('https://amami-harhid.github.io/scratch3likejslib/web/assets/Chill.wav', Chill);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( ImageNameJurassic );
    await stage.Sound.add( Chill );
}
// イベント定義処理
Pg.setting = async function() {

    stage.Event.whenFlag( async function(this:Stage){
        // 音量20
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20)
    })

    // ステージをクリックしたときの動作
    // 追記：音が鳴っている最中に再度クリックしたときの
    // 動作に着目してください（前回のイベント=音を鳴らす)をキャンセルした
    // うえで音が鳴り始めます。
    stage.Event.whenClicked( async function*(this:Stage){
        // 「終わるまで音を鳴らす」をずっと繰り返す
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    
};