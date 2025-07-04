/**
 * sample23
 * ボールがパドルに触れたら跳ね返る
 */
//import {PlayGround, Library} from '../../build/index copy.js';
//const [Pg, Lib] = [PlayGround, Library]; // 短縮名にする
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【test02】スプライトがパドルに触れたら跳ね返る"

const NeonTunnel = "NeonTunnel";
const Chill = "Chill";
const BallA = "BallA";
const Paddle = "Paddle";
const Block = "Block";
const Line = "Line";
const Pew = "Pew";
const YouWon = "YouWon";
const GameOver = "GameOver";

let stage;
let ball, paddle, block, line;
let title;

let score = 0;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

Pg.preload = async function preload() {
    this.Image.load('../../assets/Neon Tunnel.png', NeonTunnel );
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill );
    this.Image.load(AssetHost+'/assets/cat.svg', BallA );
    this.Image.load('../../assets/Paddle.svg', Paddle );
    this.Image.load('../../assets/Button3-b.svg', Block );
    this.Image.load('../../assets/Line.svg', Line );
    this.Sound.load(AssetHost+'/assets/Pew.wav', Pew);
    this.Image.load('../../assets/YouWon.svg', YouWon );
    this.Image.load('../../assets/GameOver.svg', GameOver );
}
Pg.prepare = async function prepare() {
    stage = new Lib.Stage();
    stage.Image.set( NeonTunnel );
    stage.Sound.set( Chill );

    ball = new Lib.Sprite('ball');
    ball.Image.set( BallA );
    ball.Looks.Size.scale = {w: 50, h: 50};
    ball.Sensing.DragMode.draggable = false; //true;

    paddle = new Lib.Sprite("paddle");
    //paddle.visible = false;
    paddle.Image.set( Paddle );
    paddle.Motion.Move.toXY(0, -140);

    block = new Lib.Sprite( "block");
    block.Image.set( Block );
    block.Sound.add(Pew);
    block.Motion.Move.toXY(-220,-150);
    block.Looks.Size.scale = {w: 20,h: 20};
    block.Looks.hide();

    line = new Lib.Sprite( "line" );
    line.Image.set( Line );
    line.Motion.Move.toXY(0, -180);

    title = new Lib.Sprite("title");
    title.Image.set(YouWon);
    title.Image.set(GameOver);
    title.Looks.hide();
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    stage.Event.whenFlag(async function*(){
        this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function*(){
        this.Motion.Move.toXY(0,-100);
        this.Looks.Size.scale = {w: 100, h: 50};
    });
    
    const BallSpeed = 10;
    const InitDirection = 25;
    // メッセージ(Start)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('Start', async function*(){
        score = 0;
        this.Motion.Direction.degree = InitDirection;
        this.Motion.Move.toXY(0,-50);
        // フキダシを出す
        //this.Looks.say('パドルはマウスで動くよ。何かのキーを押すと始まるよ');
        // 何かキーが押されるまで待つ
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        // フキダシを消す
        //this.Looks.say('');
        for(;;){
            this.Motion.Move.steps(BallSpeed);
            this.Motion.Move.ifOnEdgeBounce();
            if(this.Sensing.isTouchingEdge()){
                const randomDegree = Lib.getRandomValueInRange(-25, 25);
                this.Motion.Direction.degree += randomDegree;    
            }
            yield;
        }
    });
    // メッセージ(Start)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('Start', async function*(){
        for(;;){
            this.Motion.Direction.degree +=1;
            if( this.Sensing.isTouchingToSprites([paddle])){
                this.Motion.Direction.degree += Lib.getRandomValueInRange(-2, 2)+180;
                this.Motion.Move.steps(BallSpeed*2);
                await this.Control.wait(0.2); // 0.2秒待つ
            }
            yield;
        }
    });
    // メッセージ(ballTouch)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('ballTouch', async function(){
        this.Motion.Direction.degree += Lib.getRandomValueInRange(-5, 5)+180;
    });
    // 緑の旗が押されたときの動作
    line.Event.whenFlag(async function*(){
        this.Motion.Move.toXY(0, -180);
        for(;;){
            if( this.Sensing.isTouchingToSprites([ball])){
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
    paddle.Event.whenFlag(async function(){
        this.Motion.Move.toXY(0, -140);
    })
    // メッセージ(Start)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('Start', async function*(){
        while(true){
            const mousePos = Lib.mousePosition;
            const selfPosition = this.Motion.Position.xy;
            this.Motion.Move.toXY(mousePos.x, selfPosition.y);
            yield;
        }
    });
    // メッセージ(GameOver)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('GameOver', async function(){
        this.Control.stopOtherScripts(this);
    });

    let blockCount = 0;
    // 緑の旗が押されたときの動作
    block.Event.whenFlag( async function*(){
        this.Control.removeAllClones();
        this.Looks.hide();
        this.Looks.Size.scale = {w:50, h:50};
        this.Motion.Move.toXY(-220,180);

        const pos = this.Motion.Position.xy;
        const dimension = this.Looks.Size.drawingSize;
        blockCount = 0;
        for(let y=0; y<3; y++){
            for(let x=0; x<10; x++){
                const blkPos = { x: pos.x + x*dimension.w, y: pos.y + (-y)*dimension.h };
                blockCount+=1;
                this.Control.clone({position: blkPos});
                yield;
            }
            yield;
        }        
        this.Event.broadcast('Start');
    });
    // クローンされたときの動作
    block.Control.whenCloned(async function*(){
        this.Looks.show();
        for(;;){
            if(this.Control.isAlive() && this.Sensing.isTouchingToSprites([ball])){
                //drawable.updateVisible(false);
                //this.update();
                score += 1;
                this.Event.broadcast('ballTouch');
                this.Sound.play(Pew);
                if(score == blockCount) {
                    this.Event.broadcast(YouWon);
                    this.Control.stopThisScript();
                }else{
                    this.Looks.hide();
                    break;
                }
            }
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    title.Event.whenFlag(async function(){
        this.Looks.hide();
    })
    // メッセージ(YouWon)を受け取ったときの動作
    title.Event.whenBroadcastReceived(YouWon, async function(){
        this.Looks.Costume.name = YouWon;
        this.Looks.show();
        Pg.Control.stopAll();
    });
    // メッセージ(GameOver)を受け取ったときの動作
    title.Event.whenBroadcastReceived(GameOver, async function(){
        this.Looks.Costume.name = GameOver;
        this.Looks.show();
        Pg.Control.stopAll();
    });

}