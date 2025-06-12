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
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";


Pg.title = "【Sample21】スピーチ機能：ネコに触る、タッチするとお話しをする"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: Stage;
let cat: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

Pg.preload = async function preload(this: PgMain) {
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

    stage.Event.whenFlag(async function*( this: Stage ){

        await this.Sound.setOption( Lib.SoundOption.VOLUME, 20 )
        while(true){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })
    
    type SpeechProp = {
        type: string,
        words: string,
        properties: {pitch:number, volume:number},
        gender: 'male'|'female',
        locale: 'ja-JP',
    }
    const OTTO:SpeechProp = {
        type: 'OTTO', 
        words: `おっと`,
        properties:{
            'pitch': 2, 
            'volume': 100
        }, 
        gender:'male',
        locale:'ja-JP'
    };
    const SOKOSOKO:SpeechProp = {
        type: 'SOKOSOKO', 
        words: `そこそこ`,
        properties:{
            'pitch': 1.7, 
            'volume': 500
        }, 
        gender:'female',
        locale:'ja-JP'
    };

    cat.Event.whenFlag( async function(this: Sprite){
        const p1 = OTTO;
        this.TextToSpeech.setSpeechProperties(p1.type,p1.properties,p1.gender,p1.locale);
        const p2 = SOKOSOKO;
        this.TextToSpeech.setSpeechProperties(p2.type,p2.properties,p2.gender,p2.locale);
    })
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function*( this: Sprite ){
        while(true){
            if( this.Sensing.isMouseTouching() ) {
                this.Event.broadcast('SPEAK', OTTO);
                
                // 「送って待つ」ではないので次のループに進ませないように、
                // 「マウスタッチしない迄待つ」をする。
                await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching() ); 
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    cat.Event.whenClicked(async function( this: Sprite ){
        this.Event.broadcast('SPEAK', SOKOSOKO);
    });
    
    /** SPEAK を受信したらスピーチする */
    cat.Event.whenBroadcastReceived('SPEAK', async function(this:Sprite, prop: SpeechProp) {
        this.TextToSpeech.speech(prop.words, prop.type);
    });
}