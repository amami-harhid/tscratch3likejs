/**
 * Test
 * Sensing 
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {IPgMain as PgMain} from "@Type/pgMain";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

Pg.title = "【Test】Sensing"

const ASSETS_HOST = 'https://amami-harhid.github.io/tscratch3assets';

/**
 * Cat Sprite Class
 */
let cat: Sprite

const Cat = 'cat';
const White = 'white';

Pg.preload = async function (this: PgMain) {
    this.Image.load(ASSETS_HOST+'/assets/cat.svg', Cat);
    this.Image.load('./assets/white.svg', White);
}
Pg.prepare = async function (this: PgMain) {
    //this.stage.Image.add(White);
    // create instance
    cat = new Lib.Sprite(Cat);
    cat.Image.add( Cat );
    cat.Looks.hide();

}

Pg.setting = async function (this: PgMain) {

    cat.Event.whenFlag(async function(this:Sprite){
        this.Looks.show();
        console.log('黒い鼻が白い背景に触れた？');
        const color = '#ffffff';
        const mask = '#001026';
        const ColorIsTouchingTo = this.Sensing.Color.colorIsTouchingTo(color, mask);
        console.log(`ColorIsTouchingTo=${ColorIsTouchingTo}`);
    });
    this.stage.Event.whenFlag(async function(this:Stage){
        const answer = await this.Sensing.askAndWait('TestQuestion');
        console.log(`answer=${answer}`);
        await this.Control.wait(3);
        const SpaceDown = this.Sensing.Key.isKeyDown(Lib.Keyboard.SPACE);
        console.log(`SpaceDown=${SpaceDown}`);
        await this.Control.wait(1);
        const SpaceNotDown = this.Sensing.Key.isKeyNotDown(Lib.Keyboard.SPACE);
        console.log(`SpaceNotDown=${SpaceNotDown}`);
        await this.Control.wait(1);
        const MouseIsDown = this.Sensing.Mouse.isDown;
        console.log(`MouseIsDown=${MouseIsDown}`);
        await this.Control.wait(1);
        const x = this.Sensing.Mouse.x;
        console.log(`MouseX=${x}`);
        await this.Control.wait(1);
        const y = this.Sensing.Mouse.y;
        console.log(`MouseY=${y}`);
        await this.Control.wait(1);
        this.Sensing.Timer.reset();
        await this.Control.wait(1);
        const timer = this.Sensing.Timer.timer;
        console.log(`timer=${timer}`);
        await this.Control.wait(1);
        this.Event.broadcast('START');
    });
    cat.Event.whenBroadcastReceived('START',async function(this:Sprite){
        console.log('START');
        const answer = await this.Sensing.askAndWait('Sprite Question');
        console.log(`answer=${answer}`);
        console.log('スペースキーを押してください');
        await this.Control.wait(1);
        const IsKeyDown = this.Sensing.Key.isKeyDown(Lib.Keyboard.SPACE);
        const IsKeyNotDown = this.Sensing.Key.isKeyNotDown(Lib.Keyboard.SPACE);
        await this.Control.wait(1);
        console.log(`IsKeyDown=${IsKeyDown}`);
        console.log(`IsKeyNotDown=${IsKeyNotDown}`);
        await this.Control.wait(1);
        console.log('白い背景に触れた？');
        await this.Control.wait(1);
        const color = '#ffffff';
        const IsTouchingTo = this.Sensing.Color.isTouchingTo(color);
        console.log(`IsTouchingTo=${IsTouchingTo}`);
        console.log('黒い鼻が白い背景に触れた？');
        await this.Control.wait(1);
        const mask = '#001026';
        const ColorIsTouchingTo = this.Sensing.Color.colorIsTouchingTo(color, mask);
        console.log(`ColorIsTouchingTo=${ColorIsTouchingTo}`);
        await this.Control.wait(1);
        this.Sensing.DragMode.draggable = true;
        console.log(`this.Sensing.DragMode.draggable=${this.Sensing.DragMode.draggable}`);
        console.log('ドラッグしてください');
        await this.Control.wait(3);
        const Dragging = this.Sensing.DragMode.dragging;
        console.log(`Dragging=${Dragging}`);
        console.log('端に移動してください');
        await this.Control.wait(3);
        const IsEdgeTouching = this.Sensing.Edge.isTouching;
        console.log(`IsEdgeTouching=${IsEdgeTouching}`);
        console.log('端(水平)に移動してください');
        await this.Control.wait(3);
        const IsTouchingHorizontal = this.Sensing.Edge.isTouchingHorizontal;
        console.log(`IsTouchingHorizontal=${IsTouchingHorizontal}`);
        console.log('端(垂直)に移動してください');
        await this.Control.wait(3);
        const IsTouchingVirtical = this.Sensing.Edge.isTouchingVirtical;
        console.log(`IsTouchingVirtical=${IsTouchingVirtical}`);
    });
}
