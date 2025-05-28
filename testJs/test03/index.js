/**
 * test03
 * スプライトをIMGタグにする
 */
import {Pg, Lib} from '../../build/index.js';

Pg.title = "【Test03】スプライトをイメージタグにする"

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
    // const renderer = Pg.render.renderer;
    // const drawThese = renderer._drawThese;
    // renderer._drawThese = function(drawables, drawMode, projection, opts) {
    //     const Silhouette = 'silhouette';
    //     drawThese.bind(renderer)(drawables, Silhouette, projection, opts);
    // };
 

    stage = new Lib.Stage();
    await stage.Image.add( NeonTunnel );
    await stage.Sound.add( Chill );

    ball = new Lib.Sprite('ball');
    await ball.Image.add( BallA );
    ball.Looks.Size.scale = {w: 50, h: 150};
    ball.Sensing.DragMode.draggable = true;

    paddle = new Lib.Sprite("paddle");
    //paddle.visible = false;
    await paddle.Image.add( Paddle );
    paddle.Motion.Move.gotoXY(0, -140);

    block = new Lib.Sprite( "block");
    await block.Image.add( Block );
    await block.Sound.add(Pew);
    block.Motion.Move.gotoXY(-220,-150);
    block.Looks.Size.scale = {w: 20, h: 20};
    block.Looks.hide();

    line = new Lib.Sprite( "line" );
    await line.Image.add( Line );
    line.Motion.Move.gotoXY(0, -180);

    title = new Lib.Sprite("title");
    await title.Image.add(YouWon);
    await title.Image.add(GameOver);
    title.Looks.hide();
}

Pg.setting = async function setting() {
    // 緑の旗が押されたときの動作
    stage.Event.whenFlag(async function*(){
        await this.Sound.setOption(Lib.SoundOption.VOLUME, 5);
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function*(){
        //let imgTag;
        const main = document.getElementById('main');        
        const mousePositionOnWrapper = (imgTag) => {
            const mousePosition = {x:Pg.stage.mouse.pageX,y:Pg.stage.mouse.pageY};
            const x = mousePosition.x;//Lib.mousePosition.x / renderRate.x + Pg.canvas.width/2;
            const y = mousePosition.y;//(Lib.mousePosition.y / renderRate.y - Pg.canvas.height/2)*(-1);
            const imgRect = imgTag.getBoundingClientRect();
            return {x:x-imgRect.width/2,y:y-imgRect.height/2};
        }
        const self = this;
        const createImg = function() {
            const renderer = Pg.render.renderer;
            const drawableID = self.drawableID;
            const image = renderer.extractDrawableScreenSpace(drawableID);
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            const imageData = new ImageData(image.imageData.data, image.width, image.height);
            ctx.putImageData(imageData, 0, 0);
            ctx.drawImage(canvas, image.width, image.height);
            const text = canvas.toDataURL();
            canvas.remove();
            const imgTag = document.createElement('img');
            imgTag.classList.add('spriteDragging'); // CSS でFILTERなどを定義
            imgTag.src = text;
            // imgTag.style.position = 'absolute'
            // imgTag.style.border = 'none';
            // imgTag.style.zIndex = '99999'; // <-- zIndex の数は整理しておくこと。
            imgTag.setAttribute('draggable', false);
            return imgTag;
        }
        const imgTag = createImg();
        //imgTag.setAttribute('draggable', false);
        for(;;){
            if(this.Sensing.isMouseTouching()){
                const mouse = Pg.stage.mouse;
                if(mouse.down){
                    //main.addEventListener("mousemove", mouseOver);
                    //console.log('Mouse Touch and pressed')
                    main.appendChild(imgTag);
                    this.Looks.hide();
                    for(;mouse.down;){
                        const pos = mousePositionOnWrapper(imgTag);
                        imgTag.style.left = `${pos.x}px`;
                        imgTag.style.top = `${pos.y}px`;
                        yield;
                    }
                    this.Motion.Position.x = Lib.mousePosition.x;
                    this.Motion.Position.y = Lib.mousePosition.y;
                    this.Looks.show();
                    imgTag.remove();
                }
            }
            yield;
        }
    });
    // 緑の旗が押されたときの動作
    ball.Event.whenFlag(async function*(){
        this.Motion.Move.gotoXY(0,-100);
        this.Looks.Size.scale = {w: 50, h: 50};
    });
    
    const BallSpeed = 10;
    const InitDirection = 25;
    // メッセージ(Start)を受け取ったときの動作
    ball.Event.whenBroadcastReceived('Start', async function*(){
        score = 0;
        this.Motion.Point.pointInDirection(InitDirection);
        this.Motion.Move.gotoXY(0,-100);
        // フキダシを出す
        //this.Looks.say('パドルはマウスで動くよ。何かのキーを押すと始まるよ');
        // 何かキーが押されるまで待つ
        await this.Control.waitUntil(()=>Lib.anyKeyIsDown());
        // フキダシを消す
        //this.Looks.say('');
        for(;;){
            this.Motion.Move.moveSteps(BallSpeed);
            this.Motion.Move.ifOnEdgeBounds();
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
            if( this.Sensing.isTouchingToSprite(paddle)){
                this.Motion.Direction.degree += Lib.getRandomValueInRange(-2, 2)+180;
                this.Motion.Move.moveSteps(BallSpeed*2);
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
        this.Motion.Move.gotoXY(0, -180);
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
    paddle.Event.whenFlag(async function(){
        this.Motion.Move.gotoXY(0, -140);
    })
    // メッセージ(Start)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('Start', async function*(){
        while(true){
            const mousePos = Lib.mousePosition;
            const selfPosition = this.Motion.getCurrentPosition();
            this.Motion.Move.gotoXY(mousePos.x, selfPosition.y);
            yield;
        }
    });
    // メッセージ(GameOver)を受け取ったときの動作
    paddle.Event.whenBroadcastReceived('GameOver', async function(){
        this.Control.stopOtherScripts();
    });

    let blockCount = 0;
    // 緑の旗が押されたときの動作
    block.Event.whenFlag( async function*(){
        this.Control.removeAllClones();
        this.Looks.hide();
        this.Looks.Size.scale = {w:50, h:50};
        this.Motion.Move.gotoXY(-220,180);

        const pos = this.Motion.Position.xy;
        const dimension = this.Looks.drawingDimensions();
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
            if(this.Control.isAlive() && this.Sensing.isTouchingToSprite(ball)){
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
            //this.render.renderer.draw();
            yield;
        }
        //this.$remove();
    });
    // 緑の旗が押されたときの動作
    title.Event.whenFlag(async function(){
        this.Looks.hide();
    })
    // メッセージ(YouWon)を受け取ったときの動作
    title.Event.whenBroadcastReceived(YouWon, async function(){
        this.Looks.switchCostume(YouWon);
        this.Looks.show();
        Pg.Control.stopAll();
    });
    // メッセージ(GameOver)を受け取ったときの動作
    title.Event.whenBroadcastReceived(GameOver, async function(){
        this.Looks.switchCostume(GameOver);
        this.Looks.show();
        Pg.Control.stopAll();
    });

}