import {Lib} from "../../../s3lib-importer";
import { Constants } from "./Constant";

/**
 * Cat (SubClass) 
 */
export class Cat extends Lib.Sprite {
    private rotationDegree: number;
    /**
     * @constructor
     */
    constructor(){
        super('Cat');
        this.rotationDegree = 0;

    }
    /**
     * setting
     */
    setting() {
        // this.Eventの thisは、Cat
        this.Event.whenFlag( async function(this:Cat) {
            this.Motion.Move.toXY(0, 0);
        });
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
        // メッセージ(次の背景)を受け取ったときの動作
        this.Event.whenBroadcastReceived(Constants.NextBackdrop, async function(this:Cat){
            console.log('nextBackdrop, in Cat');
            this.Looks.Backdrop.next();
        });
        // 背景がBackdrop になったときの動作
        this.Event.whenBackdropSwitches(Constants.Backdrop, async function(this:Cat){
            this.rotationDegree = 5;
            this.Looks.Size.scale = {w: 200, h:100};
        });
        // 背景がBackdrop になったときの動作
        this.Event.whenBackdropSwitches(Constants.Jurassic, async function(this:Cat){
            this.rotationDegree = -5;            
            this.Looks.Size.scale = {w: 100, h:200};
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

