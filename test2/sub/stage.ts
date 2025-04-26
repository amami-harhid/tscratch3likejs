import {Lib} from "../../s3lib-importer";
import type {S3Stage} from "../../types/scratchjs/s3Stage";
import {Constants} from "./Constant";

export class StageEx extends Lib.Stage {
    async prepare(this:S3Stage) {
        await this.Image.add( Constants.Jurassic  );
        await this.Image.add( Constants.Backdrop );
        await this.Sound.add( Constants.Chill );
    
    }
    setting(this:S3Stage) {

        this.Event.whenFlag( async function(){ 
            this.Looks.switchBackdrop(Constants.Jurassic);
            this.Event.broadcast('START');
        });
        /**
         * メッセージ(START)を受け取ったときの動き
         */
        this.Event.whenBroadcastReceived('START', async function*(){
            // 音量 100
            await this.Sound.setOption( Lib.SoundOption.VOLUME, 100 );
            await this.Sound.setOption( Lib.SoundOption.PITCH, 100 );
        });
        this.Event.whenKeyPressed('A', async function*(){
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield * this.chillLoop(Constants.Chill);
        });
    }
    async *chillLoop(this:S3Stage){
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Constants.Chill);
            await this.Sound.setOption(Lib.SoundOption.VOLUME, -10);
            await this.Sound.setOption(Lib.SoundOption.PITCH, 10);
            yield;
        }    
    }

}