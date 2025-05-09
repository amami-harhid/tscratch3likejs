import {Lib} from "../../../s3lib-importer";
import {Constants} from "./Constant";

export class StageEx extends Lib.Stage {
    async prepare(this:StageEx) {
        await this.Image.add( Constants.Jurassic  );
        await this.Image.add( Constants.Backdrop );
        await this.Sound.add( Constants.Chill );
        console.log(Constants.Chill);
    
    }
    setting() {

        this.Event.whenFlag( async function(this:StageEx){ 
            this.Looks.switchBackdrop(Constants.Jurassic);
            this.Event.broadcast('START');
        });
        /**
         * メッセージ(START)を受け取ったときの動き
         */
        this.Event.whenBroadcastReceived('START', async function*(this:StageEx){
            // 音量 100
            await this.Sound.setOption( Lib.SoundOption.VOLUME, 100 );
            await this.Sound.setOption( Lib.SoundOption.PITCH, 100 );
        });
        this.Event.whenKeyPressed('A', async function*(this:StageEx){
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield * this.chillLoop();
        });
    }
    async *chillLoop(this:StageEx){
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Constants.Chill);
            await this.Sound.changeOptionValue(Lib.SoundOption.VOLUME, 50);
            await this.Sound.changeOptionValue(Lib.SoundOption.PITCH, -5);
            yield;
        }    
    }

}