import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";

Pg.title = "【Sample01】背景を表示する"

const Jurassic = "Jurassic";

let stage:S3Stage;

// 事前ロード処理
Pg.preload = function(this:S3PlayGround) {
    this.Image.load('../../assets/Jurassic.svg', Jurassic);
}

// 事前準備処理
Pg.prepare = async function() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
}

// イベント定義処理
Pg.setting = function() {
    
};
