/**
 * 【06】Let's go home
 */
import {Pg, Lib} from '../../build/index.js';
// import type { IPgMain as PgMain } from '@Type/pgMain';
// import type { IStage as Stage } from '@Type/stage'
// import type { ISprite as Sprite } from '@Type/sprite';

import { Constant } from './sub/constants.js';

Pg.title = "おうちにかえろう"

//---------------------------------
// ステージ、スプライト変数の定義
//---------------------------------
/** ステージ */
let stage;
/** 箱 */
let box1;
let box2;
/** お家 */
let house;
/** 犬 */
let dog;
/** ペン */
let pen;

// --------------------------------
// 事前ロード処理
// --------------------------------
Pg.preload = async function preload( ) {
    this.Image.load( './assets/box.svg', Constant.Box );
    this.Image.load( './assets/dog_a.svg', Constant.DogA );
    this.Image.load( './assets/dog_b.svg', Constant.DogB );
    this.Image.load( './assets/home.svg', Constant.House );
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
    // スプライト（犬）を作る
    //----------------
    dog = new Lib.Sprite('Dog');
    dog.Image.add( Constant.DogA );
    dog.Image.add( Constant.DogB );
    dog.Looks.hide();

    //----------------
    // スプライト（箱1）を作る
    //----------------
    box1 = new Lib.Sprite('box1');
    box1.Image.add( Constant.Box );
    box1.Looks.hide();

    //----------------
    // スプライト（箱2）を作る
    //----------------
    box2 = new Lib.Sprite('box2');
    box2.Image.add( Constant.Box );
    box2.Looks.hide();

    //----------------
    // スプライト（お家）を作る
    //----------------
    house = new Lib.Sprite('house');
    house.Image.add( Constant.House );
    house.Looks.hide();

    //----------------
    // スプライト（ペン）を作る
    //----------------
    pen = new Lib.Sprite('pen');
    //pen.Image.add( Constant.DogA );
    //pen.Looks.Effect.set( Lib.ImageEffective.GHOST, 50 );
}

// --------------------------------
// イベント定義処理
// --------------------------------
Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作    
    stage.Event.whenFlag(async function*(){

    });

    // 緑の旗が押されたときの動作    
    dog.Event.whenFlag(async function*(){
        this.Looks.hide();
        this.Motion.Position.xy = [-100, 180];
    });
    // 緑の旗が押されたときの動作    
    box1.Event.whenFlag(async function*(){
        this.Motion.Position.xy = [-160, -160];
        this.Looks.Size.scale = [100,150];
        this.Looks.show();
    });
    // 緑の旗が押されたときの動作    
    box2.Event.whenFlag(async function*(){
        this.Motion.Position.xy = [170, -170];
        this.Looks.Size.scale = [100,100];
        this.Looks.show();
    });

    // 緑の旗が押されたときの動作    
    house.Event.whenFlag(async function*(){
        this.Motion.Position.xy = [190, -30];
        this.Looks.Size.scale = [50,50];
        // 表示する
        this.Looks.show();
    });
    // 緑の旗が押されたときの動作    
    dog.Event.whenFlag(async function*(){
        this.Looks.Size.scale = [20,20];
        // 表示する
        this.Looks.hide();
        for(;;) {
            const x = Lib.randomInteger(-220, -170);
            this.Motion.Position.xy = [x, 170];
            await this.Control.wait( Lib.randomDecimal(1,3) );
            this.Control.clone();
            yield;
        }
    });
    dog.Control.whenCloned(async function*(){
        // 表示する
        this.Looks.show();
        for(;;) {
            if( this.Sensing.isTouchingToColor('#ff0019') || this.Sensing.isTouchingEdge()) {
                break;
            }
            this.Motion.Position.y -= 5;
            let touch = false;
            while(this.Sensing.isTouchingToSprites([box1,box2]) || this.Sensing.isTouchingToColor('#0000ff')){
                this.Motion.Position.y += 5;
                touch = true;
                console.log('----2')
                yield;
            }
            if(touch){
                this.Motion.Move.steps(5);
            }
            this.Looks.Costume.next();
            await this.Control.wait(0.1);
            yield;
        }

        this.Control.remove();
    });
    pen.Event.whenFlag(async function*(){
        this.Pen.prepare();
        this.Pen.Size.thickness = 2;
        for(;;) {
            this.Motion.Move.mousePosition();
            if(this.Sensing.isMouseDown()) {
                this.Pen.down();
    
            }else{
                this.Pen.up();
            }
            yield;
        }
    });
}
