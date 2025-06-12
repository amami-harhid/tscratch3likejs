/**
 * test of sample29
 * クラス定義のサンプル（StageEx,Catクラス定義) 
 */
import {Pg} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";

import {StageEx} from './sub/stage';
import {Cat} from './sub/cat';

Pg.title = "【Sample29】クラス定義のサンプル"

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
import {Constants} from './sub/Constant';

/**
 * Stage Extra class
 */
let stage: StageEx;
/**
 * Cat Sprite Class
 */
let cat: Cat;

Pg.preload = async function (this:PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Constants.Jurassic);
    this.Image.load(AssetHost+'/assets/backdrop.png', Constants.Backdrop);
    this.Sound.load(AssetHost+'/assets/Chill.wav', Constants.Chill);
    this.Image.load(AssetHost+'/assets/cat.svg', Constants.Cat01 );
}
Pg.prepare = async function () {
    // create instance
    stage = new StageEx();
    // execute stage prepare
    await stage.prepare();

    // create instance
    cat = new Cat();
    // execute stage prepare
    await cat.Image.add( Constants.Cat01 );
}

Pg.setting = async function () {

    stage.setting();
    cat.setting();

}
