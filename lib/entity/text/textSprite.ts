import { Costumes } from '../costumes';
import { Entity } from '../entity';
import { ImageLoader } from '../../importer/imageLoader';
import { MeasurementProvider } from '../../util/MeasurementProvider';
import { StageLayering } from '../stageLayering';
import { ScratchRenderProperties } from '@Lib/render/IRenderWebGL';
import { TextSpriteControl } from './textControl';
import { TextSpriteLooks } from './textSpriteLooks';
import { TextSpriteMotion } from './textSpriteMotion';
import type { TPosition, TScale } from '@Type/common/typeCommon';
import type { ITextSprite, TextAttributes, ParmFontFace } from '@Type/text';
import type { ITextSpriteControl } from '@Type/text/ITextSpriteControl';
import type { ITextSpriteEvent } from '@Type/text/ITextSpriteEvent';
import type { ITextSpriteLooks } from '@Type/text/ITextSpriteLooks';
import type { ITextSpriteMotion } from '@Type/text/ITextSpriteMotion';
import { TextSpriteEvent } from './textSpriteEvent';
import { ISprite } from '@Type/sprite';
import { Utils } from '@Lib/util/utils';
import { Env } from '@Lib/env';

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * TextSprite
 */
export class TextSprite extends Entity implements ITextSprite{
    private skinId: number;
    private $svgScale: TScale;
    private _text: string;
    private costumes: Costumes;
    private _fontFamily: ParmFontFace[];
    private _padding: number;
    private _textAttributes: TextAttributes;
    private _dirty : boolean;
    /** 動き */
    private _Motion: ITextSpriteMotion;
    /** 見た目 */
    private _Looks: ITextSpriteLooks;
    /** 制御 */
    private _Control: ITextSpriteControl;
    /** イベント */
    private _Event: ITextSpriteEvent;

    constructor(name : string) {
        super(name, StageLayering.TEXT_LAYER);
        this.$_position = {x:0, y:0};
        this.$svgScale = {w:300, h:300}
        this._dirty = false;
        this._text = '';
        this._textAttributes = {fill:'#5db9fc', font: 'sans-serif', font_size:80};
        this._padding = 0;
        this.costumes = new Costumes(this.playGround);
        this.skinId = -1;
        this._Motion = new TextSpriteMotion(this);
        this._Looks = new TextSpriteLooks(this);
        this._Control = new TextSpriteControl(this);
        this._Event = new TextSpriteEvent(this);
        this._fontFamily = [];
        const stage = this.playGround.stage;
        stage.addSprite(this as unknown as ISprite);
    }
    set padding(padding:number) {
        this._padding = padding;
        this._dirty = true;
    }
    async setFontFamily(fontFamily: ParmFontFace[]): Promise<void>{
        if(this._fontFamily.length>0){
            this._fontFamily.slice(0, this._fontFamily.length);
        }
        for(const font of fontFamily) {
            this._fontFamily.push(font);
        }

        await this.link();
    }
    set svgScale(scale:TScale) {
        this.$svgScale.w = scale.w;
        this.$svgScale.h = scale.h;
    }
    set textAttributes(attr: TextAttributes) {
        this._textAttributes.fill = attr.fill;
        this._textAttributes.font_size = attr.font_size;
        this._textAttributes.font = attr.font;
        this._textAttributes.stroke = (attr.stroke)?attr.stroke:undefined;
        this._textAttributes.stroke_mode = (attr.stroke_mode)?attr.stroke_mode:undefined;
        this._textAttributes.stroke_width = (attr.stroke_width)?attr.stroke_width:undefined;
        if(attr.use){
            this._textAttributes.use = [];
            for(const _use of attr.use){
                this._textAttributes.use.push(_use);
            }
        }
        //console.log(this._textAttributes);
    }
    set text(text:string) {
        if(this._text != text) {
            this._dirty = true;
            this._text = text;
        }
    }
    
    private async drawText(): Promise<void> {
        const textStr = this._text;
        const svg = this.createSvg(textStr);
        this.skinId = await this.addSvgImage(svg);
        //svg.remove();
    }
    private async link(): Promise<void> {
        if(this._fontFamily.length > 0){
            const promiseArr:Promise<FontFace>[] = []
            for(const font of this._fontFamily){
                if(font.href){
                    const fontFace = new FontFace(
                        font.font,
                        `url(${font.href})`,
                        font.descriptors
                    );
                    const promise = fontFace.load();
                    promiseArr.push(promise);
                }
            }
            const fontFaces = await Promise.all(promiseArr);
            const scratchFontStyles = document.getElementById('scratch-font-styles');
            if(scratchFontStyles){
                for(const face of fontFaces) {
                    console.log(face);
                    document.fonts.add(face);
                }

            }
        }
    }
    /**
     * SVG エレメントを返す
     * @returns - SVG element
     */
    private createSvg(textStr: string) :SVGSVGElement{
        const svg = document.createElementNS(SVG_NS, "svg");
        const mesure = this.mesure(textStr);
        svg.setAttribute("width", `${mesure.w}`);
        svg.setAttribute("height", `${mesure.h+this._padding*2}`);
        svg.setAttribute("viewBox", `0 0 ${mesure.w} ${mesure.h+this._padding*2}`);
        

        const text = this.createText(textStr, mesure);
        if(this._textAttributes.use && this._textAttributes.use.length>0){
            const defs = document.createElementNS(SVG_NS, "defs");
            const TextID = 'text0';//`text_${this.id}`;
            text.setAttribute('id', TextID);
            defs.appendChild(text);
            svg.appendChild(defs);
            for(const use of this._textAttributes.use){
                const _use = document.createElementNS(SVG_NS, "use");
                //_use.setAttribute('href', `#${TextID}`);
                _use.setAttribute('href', `#${TextID}`);
                _use.setAttribute('x', `${use.x}`);
                _use.setAttribute('y', `${mesure.h + this._padding + use.y}`);
                _use.setAttribute('fill', `${use.fill}`);
                if(use.stroke){
                    _use.setAttribute('stroke', `${use.stroke}`);
                }
                if(use.stroke_width){
                    _use.setAttribute('stroke-width', `${use.stroke_width}`);
                }
                _use.setAttribute("font-size", `${this._textAttributes.font_size}px`);
                let fontFamily = this.getFontFamily();
                _use.setAttribute("font-family", `${this._textAttributes.font}, sans-serif`);
                svg.appendChild(_use);
            }
        }else{
            svg.appendChild(text);
        }
        console.log(svg);
        //document.body.appendChild(svg);
        return svg;
    }
    /**
     * テキストエレメントを返す
     * @param textStr 
     * @returns - text element
     */
    private createText(textStr: string, mesure:{w:number,h:number}): SVGTextElement {
        const text = document.createElementNS(SVG_NS, "text");
        text.style.fontFamily = `${this._textAttributes.font}, sans-serif`;
        if(this._textAttributes.use == undefined || this._textAttributes.use.length == 0){
            // テキストの左下のX座標
            text.setAttribute("x", '0');
            //text.setAttribute("x", `${this._textAttributes.x}`);
            // テキストの左下のY座標
            text.setAttribute("y", `${mesure.h + this._padding}`);
            //text.setAttribute("y", `${this._textAttributes.y}`);
            text.setAttribute("fill", `${this._textAttributes.fill}`);
            text.setAttribute("font-size", `${this._textAttributes.font_size}px`);
            let fontFamily = this.getFontFamily();
            text.setAttribute("font-family", `${this._textAttributes.font}, sans-serif`);
            if(this._textAttributes.stroke){
                text.setAttribute('stroke', this._textAttributes.stroke);
            }
            if(this._textAttributes.stroke_mode){
                text.setAttribute('stroke-mode', this._textAttributes.stroke_mode);
            }
            if(this._textAttributes.stroke_width){
                text.setAttribute('stroke-width', `${this._textAttributes.stroke_width}` );
            }
        }
        text.textContent = textStr;
        return text;
    }
    private getFontFamily() : string {
        let fontFamily = '';
        for(const font of this._fontFamily){
            fontFamily += `"${font.font}",`;
        }
        fontFamily+='sans-serif'
        return fontFamily;
    }
    /**
     * 文字列の大きさを測定するために Canvasを使っている
     * @param text 
     * @returns 
     */
    private mesure(text:string): {w:number, h:number} {
        const fontFamily  = ((this._textAttributes.font_weight)? this._textAttributes.font_weight: '')
            +`${this._textAttributes.font_size}px "${this._textAttributes.font}", sans-serif`;
        const debugCanvas = document.createElement('canvas');
        debugCanvas.style.fontFamily = fontFamily;
        const debugCtx = debugCanvas.getContext('2d',{willReadFrequently:true});
        if(debugCtx == undefined) throw 'Unable to get ctx';
        //let fontFamily = this.getFontFamily();
        debugCtx.font = fontFamily;
        //const measurementProvider = new MeasurementProvider(debugCtx);
        const mesure = debugCtx.measureText(text);
        const width = mesure.width;
        const height = mesure.actualBoundingBoxAscent+mesure.actualBoundingBoxDescent 
        return {w:width, h: height};
    }
    /**
     * SVG element を文字列化(ロード可能とし)、コスチュームへ追加する
     * 
     * @param svg 
     * @returns - skinId
     */
    private async addSvgImage(svg:SVGSVGElement) : Promise<number>{
        const serializer = new XMLSerializer();
        const svgText = serializer.serializeToString(svg);
        //console.log(svgText);
        const name = `TextSprite_${this.id}`;
        const base64 = Buffer.from(svgText).toString('base64');
        const url = 'data:image/svg+xml;charset=utf-8;base64,'+ base64;
        const img = await ImageLoader._loadImage(url);
        //const img = await ImageLoader._svgText(url);
        //console.log(img);
        if(this.skinId == -1) {
            await this.costumes.addImage(name, img);
            const skinId = this.costumes.getSkinId(name);
            this.render.renderer.updateDrawableSkinId(this.drawableID, skinId);
            return skinId;
        }else{
            const skinId = await this.costumes.updateImage(name, img);
            //this.render.renderer.updateDrawableSkinId(this.drawableID, skinId);
            return skinId;
        }
    }
    /**
     * コスチュームを更新する
     */
    update() {
        super.update();
        if(this._dirty === true){
            this.drawText();
            this._dirty = false;
        }
        const effect:ScratchRenderProperties = {
            skinId: this.skinId,
            visible: this.visible,
            position: [this.$_position.x, this.$_position.y],
            scale: [this.$_scale.w, this.$_scale.h],
        }
        this.costumes.update(this.drawableID, effect);
    }

    get Motion() : ITextSpriteMotion {
        return this._Motion;
    }

    get Looks() : ITextSpriteLooks {
        return this._Looks;
    }

    get Control() : ITextSpriteControl {
        return this._Control;
    }

    get Event() : ITextSpriteEvent {
        return this._Event;
    }
}