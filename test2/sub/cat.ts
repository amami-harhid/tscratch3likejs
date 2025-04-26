import {Lib} from "../../s3lib-importer";
import type {S3Sprite} from "../../types/scratchjs/s3Sprite";
export class Cat extends Lib.Sprite {

    constructor(){
        super('Cat');
    }

    setting(this:S3Sprite) {

        this.Event.whenFlag( async function*(){ 
            yield * this.walkToMouse(5);
        });

    }
    async *walkToMouse(this:S3Sprite, step:number){
        while(true){
            this.Motion.pointToMouse();
            this.Motion.moveSteps(step);
            yield;
        }    
    }
}

