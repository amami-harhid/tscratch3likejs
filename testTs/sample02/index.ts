import {Pg, Lib} from "../../s3lib-importer";
import type {IPlayGround as PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";

Pg.title = "【Sample02】旗クリックで背景を表示する";

const White = "White";
const Jurassic = "Jurassic";

let stage:Stage;

// 事前ロード処理
Pg.preload = async function(this:PlayGround) {
    this.Image.load('./assets/white.svg', White);
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}
// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( White );
    await stage.Image.add( Jurassic );
    stage.Looks.Backdrop.name = White;
}
// イベント定義処理
Pg.setting = async function() {
    
    // 旗が押されたときの動作(ステージ)
    stage.Event.whenFlag( async function(this:Stage){
        this.Looks.Backdrop.name = Jurassic;
    });
};