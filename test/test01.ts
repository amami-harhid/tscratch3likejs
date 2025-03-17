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

}
const a = 0;
function* test() {
    while(true){
        if(a>10) break;
        yield;
    }
}