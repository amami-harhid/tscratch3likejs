import {Pg, Lib} from "../s3lib-importer";
import type {S3Stage} from "../types/scratchjs/s3Stage";
const stage:S3Stage = new Lib.Stage();
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

}