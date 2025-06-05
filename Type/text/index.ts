import { TScale } from '@Type/common/typeCommon';
import type { TEntityOptions } from '../entity/TEntityOptions';
import type { ITextSpriteControl } from './ITextSpriteControl';
import type { ITextSpriteEvent } from './ITextSpriteEvent';
import type { ITextSpriteLooks } from './ITextSpriteLooks';
import type { ITextSpriteMotion } from './ITextSpriteMotion';

export type ParmFontFace = {
    font: string,
    href: string,
    descriptors: FontFaceDescriptors,
} 

export type TextAttributes = {
    fill: string,
    stroke?: string,
    stroke_mode?: 'outside'|'inside',
    stroke_width?: number,
    font: string,
    font_size: number,
    font_weight?: 'normal'|'bold'|'bolder'|'lighter',
    use?: {x:number,y:number,fill:string,stroke?:string,stroke_width?:number}[],
};
export type TTextSprite = ITextSprite;
/**
 * TextSprite
 */
export interface STextSprite{
    /**
     * @param name
     * @param options 
     */
    new(name?:string, options?:TEntityOptions):ITextSprite;

};
export interface ITextSprite {

    /**
     * 動き
     */
    get Motion() : ITextSpriteMotion;

    // /**
    //  * コスチューム番号、コスチューム名を取り出すためのオブジェクト
    //  * 使用例：this.Costume.no, this.Costume.name
    //  * @returns
    //  */
    // get Costume(): ISpriteCostume;
    
    // /**
    //  * 背景番号、背景名を取り出すためのオブジェクト
    //  */
    // get Backdrop(): ISpriteBackdrop;

    /**
     * 見た目
     */
    get Looks() : ITextSpriteLooks;
    /**
     * 制御
     */
    get Control() : ITextSpriteControl;
    /**
     * イベント
     */
    get Event() : ITextSpriteEvent;
    /**
     * SVGの大きさ
     */    
    set svgScale(scale:TScale);

    set padding(padding:number);
    /**
     * 文字を書き出す位置
     */
    set textAttributes(attr: TextAttributes);
    /**
     * テキスト
     */
    set text(text:string);
    /**
     * フォントファミリー
     */
    setFontFamily(fontFamily: ParmFontFace[]): Promise<void>;
};