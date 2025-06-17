/**
 * 【02】Breakout
 */
import {Pg, Lib} from '../../build/index.js';
import { Constant } from './sub/constants.js';
import { Ball } from './sub/Ball.js';
import { BlackBackdrop } from './sub/blackBacdrop.js';
import { Bottom } from './sub/Bottom.js';

Pg.title = "Space ship game"

let stage;
let spaceShip;
let textSprite, ball;
let debri;
let bottom;

Pg.preload = async function preload() {
    this.Image.load('./assets/meteo01.svg', Constant.Meteo01);
    this.Image.load('./assets/meteo02.svg', Constant.Meteo02);
    this.Image.load('./assets/meteo03.svg', Constant.Meteo03);

    this.Image.load('./assets/Explosion.svg', Constant.Explosion);
    this.Image.load('./assets/universe_asteroid02.svg', Constant.Asteroid);
    this.Image.load('./assets/spaceShip1.svg', Constant.Spaceship01 );
    this.Image.load('./assets/spaceShip2.svg', Constant.Spaceship02 );
    this.Font.load('./assets/TogeMaruGothic-700-Bold.woff', Constant.Togemaru);
    this.Font.load('./assets/HarryPotter-ov4z.woff', Constant.HarryPotter);
    this.Sound.load('./assets/explosion.wav', Constant.Explosion);
    this.Sound.load('./assets/shot.wav', Constant.Shot);
    this.Sound.load('./assets/spaceship-whoosh.mp3', Constant.SpaceShipWoosh);
}
Pg.prepare = async function prepare() {
    // ステージを作る
    stage = new Lib.Stage();
    // ステージに背景を追加
    stage.Image.add(Constant.Asteroid);
    stage.SvgText.add( BlackBackdrop, BlackBackdrop );
    stage.Looks.Effect.set(Lib.ImageEffective.GHOST, 20);
    stage.Sound.add(Constant.SpaceShipWoosh);
    stage.Sound.setOption(Lib.SoundOption.VOLUME, 120);
    stage.Sound.setOption(Lib.SoundOption.PITCH, -150);
    
    spaceShip = new Lib.Sprite('spaceShip');
    spaceShip.Image.add(Constant.Spaceship01);
    spaceShip.Image.add(Constant.Spaceship02);
    spaceShip.Looks.Size.scale = {w:20,h:20};
    spaceShip.Motion.Position.xy = {x:0, y:-150};
    spaceShip.Sound.add(Constant.Shot);
    spaceShip.Looks.hide();

    textSprite = new Lib.Sprite('Introduction');
    textSprite.Looks.Size.scale = {w:200,h:200};
    textSprite.Font.add(Constant.HarryPotter);
    const fontSize = 35;
    const fontStyle = 'italic';
    const color = '#ffffff';
    const fontFamily = Constant.HarryPotter;
    const text1 = textSprite.SvgText.toSvg(["Space ship game"], fontSize, fontStyle, color, fontFamily);
    textSprite.SvgText.add("1", text1, fontFamily );

    bottom = new Lib.Sprite('bottom');
    bottom.SvgText.add('black', Bottom('black'));
    bottom.Motion.Position.xy = {x:0, y:-180};
    bottom.Looks.Layer.gotoBack();
    bottom.Looks.Effect.set(Lib.ImageEffective.GHOST, 100);

    ball = new Lib.Sprite('ball');
    ball.SvgText.add('ball', Ball('white'));
    ball.Looks.Size.scale = {w:10, h:10};
    ball.Looks.hide();

    debri = new Lib.Sprite('Debri');
    debri.Image.add(Constant.Meteo01);
    debri.Image.add(Constant.Meteo02);
    debri.Image.add(Constant.Meteo03);
    debri.Image.add(Constant.Explosion);
    debri.Looks.Size.scale = {w:50, h:50}
    debri.Sound.add(Constant.Explosion);
    debri.Looks.hide();

}
Pg.setting = async function setting() {

    stage.Event.whenFlag(async function*(){
        this.Looks.Backdrop.name = BlackBackdrop;
        for(;;){
            await this.Sound.playUntilDone(Constant.SpaceShipWoosh);
            yield;
        }
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
        this.Looks.Costume.name = 'ball1';
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
        this.Looks.Costume.name = Constant.Meteo01;
        this.Motion.Position.x = 0;
        this.Motion.Position.y = 180;
        const costumes = [Constant.Meteo01,Constant.Meteo02,Constant.Meteo03];
        for(;;) {
            this.Motion.Position.x = Lib.getRandomValueInRange(-240, 240);
            await this.Control.wait(1);
            this.Control.clone();
            this.Looks.Costume.name = costumes[Lib.getRandomValueInRange(0,2)];
            yield;
        }
    });
    debri.Control.whenCloned(async function*(){
        const scale = Lib.getRandomValueInRange(50,100);
        this.Looks.Size.scale = {w:scale,h:scale};
        const degree = Lib.getRandomValueInRange(-1,5)
        this.Looks.show();
        for(;;) {
            if(this.Sensing.isTouchingToSprites([bottom])) {
                this.Looks.hide();
                break;
            }
            if(this.Sensing.isTouchingToSprites([ball])){
                this.Sound.play(Constant.Explosion);
                this.Looks.Costume.name = Constant.Explosion;
                this.Looks.Size.scale = {w:120,h:120};
                this.Looks.Effect.set(Lib.ImageEffective.GHOST, 80);
                break;
            }
            this.Motion.Position.y += Lib.getRandomValueInRange(-5, 1)/2;
            this.Motion.Direction.degree += degree;
            yield;
        }
        await this.Control.wait(0.5);
        this.Control.remove();
    })
}
