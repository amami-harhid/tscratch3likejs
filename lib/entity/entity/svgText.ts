import type { ISvgText, TAddOption } from '@Type/svgText/ISvgText';
import { Entity } from '../entity';
import { Sprite } from '../sprite';
import { Stage } from '../stage';
import { SvgTextError } from './svgTextError';
import { SvgTextCreator } from './svgTextCreator';
import { SvgTextMesure } from './svgTexMesure';
import type { ISvgTextCreator, TSvgOption, TSvgOptionFont } from '@Type/svgText/ISvgTextCreator';
import type { ISvgTextMesure } from '@Type/svgText/ISvgTextMesure';



const SVG_NS = "http://www.w3.org/2000/svg";
export class SvgText implements ISvgText {
    private _entity : Entity;
    private _svgTextMesure: ISvgTextMesure;
    private _svgTextCreator: ISvgTextCreator;
    constructor(entity: Entity) {
        this._entity = entity;
        this._svgTextMesure = SvgTextMesure.getInstance();
        this._svgTextCreator = SvgTextCreator.getInstance();
    }
    private addImage(name:string, image:string): void {
        if(this._entity instanceof Sprite) {
            const sprite = this._entity as Sprite;
            const costumes = sprite.costumes;
            if(sprite.imageDatas){
                sprite.imageDatas.push({name:name, data:image, skinId:-1});
            }
            this._entity._addImage(name, image, costumes);
        }else if(this._entity instanceof Stage){
            const stage = this._entity as Stage;
            const backdrops = stage.backdrops;
            this._entity._addImage(name, image, backdrops);
        }
    }
    private uddateImage(name:string, image:string): void {
        if(this._entity instanceof Sprite) {
            const sprite = this._entity as Sprite;
            const costumes = sprite.costumes;
            if(sprite.imageDatas){
                sprite.imageDatas.push({name:name, data:image, skinId:-1});
            }
            this._entity._updateImage(name, image, costumes);
        }else if(this._entity instanceof Stage){
            const stage = this._entity as Stage;
            const backdrops = stage.backdrops;
            this._entity._updateImage(name, image, backdrops);
        }
    }
    private getSvgOption(option? : TAddOption): TSvgOption {
        const svgOption:TSvgOption = {};
        if(option){
            if(option.fontFamily){
                const fontUrl = this._entity.getFontData(option.fontFamily);
                if(fontUrl){
                    const font: TSvgOptionFont = {fontFamily: option.fontFamily, fontUrl: fontUrl};
                    svgOption.font = font; 
                }
            }
            if(option.fontSize){
                svgOption.fontSize = option.fontSize;
            }
            if(option.fontStyle){
                svgOption.fontStyle = option.fontStyle;
            }
            if(option.fontSize){
                svgOption.fontSize = option.fontSize;
            }
            if(option.color){
                svgOption.color = option.color;
            }
        }
        return svgOption;
    }
    replaceTexts(name: string, texts: string[], option?: TAddOption): void {
        const svgOption:TSvgOption = this.getSvgOption(option);
        const svgString = this._svgTextCreator.toSvg(texts, svgOption);
        const parser = new DOMParser();
        const serializer = new XMLSerializer();
        let svgDom = parser.parseFromString(svgString, 'text/xml');
        const svgTag = svgDom.documentElement;
        const svgText = serializer.serializeToString(svgTag);
        this.uddateImage(name, svgText);
    }
    addTexts(name: string, texts: string[], option?: TAddOption): void {
        const svgOption:TSvgOption = this.getSvgOption(option);
        const svgString = this._svgTextCreator.toSvg(texts, svgOption);
        //const svgString2 = this._svgTextCreator.toSvg(texts, svgOption.fontSize,svgOption.fontStyle, svgOption.color, (svgOption.font)?svgOption.font.fontFamily:'');
        const parser = new DOMParser();
        const serializer = new XMLSerializer();
        let svgDom = parser.parseFromString(svgString, 'text/xml');
        const svgTag = svgDom.documentElement;
        const svgText = serializer.serializeToString(svgTag);
        this.addImage(name, svgText);
    }
    add(name: string, svgString: string): void {
        const parser = new DOMParser();
        let svgDom = parser.parseFromString(svgString, 'text/xml');
        if(svgDom.childNodes.length < 1 ||
            svgDom.documentElement.localName !== 'svg') {
            const svgTextError = SvgTextError();
            this.addImage(name, svgTextError);
            return;
        }
        const svgTag = svgDom.documentElement;
        const serializer = new XMLSerializer();
        const svgText = serializer.serializeToString(svgTag);
        this.addImage(name, svgText);
    }
    mesure(texts:string[], fontSize?:number, fontStyle?:string, fontFamily?: string): {w:number, h:number}{
        return this._svgTextMesure.mesure(texts, fontSize, fontStyle, fontFamily);
    }

    toSvg(textArr: string[], fontSize?: number, fontStyle?: string, color?: string, fontFamily?:string): string {
        return this._svgTextCreator.toSvg2(textArr, fontSize, fontStyle, color, fontFamily);
    }
}