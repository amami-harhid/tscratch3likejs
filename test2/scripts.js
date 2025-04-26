/**
 * test of sample26
 * 質問を出す
 */

import {PlayGround} from '../../../build/index.js'
const [Pg] = [PlayGround]; // 短縮名にする

import {StageEx} from './sub/stage';
import {Cat} from './sub/cat';

Pg.title = "【Sample26】質問をする"

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
import {Constants} from './sub/Constant';

let stage;
let cat;

Pg.preload = async function () {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Constants.Jurassic);
    this.Image.load(AssetHost+'/assets/backdrop.png', Constants.Backdrop);
    this.Sound.load(AssetHost+'/assets/Chill.wav', Constants.Chill);
    this.Image.load(AssetHost+'/assets/cat.svg', Constants.Cat01 );
}
Pg.prepare = async function () {

    stage = new StageEx();
    await stage.prepare();
    cat = new Cat();
    await cat.Image.add( Constants.Cat01 );

}

Pg.setting = async function () {

    stage.setting();
    cat.setting();
    

}
