import {Lib} from "../../../s3lib-importer";
import { Constants } from "./Constant";

/**
 * Cat (SubClass) 
 */
export class Cat extends Lib.Sprite {
    private rotationDegree: number;
    private waitFlag: boolean;
    /**
     * @constructor
     */
    constructor(){
        super('Cat');
        this.rotationDegree = 0;
        this.waitFlag = false;
    }
    /**
     * setting
     */
    setting() {
        // this.Eventの thisは、Cat
        const isKeyADown = ()=>this.Sensing.isKeyDown('A');

        this.Event.whenFlag( async function(this:Cat) {
            this.Motion.Move.toXY(0, 0);
        });
        // メッセージ SAY を受け取ったときの動作
        this.Event.whenBroadcastReceived(Constants.Start, async function*(this:Cat){
            console.log('whenBroadcastReceived, Start in cat')
            // yield* とすることで generatorを実行できる
            // つまり 1000÷FPS 間隔で実行される。
            // function(this:Cat)の thisはProxy<Cat>インスタンスである。
            // これはTscratch3の仕組みによる。
            // イベントスレッド別に並行動作を実現させるためにProxyを使う。
            // Proxy<Cat>はCatとしてメソッドを代理実行できるため、thisをCat
            // インスタンスとしてみなしても利用上の問題は発生しない。
            yield * this.doActions();
        })
        this.Event.whenBroadcastReceived(Constants.NextBackdrop, async function(this:Cat){
            this.waitFlag = true;
        });
        // メッセージ(Jurassic)を受け取ったときの動作
        this.Event.whenBackdropSwitches(Constants.Jurassic, async function*(this:Cat){
            console.log('whenBackdropSwitches', Constants.Jurassic, ', in Cat');
            this.rotationDegree = 30;
            if(this.waitFlag === true){
                this.Looks.Bubble.say("");
                await this.Control.wait(1);
                this.Looks.Bubble.think("「待つ」を解除するには「A」キーを押してね");
                await this.Control.waitUntil(()=>isKeyADown());
            }
        });
        // メッセージ(Jurassic2)を受け取ったときの動作
        this.Event.whenBackdropSwitches(Constants.Jurassic2, async function(this:Cat){
            console.log('whenBackdropSwitches', Constants.Jurassic2, ', in Cat');
            this.rotationDegree = 5;
            if(this.waitFlag === true){
                this.Looks.Bubble.say("");
                await this.Control.wait(1);
                this.Looks.Bubble.think("「待つ」を解除するには「A」キーを押してね");
                await this.Control.waitUntil(()=>isKeyADown());
            }
        });
        // メッセージ(Backdrop)を受け取ったときの動作
        this.Event.whenBackdropSwitches(Constants.Backdrop, async function(this:Cat){
            console.log('whenBackdropSwitches', Constants.Backdrop, ', in Cat');
            this.rotationDegree = -5;
            if(this.waitFlag === true){
                this.Looks.Bubble.say("");
                await this.Control.wait(1);
                this.Looks.Bubble.think("「待つ」を解除するには「A」キーを押してね");
                await this.Control.waitUntil(()=>isKeyADown());
            }
        });

    }
    /**
     * Generator関数
     * 1000÷FPS 間隔で実行される
     */
    *doActions(){
        // ずっと繰り返す（ 1000/FPS ごとにyieldまで実行される）
        for(;;){
            // マウスカーソルへ向く
            this.Motion.Direction.degree += this.rotationDegree;
            yield;
        }    
    }
}

