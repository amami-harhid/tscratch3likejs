export class PositionRegist {

    static instance;

    static getInstance(){
        if(PositionRegist.instance == undefined){
            PositionRegist.instance = new PositionRegist();
        }
        return PositionRegist.instance;
    }
    constructor() {
        this.positions = new Array(10).fill(0);
    }
    clear(v) {
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for(let idx=0; idx<this.positions.length; idx++) {
            this.positions[idx] = v;
        }

    }
    set(x) {
        // eslint-disable-next-line loopCheck/s3-loop-plugin
        for(let idx=0; idx<this.positions.length-1; idx++) {
            this.positions[idx+1] = this.positions[idx];
        }
        this.positions[0] = x;
    }
    get(idx) {
        if(idx){
            if(idx < this.positions.length){
                return this.positions[idx];
            }
        }
        return this.positions[this.positions.length-1];
    }

}