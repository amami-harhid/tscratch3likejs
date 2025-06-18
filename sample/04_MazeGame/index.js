/**
 * 【04】Maze
 */
import { Pg, Lib } from '../../build/index.js';
import { Constant } from './sub/constants.js';

Pg.title = "Space ship game"

let stage;
let frog;
let text;

Pg.preload = async function preload() {
    this.Image.load('./assets/maze1.svg', Constant.Maze1);
    this.Image.load('./assets/maze2.svg', Constant.Maze2);
    this.Image.load('./assets/maze3.svg', Constant.Maze3);
    this.Image.load('./assets/frog.svg', Constant.Frog);
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add(Constant.Maze1);
    stage.Image.add(Constant.Maze2);
    stage.Image.add(Constant.Maze3);
    stage.Looks.Effect.set(Lib.ImageEffective.GHOST, 100);

    frog = new Lib.Sprite('frog');
    frog.Image.add(Constant.Frog);
    frog.Looks.Size.scale = [60,60];
    frog.Motion.Position.xy = [-220, -155];
    frog.Looks.hide();

    text = new Lib.Sprite('text');
    text.Font.add(Constant.Togemaru);
    const fontSize = 35;
    const fontStyle = 'bold';
    const color = '#000';
    const fontFamily = Constant.Togemaru;
    const text1 = text.SvgText.toSvg(["Maze game"], fontSize, fontStyle, color, fontFamily);
    text.SvgText.add("title", text1, fontFamily );
    text.Looks.Effect.set(Lib.ImageEffective.GHOST, 50);
}
Pg.setting = async function setting() {
    
    text.Event.whenFlag(async function*(){
        this.Looks.Costume.name = 'title';
        this.Looks.show();
        await this.Control.wait(2);
        this.Event.broadcast('Start');
        this.Looks.hide();        
    });

    stage.Event.whenFlag(async function*(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 100);
        this.Looks.Backdrop.name = Constant.Maze1;
    });
    stage.Event.whenBroadcastReceived('Start', async function(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 0);
    })
    frog.Event.whenFlag(async function(){
        this.Looks.hide();
        this.Looks.Size.scale = [50,50];
        this.Motion.Position.xy = [-220, -155];
    });
    frog.Event.whenBroadcastReceived('Start', async function*(){
        this.Looks.show();
        // for(;;){
        //     await this.Control.wait(0.5);
        //     this.Looks.Size.h += 10;
        //     await this.Control.wait(0.5);
        //     this.Looks.Size.h -= 10;
        //     yield;
        // }
    });
    const move = function(entity,degree) {
        //const dimension = this.Looks.Size.drawingSize;
        entity.Motion.Direction.degree = degree;
        entity.Motion.Move.steps(5);
        if(entity.Sensing.isTouchingToColor('#ffffff')) {
            entity.Motion.Move.steps(-5);
        }
        if(entity.Sensing.isTouchingEdge()) {
            entity.Motion.Move.steps(-5);
        }
    }
    frog.Event.whenBroadcastReceived('Start', async function*(){
        this.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
        for(;;){
            if(this.Sensing.isKeyDown(Lib.Keyboard.UP)){
                move(this,0);
            }
            if(this.Sensing.isKeyDown(Lib.Keyboard.DOWN)){
                move(this,180);
            }
            if(this.Sensing.isKeyDown(Lib.Keyboard.RIGHT)){
                move(this,90);
            }
            if(this.Sensing.isKeyDown(Lib.Keyboard.LEFT)){
                move(this,-90);
            }
            if(this.Sensing.isTouchingToColor('#ff0000')) {
                // 赤色に触れたとき
                console.log('RED');
                this.Looks.Backdrop.next();
            }
            if(this.Sensing.isTouchingToColor('#006bff')) {
                // 青色に触れたとき
                console.log('BLUE');
                this.Looks.Backdrop.next();
            }
            if(this.Sensing.isTouchingToColor('#f00000')) {
                // 出口に触れたとき
                console.log('出口');
                break;
            }
            yield;
        }
        await this.Looks.Bubble.sayForSecs('成功！！', 2);
    });

}
