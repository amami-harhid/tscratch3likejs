import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";

Pg.title = "【Sample01】背景を表示する"

const Jurassic = "Jurassic";

let stage:Stage;

// 事前ロード処理
Pg.preload = async function(this:PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}

// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
}

// イベント定義処理
Pg.setting = async function() {
    
};
