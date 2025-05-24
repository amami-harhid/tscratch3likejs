/**
 * Sample21
 * Scratch3 スピーチの実験
 * 
 * Scratch3のスピーチは 次の仕組みです
 * 
 * https://github.com/scratchfoundation/scratch-vm/blob/develop/src/extensions/scratch3_text2speech/index.js#L742
 *
 * (1) URL を組み立てる
 * (2) fetchして音をGETする
 * (3) 音を soundPlayer に食わせて
 * (4) ピッチや音量を与えて 再生する
 * (5) soundPlayer.play() の中で stop を EMIT している。それを受けて SoundPlayerをdeleteしている。
 * 
 * ■ ja-JP, male, あいうえお 
 * https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=male&text=%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A
 * 
 */

import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";


Pg.title = "【Sample21】スピーチ機能：ネコに触る、タッチするとお話しをする"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: S3Stage;
let cat: S3Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

Pg.preload = async function preload(this: S3PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}

Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    cat = new Lib.Sprite("Cat");
    await cat.Image.add( Cat );
}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*( this: S3Stage ){

        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20 )
        while(true){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })
    
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function*( this: S3Sprite ){
        const OTTO_TYPE = 'OTTO';
        const words = `おっと`;
        const properties = {'pitch': 2, 'volume': 100}
        this.TextToSpeech.setSpeechProperties(OTTO_TYPE, properties, 'male');
        while(true){
            if( this.Sensing.isMouseTouching() ) {
                this.Event.broadcast('SPEAK', words, OTTO_TYPE);
                
                // 「送って待つ」ではないので次のループに進ませないように、
                // 「マウスタッチしない迄待つ」をする。
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching() ); 
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    cat.Event.whenClicked(async function( this: S3Sprite ){
        const SOKOSOKO_TYPE = "SOKOSOKO";
        const words = `そこそこ`;
        const properties = {'pitch': 1.7, 'volume': 500}
        this.TextToSpeech.setSpeechProperties(SOKOSOKO_TYPE, properties, 'female', 'ja-JP');
        this.Event.broadcast('SPEAK', words, SOKOSOKO_TYPE);
    });
    
    /** SPEAK を受信したらスピーチする */
    cat.Event.whenBroadcastReceived('SPEAK', 
        async function(this:S3Sprite, 
            words:string, 
            type: string
        ) {
            this.TextToSpeech.speech(words, type);

        });
}