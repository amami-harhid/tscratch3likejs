import {Lib} from "../../../s3lib-importer";
import {Constants} from "./Constant";

export class StageEx extends Lib.Stage {

    /**
     * prepare stage
     */
    async prepare() {

        this.Image.add( Constants.Jurassic  );
        this.Image.add( Constants.Backdrop );
        this.Sound.add( Constants.Chill );
    
    }
    /**
     * setting stage
     */
    async setting() {
        // 旗を押されたときの動作
        // function() { } の中の this は、通常は外側のthisとは異なる
        // Tscratch3の仕組みでは function() {} のthisを 外側のthisをProxyで
        // 包んだインスタンスとしているため、内側thisでもStageExのメソッドを
        // 使うことができる。Typescriptの型として this : StageEx と
        // 教えてあげる必要があるので function(this:StageEx)としている。
        // これは引数として受け取っているわけではなく型を定義しているだけ。
        this.Event.whenFlag( async function(this:StageEx){
            // 背景を Jurassic とする
            this.Looks.Backdrop.name = Constants.Jurassic;
            // メッセージ START を送る
            this.Event.broadcast(Constants.Start);
            // メッセージは Stageで受け取っているが、スプライト側でも
            // 受け取ることができる。
        });
        /**
         * メッセージ(START)を受け取ったときの動き
         */
        this.Event.whenBroadcastReceived(Constants.Start, async function(this:StageEx){
            console.log('whenBroadcastReceived Start in StageEx')
            // 音量 10
            await this.Sound.setOption( Lib.SoundOption.VOLUME, 10 );
            // ピッチ 0
            await this.Sound.setOption( Lib.SoundOption.PITCH, 0 );
        });

        this.Event.whenKeyPressed('A', async function*(this:StageEx){
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield * this.chillLoop();
        });
    }
    async *chillLoop(){
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Constants.Chill);
            // メッセージを送る( NextBackdrop )
            console.log('メッセージを送る( NextBackdrop )')
            this.Event.broadcast(Constants.NextBackdrop);
            // 音量を5ずつ増やす
            await this.Sound.changeOptionValue(Lib.SoundOption.VOLUME, 5);
            // ピッチを5ずつ増やす
            await this.Sound.changeOptionValue(Lib.SoundOption.PITCH, 5);
            yield;
        }    
    }


}