/**
 * 【06】Let's go home
 */
import {Pg, Lib} from '../../build/index.js';

import { Constant } from './sub/constants.js';

Pg.title = "おうちにかえろう"

//---------------------------------
// ステージ、スプライト変数の定義
//---------------------------------
/** ステージ */
let stage;
/** CAT */
let cat;

// --------------------------------
// 事前ロード処理
// --------------------------------
Pg.preload = async function preload( ) {
    this.Image.load( './assets/cat01.svg', Constant.Cat01 );
    this.Image.load( './assets/cat02.svg', Constant.Cat02 );
    this.Image.load( './assets/cat03.svg', Constant.Cat03 );
    this.Image.load( './assets/cat04.svg', Constant.Cat04 );
}

// --------------------------------
// 事前準備処理
// --------------------------------
Pg.prepare = async function prepare() {

    //----------------
    // ステージを作る
    //----------------
    stage = new Lib.Stage();

    //----------------
    // スプライトを作る
    //----------------
    cat = new Lib.Sprite('cat');
    cat.Image.add( Constant.Cat01 );
    cat.Image.add( Constant.Cat02 );
    cat.Image.add( Constant.Cat03 );
    cat.Image.add( Constant.Cat04 );

}

// --------------------------------
// イベント定義処理
// --------------------------------
Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作    
    stage.Event.whenFlag(async function*(){

    });

    // 緑の旗が押されたときの動作    
    cat.Event.whenFlag(async function*(){
        this.Looks.show();
        for(;;){
            this.Looks.Costume.next();
            await this.Control.wait(1);
            yield;
        }
    });

}
