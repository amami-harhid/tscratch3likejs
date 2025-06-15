/**
 * 【02】Breakout
 */
import {Pg, Lib} from '../../build/index.js';
import { Constant } from './sub/constants.js';
import { Ball } from './sub/Ball.js';
import { BlackBackdrop } from './sub/blackBacdrop.js';
import { Debris } from './sub/Debris.js';
import { Bottom } from './sub/Bottom.js';

Pg.title = "Space ship game"

let stage;
let spaceShip;
let textSprite, ball;
let debri;
let bottom;

Pg.preload = async function preload() {
    this.Image.load('./assets/universe_asteroid02.svg', Constant.Asteroid);
    this.Image.load('./assets/spaceShip1.svg', Constant.Spaceship01 );
    this.Image.load('./assets/spaceShip2.svg', Constant.Spaceship02 );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
    this.Font.load('./assets/HarryPotter-ov4z.woff', Constant.HarryPotter);
    this.Sound.load('./assets/explosion.wav', Constant.Explosion);
    this.Sound.load('./assets/shot.wav', Constant.Shot);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    await stage.Image.add(Constant.Asteroid);
    await stage.SvgText.add( '1', BlackBackdrop );
    stage.Looks.Effect.set(Lib.ImageEffective.GHOST, 20);
    
    spaceShip = new Lib.Sprite('spaceShip');
    await spaceShip.Image.add(Constant.Spaceship01);
    await spaceShip.Image.add(Constant.Spaceship02);
    spaceShip.Looks.Size.scale = {w:20,h:20};
    spaceShip.Motion.Position.xy = {x:0, y:-150};
    await spaceShip.Sound.add(Constant.Shot);
    spaceShip.Looks.hide();

    textSprite = new Lib.Sprite('Introduction');
    textSprite.Looks.Size.scale = {w:200,h:200};
    await textSprite.Font.add(Constant.HarryPotter);
    const fontSize = 35;
    const fontStyle = 'italic';
    const color = '#ffffff';
    const fontFamily = Constant.HarryPotter;
    const text1 = textSprite.SvgText.toSvg(["Space ship game"], fontSize, fontStyle, color, fontFamily);
    await textSprite.SvgText.add("1", text1, fontFamily );

    bottom = new Lib.Sprite('bottom');
    bottom.SvgText.add('1', Bottom('black'));
    bottom.Motion.Position.xy = {x:0, y:-180};
    bottom.Looks.Layer.gotoBack();
    bottom.Looks.Effect.set(Lib.ImageEffective.GHOST, 100);

    ball = new Lib.Sprite('ball');
    await ball.SvgText.add('1', Ball('white'));
    ball.Looks.Size.scale = {w:10, h:10};
    ball.Looks.hide();

    debri = new Lib.Sprite('Debri');
    await debri.SvgText.add('1', Debris('white'));
    await debri.SvgText.add('2', Debris('blue'));
    await debri.SvgText.add('3', Debris('red'));
    debri.Looks.Size.scale = {w:20, h:20}
    await debri.Sound.add(Constant.Explosion);
    debri.Looks.hide();

}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(){
        this.Looks.Backdrop.name = '1';
    });
    textSprite.Event.whenFlag(async function*(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 90);
    })
    spaceShip.Event.whenFlag(async function*(){
        const MoveStep = 10;
        for(;;){
            if(this.Sensing.isKeyDown(Lib.Keyboard.RIGHT)) {
                this.Motion.Position.x += MoveStep;
            }
            if(this.Sensing.isKeyDown(Lib.Keyboard.LEFT)) {
                this.Motion.Position.x -= MoveStep;                
            }
            yield;
        }

    })
    spaceShip.Event.whenFlag(async function*(){
        for(;;){
            if(this.Sensing.isKeyDown(Lib.Keyboard.SPACE)) {
                ball.Control.clone();
                this.Sound.play(Constant.Shot);
            }
            yield;
        }

    })
    spaceShip.Event.whenFlag(async function*(){
        this.Looks.Costume.name = '1';
        this.Looks.show();
        for(;;){
            await this.Control.wait(0.1);
            this.Looks.Costume.next();
            yield;
        }
    });
    bottom.Event.whenFlag(async function*(){
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 100);
    });

    ball.Control.whenCloned(async function*(){
        this.Motion.Move.toSprite(spaceShip);
        this.Motion.Direction.degree = 0;
        const Steps = 10;
        this.Looks.show();
        for(;;){
            if(this.Sensing.isTouchingEdge()){
                break;
            }
            this.Motion.Move.steps(Steps);
            yield;
        }
        this.Control.remove();
    });


    debri.Event.whenFlag(async function*(){
        this.Looks.hide();
        this.Looks.Costume.name = '1';
        this.Motion.Position.x = 0;
        this.Motion.Position.y = 180;
        for(;;) {
            this.Motion.Position.x = Lib.getRandomValueInRange(-240, 240);
            await this.Control.wait(2);
            this.Control.clone();
            this.Looks.Costume.next();
            yield;
        }
    });
    debri.Control.whenCloned(async function*(){
        this.Looks.Size.scale = {w:50,h:15};
        this.Looks.show();
        for(;;) {
            if(this.Sensing.isTouchingToSprites([bottom])) {
                this.Looks.hide();
                break;
            }
            if(this.Sensing.isTouchingToSprites([ball])){
                this.Sound.play(Constant.Explosion);
                break;
            }
            this.Motion.Position.y += Lib.getRandomValueInRange(-5, 1)/2;
            this.Motion.Direction.degree += 1;
            yield;
        }
        this.Control.remove();
    })
}
