/**
 * test of sample30
 * スプライトをドラッグする
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {S3PlayGround} from "@typeJS/s3PlayGround";
import type {S3Stage} from "@typeJS/s3Stage";
import type {S3Sprite} from "@typeJS/s3Sprite";

Pg.title = "【Sample30】スプライトをドラッグする"

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";

let stage: S3Stage;
let cat: S3Sprite;

const Jurassic = 'Jurassic';
const Chill = 'Chill';
const Cat = 'Cat';

Pg.preload = async function (this:S3PlayGround) {
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

    stage.Event.whenFlag(async function*(this:S3Stage){
        for(;;){
            await this.Sound.playUntilDone(Chill);
            yield;
        }
    })
    cat.Event.whenFlag(async function*(this:S3Sprite){
        this.Looks.setSize(150,150);
        this.Sensing.DragMode.draggable = true;
        this.Pen.penClear();
        this.Pen.setPenSize(1500);
        this.Pen.setPenTransparency(98);
        this.Looks.setEffect(Lib.ImageEffective.GHOST, 50);
        for(;;){
            this.Pen.drawPoint();
            this.Motion.Direction.degree += 5;
            this.Looks.changeEffectBy(Lib.ImageEffective.COLOR,25);
            this.Pen.stamp();
            yield;
        }

    });

}
