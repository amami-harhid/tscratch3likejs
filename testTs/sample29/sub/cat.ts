import {Lib} from "../../../s3lib-importer";

export class Cat extends Lib.Sprite {

    constructor(){
        super('Cat');
    }

    setting() {

        this.Event.whenFlag( async function*(this:Cat) { 
            yield * this.walkToMouse(5);
        });

    }
    async *walkToMouse(this:Cat, step:number){
        for(;;){
            this.Motion.Point.toMouse();
            this.Motion.Move.steps(step);
            yield;
        }    
    }
}

