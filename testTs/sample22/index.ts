import {Pg, Lib} from "../../s3lib-importer";
import type { PlayGround } from "@Type/playground";
import type { IStage as Stage } from "@Type/stage";
import type { ISprite as Sprite } from "@Type/sprite";
import type { TScale } from "@Type/common/typeCommon";

Pg.title = "【Sample22】スピーチ機能：「お話しを終わるまで待つ」を続ける"

const Jurassic:string = "Jurassic";
const Chill:string = "Chill";
const Cat:string = "Cat";

let stage: Stage;
let cat: Sprite;

const ASSETS_HOST = 'https://amami-harhid.github.io/scratch3likejslib/web';

Pg.preload = async function preload(this: PlayGround) {
    this.Image.load(`${ASSETS_HOST}/assets/Jurassic.svg`, Jurassic);
    this.Sound.load(`${ASSETS_HOST}/assets/Chill.wav`, Chill);
    this.Image.load(`${ASSETS_HOST}/assets/cat.svg`, Cat);
}

Pg.prepare = async function prepare(this:PlayGround) {
    stage = new Lib.Stage();
    await stage.Image.add( Jurassic );
    await stage.Sound.add( Chill );
    const scale: TScale = {w:200,h:200};
    cat = new Lib.Sprite("Cat", {scale: scale});//サイズを２倍にしています
    await cat.Image.add( Cat );
}

Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(this:Stage){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 20);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })
    
    // ネコにさわったらお話する
    cat.Event.whenFlag( async function*(this:Sprite){
        const NANINANI_TYPE = 'NANINANI';
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        this.TextToSpeech.setSpeechProperties(NANINANI_TYPE,properties,'male');
        while(true){
            if( this.Sensing.isMouseTouching() ) {
                this.Looks.Bubble.say(words);
                await this.Event.broadcastAndWait('SPEECH', words, NANINANI_TYPE);
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしている間、待つ」のコードが不要である。
                // await this.Control.waitWhile( ()=>this.Sensing.isMouseTouching()); 
            }else{
                this.Looks.Bubble.say(""); // フキダシを消す
            }
            yield;
        }
    });
    // ネコをクリックしたらお話する
    let catSpeeking = false;
    cat.Event.whenClicked(async function(this:Sprite){
        const SOKOSOKO = 'SOKOSOKO';
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500};
        this.TextToSpeech.setSpeechProperties(SOKOSOKO,properties,'female');
        if(catSpeeking === false){
            catSpeeking = true;
            await this.Event.broadcastAndWait('SPEECH', words, SOKOSOKO);
            catSpeeking = false;
        }
    });
    
    cat.Event.whenBroadcastReceived('SPEECH', 
        async function(this:Sprite, 
            words:string, 
            type: string
        ) {
            // speechAndWait に await をつけて、音声スピーチが終わるまで待つ。
            await this.TextToSpeech.speechAndWait(words, type);
        });

}