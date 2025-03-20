import {Pg, Lib} from "../s3lib-importer";
import type {S3Stage} from "../types/scratchjs/s3Stage";
import type {S3Sprite} from "../types/scratchjs/s3Sprite";
const stage:S3Stage = new Lib.Stage();
let sprite:S3Sprite;
Pg.prepare = async function () {
    sprite = new Lib.Sprite();
}
Pg.setting = async function setting() {
    stage.Event.whenFlag(async function*(this:S3Stage){
        while(true){
            await this.Sound.playUntilDone();
            yield;
        }
    });
    stage.Event.whenFlag(async function(this:S3Stage){
        await this.Sound.playUntilDone();
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
        this.Motion.setRotationStyle(Lib.RotationStyle.DONT_ROTATE);
        await this.Event.broadcastAndWait("MessageCat1Say", bubbleTextArr[0], 3, 4, 5); 
    });
}