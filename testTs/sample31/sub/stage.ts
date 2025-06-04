import {Lib} from "../../../s3lib-importer";
import {Constants} from "./Constant";

export class StageEx extends Lib.Stage {

    /**
     * prepare stage
     */
    async prepare() {

        await this.Image.add( Constants.Jurassic  );
        await this.Image.add( Constants.Jurassic2  );
        await this.Image.add( Constants.Backdrop );
        await this.Sound.add( Constants.Chill );
    
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
        this.Event.whenBroadcastReceived(Constants.Start, async function*(this:StageEx){
            console.log('whenBroadcastReceived Start in StageEx');
            await this.Event.broadcastAndWait(Constants.Say,"背景をモザイクにするよ",0.5);
            // モザイク
            this.Looks.Effect.set(Lib.ImageEffective.MOSAIC, 50);

            console.log('change next backdrop ')
            // ずっと繰り返す
            await this.Event.broadcastAndWait(Constants.Say,"３回「次の背景」にするよ",1);
            for(const _ of Lib.Iterator(3)){
                // 次の背景を変える(待たない)
                this.Looks.Backdrop.next();
                await this.Control.wait(0.5);
            }
            // 効果をクリア
            this.Looks.Effect.clear();
            await this.Event.broadcastAndWait(Constants.Say,"背景を魚眼にするよ",0.5);
            // 魚眼効果
            this.Looks.Effect.set(Lib.ImageEffective.FISHEYE, 100);
            // ずっと繰り返す
            console.log('change previous backdrop ')
            await this.Event.broadcastAndWait(Constants.Say,"３回「前の背景」にするよ",1);
            for(const _ of Lib.Iterator(3)){
                // 前の背景を変える(待たない)
                this.Looks.Backdrop.previous();
                await this.Control.wait(0.5);
            }
            // 効果をクリア
            this.Looks.Effect.clear();
            await this.Event.broadcastAndWait(Constants.Say,"背景の色の効果を変えるよ",0.5);
            // 色の効果
            this.Looks.Effect.set(Lib.ImageEffective.COLOR, 50);
            // ずっと繰り返す
            console.log('change random backdrop ')
            await this.Event.broadcastAndWait(Constants.Say,"５回「どれかの背景」にするよ",1);
            for(const _ of Lib.Iterator(5)){
                // 前の背景を変える(待たない)
                this.Looks.Backdrop.random();
                await this.Control.wait(0.5);
            }

            this.Event.broadcast(Constants.NextBackdrop );
            // 効果をクリア
            this.Looks.Effect.clear();
            await this.Event.broadcastAndWait(Constants.Say,"背景をピクセルにするよ",0.5);
            // ピクセル効果
            this.Looks.Effect.set(Lib.ImageEffective.PIXELATE, 50);
            console.log('change next backdrop and Wait ')
            await this.Event.broadcastAndWait(Constants.Say,"３回「次の背景」にして待つよ",1);
            for(const _ of Lib.Iterator(3)){
                // 次の背景を変える(待つ)
                await this.Looks.Backdrop.nextAndWait();
                console.log('exit nextAndWait');
                await this.Control.wait(0.5);
            }
            // 効果をクリア
            this.Looks.Effect.clear();
            await this.Event.broadcastAndWait(Constants.Say,"背景を渦巻きにするよ",0.5);
            // 渦巻きの効果
            this.Looks.Effect.set(Lib.ImageEffective.WHIRL, 50);
            // ずっと繰り返す
            console.log('change previous backdrop ')
            await this.Event.broadcastAndWait(Constants.Say,"３回「前の背景」にして待つよ",1);
            for(const _ of Lib.Iterator(3)){
                // 前の背景を変える(待つ)
                await this.Looks.Backdrop.previousAndWait();
                console.log('exit previousAndWait');
                await this.Control.wait(0.5);
            }
            // 効果をクリア
            this.Looks.Effect.clear();
            await this.Event.broadcastAndWait(Constants.Say,"背景に幽霊効果をつけるよ",0.5);
            // 幽霊の効果
            this.Looks.Effect.set(Lib.ImageEffective.GHOST, 50);
            // ずっと繰り返す
            console.log('change random backdrop ')
            await this.Event.broadcastAndWait(Constants.Say,"５回「どれかの背景」にして待つよ",1);
            for(const _ of Lib.Iterator(5)){
                // どれかの背景を変える(待つ)
                await this.Looks.Backdrop.randomAndWait();
                console.log('exit randomAndWait');
                await this.Control.wait(0.5);
            }
            await this.Event.broadcastAndWait(Constants.Say,"全てを停止するよ",1);
            console.log('==== stopAll ====')
            this.Control.stopAll();

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

        this.Event.whenKeyPressed('M', async function*(this:StageEx){
            // 「終わるまで音を鳴らす」をずっと繰り返す
            yield * this.chillLoop();
        });

    }
    async *chillLoop(){
        for(;;){
            // 処理が終わるまで待つために await をつける
            await this.Sound.playUntilDone(Constants.Chill);
            // 音量を5ずつ増やす
            await this.Sound.changeOptionValue(Lib.SoundOption.VOLUME, 5);
            // ピッチを5ずつ増やす
            await this.Sound.changeOptionValue(Lib.SoundOption.PITCH, 5);
            yield;
        }    
    }


}