export class SvgTextMesure {
    //private dummyCtx: CanvasRenderingContext2D|null; 
    constructor() {
        this.dummyCanvas = document.createElement('canvas');
        //this.dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
    }
    mesure(texts, fontSize, fontStyle='normal', fontFamily) {
        if(fontFamily){
            //console.log('fontFamily', fontFamily);
            this.dummyCanvas.style.fontFamily = `${fontSize}px '${fontFamily}', sans-serif`;
        }
        const dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
        if(dummyCtx == null) throw 'Error';
        if(fontFamily){
            const font = `${fontStyle} ${fontSize}px '${fontFamily}',sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }else{
            const font = `${fontStyle} ${fontSize}px sans-serif`;
            //console.log(font);
            dummyCtx.font = font;

        }
        //console.log(this.dummyCanvas);
        //console.log(dummyCtx);
        const textArr = [];
        if(texts.length > 0) {
            // eslint-disable-next-line loopCheck/s3-loop-plugin
            for(const text of texts){
                if(text.match("<br/>")){
                    const textSplit = text.split('<br/>');
                    // eslint-disable-next-line loopCheck/s3-loop-plugin
                    for(const _t of textSplit) {
                        textArr.push(_t);
                    }
                }else{
                    textArr.push(text);
                }
            }
        }
        console.log(textArr);
        if(textArr.length > 0) {
            
            let maxLength = textArr[0].length;
            let maxLengthStr = textArr[0]; 
            // eslint-disable-next-line loopCheck/s3-loop-plugin
            for(let i=1 ; i<textArr.length;i++) {
                const text = textArr[i];
                const _length = text.length;
                if( maxLength < _length ) {
                    maxLength = _length;
                    maxLengthStr = text;
                }
            }
            const mesure = dummyCtx.measureText(maxLengthStr);
            const width = mesure.width;
            const height = mesure.actualBoundingBoxAscent+mesure.actualBoundingBoxDescent 
            return {w:width, h: height};
        }
        return {w:0, h: 0};
    }

    static instance;
    static getInstance() {
        if(SvgTextMesure.instance == undefined){
            SvgTextMesure.instance = new SvgTextMesure();
        }
        return SvgTextMesure.instance;
    }
}