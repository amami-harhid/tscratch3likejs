import { Costumes } from '../costumes';
import { Entity } from '../entity';
import { ImageLoader } from '../../importer/imageLoader';
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
    private _fontSize: number;
    private _textAttributes: {x:number,y:number};
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
        this.costumes = new Costumes(this.playGround);
        this.skinId = -1;
        this._Motion = new TextSpriteMotion(this);
        this._Looks = new TextSpriteLooks(this);
        this._Control = new TextSpriteControl(this);
        this._Event = new TextSpriteEvent(this);
        const stage = this.playGround.stage;
        stage.addSprite(this as unknown as ISprite);
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
        const svg = this.createSvg();
        const text = this.createText(textStr);
        svg.appendChild(text);
        this.skinId = await this.addSvgImage(svg);
        svg.remove();
    }
    /**
     * SVG エレメントを返す
     * @returns - SVG element
     */
    private createSvg() :SVGSVGElement{
        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("width", `${this.$svgScale.w}`);
        svg.setAttribute("height", `${this.$svgScale.h}`);
        svg.setAttribute("viewBox", `0 0 ${this.$svgScale.w} ${this.$svgScale.h}`);
        return svg;
    }
    /**
     * テキストエレメントを返す
     * @param textStr 
     * @returns - text element
     */
    private createText(textStr: string): SVGTextElement {
        const text = document.createElementNS(SVG_NS, "text");
        text.setAttribute("x", `${this._textAttributes.x}`);
        text.setAttribute("y", `${this._textAttributes.y}`);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", `${this._fontSize}`);
        text.setAttribute("font-family", `${this._font}`);
        text.textContent = textStr;
        return text;
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
        await this.costumes.addImage(name, img);
        const skinId = this.costumes.getSkinId(name);
        return skinId;
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