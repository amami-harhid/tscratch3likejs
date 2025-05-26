/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";


Pg.title = "【Sample23】ボールがパドルに触れたら跳ね返る"

const NeonTunnel:string = "NeonTunnel";
const Chill:string = "Chill";
const BallA:string = "BallA";
const Paddle:string = "Paddle";
const Block:string = "Block";
const Line:string = "Line";
const Pew: string = "Pew";
const YouWon: string = "YouWon";
const GameOver: string = "GameOver";

let stage: Stage;
let ball: Sprite, paddle: Sprite, block:Sprite, line:Sprite;
let title: Sprite;

let score = 0;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload(this:PlayGround) {
    this.Image.load('../../assets/Neon Tunnel.png', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/ball-a.svg', BallA );
    this.Image.load('../../assets/Paddle.svg', Paddle );
    this.Image.load('../../assets/Button3-b.svg', Block );
    this.Image.load('../../assets/Line.svg', Line );
    this.Sound.load(AssetHost+'/assets/Pew.wav', Pew);
    this.Image.load('../../assets/YouWon.svg', YouWon );
    this.Image.load('../../assets/GameOver.svg', GameOver );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    await stage.Image.add( NeonTunnel );
    await stage.Sound.add( Chill );
    ball = new Lib.Sprite();
    await ball.Image.add( BallA );
    //ball.Motion.setXY(0,-100);
    ball.Looks.Size.scale = {w: 50, h: 50};

    paddle = new Lib.Sprite("paddle");
    await paddle.Image.add( Paddle );
    paddle.Motion.gotoXY(0, -140);
    block = new Lib.Sprite( "block");
    block.Looks.hide();
    await block.Image.add( Block );
    await block.Sound.add(Pew);
    block.Motion.gotoXY(-220,180);
    line = new Lib.Sprite( "line" );
    await line.Image.add( Line );
    line.Motion.gotoXY(0, -180);
    title = new Lib.Sprite("title");
    await title.Image.add(YouWon);
    await title.Image.add(GameOver);
    title.Looks.hide();
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    stage.Event.whenFlag(async function*(this:Stage){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function(this:Sprite){
        this.Motion.gotoXY(0,-100);
        this.Looks.Size.scale = {w: 50, h: 50};
    });
    
    const BallSpeed = 10;
    const InitDirection = 25;
    // メッセージ(Start)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('Start', async function*(this:Sprite){
        score = 0;
        this.Sensing.DragMode.draggable = true;
        this.Motion.pointInDirection(InitDirection);
        this.Motion.gotoXY(0,-100);
        // フキダシを出す
        await this.Looks.sayForSecs('パドルはマウスで動くよ。', 1);
        await this.Looks.sayForSecs('ボールはドラッグして位置を変更できるよ', 1);
        await this.Looks.sayForSecs('何かのキーを押すと始まるよ', 1);
        // 何かキーが押されるまで待つ
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        this.Sensing.DragMode.draggable = false;
        // フキダシを消す
        this.Looks.say('');
        for(;;){
            this.Motion.moveSteps(BallSpeed);
            this.Motion.ifOnEdgeBounds();
            if(this.Sensing.isTouchingEdge()){
                const randomDegree = Lib.getRandomValueInRange(-25, 25);
                this.Motion.turnRightDegrees(randomDegree);    
            }
            yield;
        }
    });
    // メッセージ(Start)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('Start', async function*(this:Sprite){
        for(;;){
            // パドルに触れたとき跳ね返る
            if( this.Sensing.isTouchingToSprite(paddle)){
                const degree = this.Motion.Direction.degree;
                const paddleDemensions = paddle.Looks.drawingDimensions();
                const paddleLimitWidth = paddleDemensions.width * 0.3;
                const paddleX = paddle.Motion.Position.x;
                const ballX = this.Motion.Position.x;
                if(ballX < (paddleX - paddleLimitWidth)){
                    this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-30, -15) -degree );
                }else if((paddleX+paddleLimitWidth)<ballX){
                    this.Motion.turnRightDegrees( Lib.getRandomValueInRange(15, 30) -degree );
                }else{
                    this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-15, 15) -degree );
                }
                this.Motion.moveSteps(BallSpeed*2);
                await this.Control.wait(0.2); // 0.2秒待つ
            }
            yield;
        }
    });
    // メッセージ(ballTouch)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('ballTouch', async function(this:Sprite){
        this.Motion.turnRightDegrees( Lib.getRandomValueInRange(-5, 5)+180 );
    });
    // 緑の旗が押されたときの動作
    line.Event.whenFlag(async function*(this:Sprite){
        this.Motion.gotoXY(0, -180);
        for(;;){
            if( this.Sensing.isTouchingToSprite(ball)){
                // Ball に触れたとき
                this.Event.broadcast(GameOver);
                // このスクリプトを止める
                this.Control.stopThisScript();
                break;
            }
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    paddle.Event.whenFlag(async function(this:Sprite){
        this.Motion.gotoXY(0, -140);
    })
    // メッセージ(Start)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('Start', async function*(this:Sprite){
        for(;;){
            const mousePos = Lib.mousePosition;
            const selfPosition = this.Motion.getCurrentPosition();
            this.Motion.gotoXY(mousePos.x, selfPosition.y);
            yield;
        }
    });
    // メッセージ(GameOver)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('GameOver', async function(this:Sprite){
        this.Control.stopOtherScripts();
    });

    let blockCount = 0;
    // 緑の旗が押されたときの動作
    block.Event.whenFlag( async function*(this:Sprite){
        // blockのクローンを全て削除(旗クリックを再度行うときにキレイな状態で始めるため)
        this.Control.removeAllClones();
        this.Looks.hide();
        this.Looks.Size.scale = {w: 50, h: 50};
        this.Motion.gotoXY(-220,180);

        const pos = this.Motion.getCurrentPosition();
        const dimension = this.Looks.drawingDimensions();
        blockCount = 0;
        for(let y=0; y<3; y++){
            for(let x=0; x<10; x++){
                const blkPos = { x: pos.x + x*dimension.width, y: pos.y + (-y)*dimension.height };
                blockCount+=1;
                this.Control.clone({position: blkPos});
                yield;
            }
            yield;
        }        
        this.Event.broadcast('Start');
    });
    // クローンされたときの動作
    block.Control.whenCloned(async function*(this:Sprite){
        this.Looks.show();
        for(;;){
            if(this.Sensing.isTouchingToSprite(ball)){
                score += 1;
                this.Event.broadcast('ballTouch');
                this.Sound.play(Pew);
                this.Looks.hide();
                if(score == blockCount) {
                    this.Event.broadcast(YouWon);
                }
                break;
            }    
            yield;
        }
        await this.Control.wait(0.5);
        this.Control.remove();
    });
    // 緑の旗が押されたときの動作
    title.Event.whenFlag(async function(this:Sprite){
        this.Looks.hide();
    })
    // メッセージ(YouWon)を受け取ったときの動作
    title.Event.whenBroadcastReceived(YouWon, async function(this:Sprite){
        this.Looks.switchCostume(YouWon);
        this.Looks.show();
        Pg.Control.stopAll();
    });
    // メッセージ(GameOver)を受け取ったときの動作
    title.Event.whenBroadcastReceived(GameOver, async function(this:Sprite){
        this.Looks.switchCostume(GameOver);
        this.Looks.show();
        Pg.Control.stopAll();
    });

}