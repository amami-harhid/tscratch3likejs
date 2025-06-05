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
import type { ITextSprite } from '@Type/text';
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
    private _font: string;
    private _fontFamily: {font:string,href?:string}[];
    private _fontSize: number;
    private _textAttributes: {x:number,y:number};
    private _padding: number;
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
        this._fontSize = 50;
        this._font = 'Arial';
        this._textAttributes = {x:0,y:0};
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
    }
    async setFontFamily(fontFamily: {font:string,href?:string}[]): Promise<void>{
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
    set fontSize(fontSize:number){
        this._fontSize = fontSize;
    }
    set textAttributes(attr: {x:number, y:number}){
        this._textAttributes.x = attr.x;
        this._textAttributes.y = attr.y;
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
                    );
                    const promise = fontFace.load();
                    promiseArr.push(promise);
                }
            }
            const fontFaces = await Promise.all(promiseArr);
            for(const face of fontFaces) {
                document.fonts.add(face);
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
        svg.appendChild(text);
        return svg;
    }
    /**
     * テキストエレメントを返す
     * @param textStr 
     * @returns - text element
     */
    private createText(textStr: string, mesure:{w:number,h:number}): SVGTextElement {
        const text = document.createElementNS(SVG_NS, "text");
        // テキストの左下のX座標
        text.setAttribute("x", '0');
        //text.setAttribute("x", `${this._textAttributes.x}`);
        // テキストの左下のY座標
        text.setAttribute("y", `${mesure.h + this._padding}`);
        //text.setAttribute("y", `${this._textAttributes.y}`);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", `${this._fontSize}`);
        let fontFamily = this.getFontFamily();
        text.setAttribute("font-family", `${fontFamily}`);
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
        const debugCanvas = document.createElement('canvas');
        const debugCtx = debugCanvas.getContext('2d');
        if(debugCtx == undefined) throw 'Unable to get ctx';
        let fontFamily = this.getFontFamily();
        debugCtx.font = `${this._fontSize}px ${fontFamily}`;
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
        const name = `TextSprite_${this.id}`;
        const img = await ImageLoader._loadImage('data:image/svg+xml;charset=UTF-8,'+ svgText);
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