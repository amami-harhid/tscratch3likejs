import {Pg, Lib} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";

Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";

const Jurassic = "Jurassic";
const Chill = "Chill";

let stage:Stage;

// 事前ロード処理
Pg.preload = async function(this:PgMain) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../../assets/Chill.wav', Chill);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    stage.Image.add( Jurassic );
    stage.Sound.add( Chill );
}
// イベント定義処理
Pg.setting = async function() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function*(this:Stage){ 
        // 音量 = 50
        this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while(true){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
};
