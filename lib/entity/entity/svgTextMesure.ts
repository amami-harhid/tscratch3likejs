export class SvgTextMesure {
    private dummyCanvas : HTMLCanvasElement;
    //private dummyCtx: CanvasRenderingContext2D|null; 
    constructor() {
        this.dummyCanvas = document.createElement('canvas');
        //this.dummyCtx = this.dummyCanvas.getContext('2d', { willReadFrequently: true });        
    }
    mesure(texts:string[], fontSize:number, fontStyle:string='normal', fontFamily?: string): {w:number, h:number} {
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
        const textArr:string[] = [];
        if(texts.length > 0) {
            for(const text of texts){
                if(text.match('<br\/>')){
                    const textSplit = text.split('<br\/>');
                    for(const _t of textSplit) {
                        textArr.push(_t);
                    }
                }else{
                    textArr.push(text);
                }
            }
        }
        
        if(textArr.length > 0) {
            
            let maxLength = textArr[0].length;
            let maxLengthStr: string = textArr[0]; 
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

    static instance:SvgTextMesure;
    static getInstance(): SvgTextMesure {
        if(SvgTextMesure.instance == undefined){
            SvgTextMesure.instance = new SvgTextMesure();
        }
        return SvgTextMesure.instance;
    }

}