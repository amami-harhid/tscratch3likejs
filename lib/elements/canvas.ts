/**
 * Canvas
 */
const StageCanvasWrapperID = "stageCanvasWrapper";
const CanvasText2dId = "canvas-text2D";
const CanvasText2dClassName = "likeScratch-text-canvas";
const CanvasText2dZIndex = 5100;
const CanvasMonitor2dClassName = 'likeScratch-monitor-canvas';
const CanvasMonitor2dZIndex = 5200;
export class Canvas {

    static canvas: HTMLCanvasElement;
    static textCanvas: HTMLCanvasElement
    /** CanvasMonitor2dClassName */
    static CanvasMonitor2dClassName(): string {
        return CanvasMonitor2dClassName;
    }
    /** StageCanvasWrapperID */
    static StageCanvasWrapperID(): string {
        return StageCanvasWrapperID;
    }
    /**
     * Canvasを作成する
     * @returns HTMLCanvasElement
     */
    static createCanvas(): HTMLCanvasElement {
        if( Canvas.canvas ) {
            return Canvas.canvas;
        }
        const canvasDiv = Canvas.getLikeScratchCanvas();
        let canvas = document.getElementById('canvas');
        if( canvas == undefined) {
            canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            canvasDiv.appendChild(canvas);
        }
        const _canvas = canvas as HTMLCanvasElement;
        Canvas.canvas = _canvas;
        Canvas.createTextCanvas( );
        return _canvas;
    }
    /**
     * Text Canvas を作成する
     * @returns HTMLCanvasElement
     */
    static createTextCanvas(): HTMLCanvasElement {
        let canvasText2D = document.getElementById( CanvasText2dId );

        if( canvasText2D ) {
            const _canvas = canvasText2D as HTMLCanvasElement;
            return _canvas;
        }

        const canvasDiv = Canvas.getLikeScratchCanvas();
        canvasText2D = document.createElement('canvas')
        canvasDiv.appendChild( canvasText2D )
        canvasText2D.id = CanvasText2dId;
        canvasText2D.className = CanvasText2dClassName;
        canvasText2D.style.position = 'absolute'
        canvasText2D.style.border = 'none';
        canvasText2D.style.zIndex = `${CanvasText2dZIndex}`;
    
        const _canvas = canvasText2D as HTMLCanvasElement;
        Canvas.textCanvas = _canvas;
        return _canvas;
    }
    /**
     * Text Canvas をリサイズする
     * @param width {number}
     * @param height {number}
     */    
    static resize2DContext(width: number, height: number): void {
        const textCanvas = Canvas.textCanvas;
        if(textCanvas != null){
            const _textCanvas = textCanvas;
            _textCanvas.style.left = '0px';
            _textCanvas.style.top = '0px';
            _textCanvas.width = width;
            _textCanvas.height = height;    
        }
    }
    /**
     * Monitor Canvas を作成する
     * @returns HTMLCanvasElement
     */
    static createMonitorCanvas() : HTMLCanvasElement {
        const canvasArr = document.getElementsByClassName(CanvasMonitor2dClassName);
        if( canvasArr && canvasArr.length > 0){
            const _canvas = canvasArr[0] as HTMLCanvasElement;
            return _canvas;
        }
        const canvasDiv = Canvas.getLikeScratchCanvas();
        const canvasMonitor2D = document.createElement('canvas')
        canvasMonitor2D.className = CanvasMonitor2dClassName;
        canvasMonitor2D.style.position = 'absolute'
        canvasMonitor2D.style.border = 'none';
        canvasMonitor2D.style.zIndex = `${CanvasMonitor2dZIndex}`;
        canvasMonitor2D.style.left = '0px';
        canvasMonitor2D.style.top = '0px';
        canvasDiv.appendChild( canvasMonitor2D );
        
        return canvasMonitor2D;
    }
    /**
     * Monitor Canvas をリサイズする
     * @param width {number}
     * @param height {number}
     */
    static resizeMonitorCanvas(width:number, height:number): void {

        const canvasArr = document.getElementsByClassName(CanvasMonitor2dClassName);
        //console.log(`canvasArr.length=${canvasArr.length}`)
        for(const canvas of canvasArr){
            const _canvas = canvas as HTMLCanvasElement;
            _canvas.width = width;
            _canvas.height = height;    
        }
    }

    static getStageCanvasWrapper() {
        let stageCanvasWrapper = document.getElementById( StageCanvasWrapperID );
        if( stageCanvasWrapper ) {
            return stageCanvasWrapper;
        }
        stageCanvasWrapper = document.createElement('div');
        stageCanvasWrapper.id = StageCanvasWrapperID;
        stageCanvasWrapper.classList.add(StageCanvasWrapperID)
        //stageCanvasWrapper.style.position = 'relative';
        const main = document.getElementById('main');
        if(main){
            main.appendChild(stageCanvasWrapper);
        }

        return stageCanvasWrapper;
    }

    static getLikeScratchCanvas() {
        let canvasDiv = document.getElementById('canvasDiv');
        if( canvasDiv ) {
            return canvasDiv;
        }
        const stageCanvasWrapper = Canvas.getStageCanvasWrapper();
        canvasDiv = document.createElement('div');
        canvasDiv.classList.add('likeScratch-canvas');
        canvasDiv.id = 'canvasDiv';
        stageCanvasWrapper.appendChild(canvasDiv);
        return canvasDiv;

    }
};