/**
 * test of sample30
 * スプライトをドラッグする
 */
import {Pg, Lib} from "../../s3lib-importer";
import type {PlayGround} from "@Type/playground";
import type {IStage as Stage} from "@Type/stage";
import type {ISprite as Sprite} from "@Type/sprite";

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
        this.Pen.clear();
        this.Pen.HSVColor.hue = 200;
        this.Pen.HSVColor.saturation = 90;
        this.Pen.HSVColor.brightness = 85;
        this.Pen.HSVColor.transparency = 60;
        this.Pen.Size.thickness = 1500;
        this.Looks.Effect.set(Lib.ImageEffective.GHOST, 80);
        this.Pen.down();
        for(;;){
            this.Motion.Direction.degree += 5;
            this.Looks.Effect.change(Lib.ImageEffective.COLOR,25);
            this.Pen.stamp();
            yield;
        }

    });

}
