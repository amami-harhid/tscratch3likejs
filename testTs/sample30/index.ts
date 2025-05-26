/**
 * test of sample30
 * スプライトをドラッグする
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@typeJS/s3PlayGround";
import type {Stage} from "@typeJS/s3Stage";
import type {Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample30】スプライトをドラッグする"

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

let stage: Stage;
let cat: Sprite;
const Jurassic = 'Jurassic';
const Chill = 'Chill';
const Cat = 'Cat';

Pg.preload = async function (this:PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic);
    this.Sound.load(AssetHost+'/assets/Chill.wav', Chill);
    this.Image.load(AssetHost+'/assets/cat.svg', Cat );
}
Pg.prepare = async function () {
    stage = new Lib.Stage();
    await stage.Sound.add(Chill);
    cat = new Lib.Sprite(Cat);
    await cat.Image.add(Cat);
}

Pg.setting = async function () {

    stage.Event.whenFlag(async function*(this:Stage){
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })
    cat.Event.whenFlag(async function*(this:Sprite){
        this.Looks.Size.scale = {w:150, h:150};
        this.Sensing.DragMode.draggable = true;
        this.Pen.penClear();
        this.Pen.setPenHue(200);
        this.Pen.setPenSaturation(90);
        this.Pen.setPenBrightness(85);
        this.Pen.setPenTransparency(60);
        this.Pen.setPenSize(1500);
        this.Looks.setEffect(Lib.ImageEffective.GHOST, 80);
        this.Pen.penDown();
        for(;;){
            this.Motion.Direction.degree += 5;
            this.Looks.changeEffectBy(Lib.ImageEffective.COLOR,25);
            this.Pen.stamp();
            yield;
        }

    });

}
