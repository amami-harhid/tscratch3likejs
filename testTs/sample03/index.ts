import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";

Pg.title = "【Sample03】旗クリックでずっと『終わるまで音を鳴らす』を繰り返す";

const Jurassic = "Jurassic";
const Chill = "Chill";

let stage:S3Stage;

// 事前ロード処理
Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
    this.Sound.load('../../assets/Chill.wav', Chill);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
}
// イベント定義処理
Pg.setting = function() {

    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function*(this:S3Stage){ 
        // 音量 = 50
        await this.Sound.setOption( Lib.SoundOption.VOLUME, 50);
        // 「終わるまで音を鳴らす」をずっと繰り返す
        while(true){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
};
