import {Pg, Lib} from "../s3lib-importer";
import type {S3PlayGround} from "../types/scratchjs/s3PlayGround";
import type {S3Stage} from "../types/scratchjs/s3Stage";
import type {S3Sprite} from "../types/scratchjs/s3Sprite";
const stage:S3Stage = new Lib.Stage();
let sprite:S3Sprite;

const AssetHost = "https://amami-harhid.github.io/scratch3likejslib/web";
const Jurassic = "Jurassic";

Pg.preload = async function(this:S3PlayGround) {
    this.Image.load(AssetHost+'/assets/Jurassic.svg', Jurassic);
}

Pg.prepare = async function () {
    sprite = new Lib.Sprite();
}
Pg.setting = async function setting() {

    stage.Event.whenRightNow(async function(this:S3Stage){
        await this.Image.add( Jurassic );
    })

    stage.Event.whenFlag(async function*(this:S3Stage){
        for(;;){
            await this.Sound.playUntilDone('pew');
            yield;
        }
    });
    stage.Event.whenFlag(async function(this:S3Stage){
        await this.Sensing.askAndWait('nya');
        await this.Sound.playUntilDone('Nya');
        let x = 0;
        const loop = function*() {
            while(true){
                if(x>10) break;
                x+=1;
                yield;
            }
        }
        loop();
    });
    const bubbleTextArr = [1,2,3];
    sprite.Event.whenFlag(async function(this:S3Sprite){
        await this.Sensing.askAndWait('test');
        this.Motion.setRotationStyle(Lib.RotationStyle.DONT_ROTATE);
        await this.Event.broadcastAndWait("MessageCat1Say", bubbleTextArr[0], 3, 4, 5); 
    });
}