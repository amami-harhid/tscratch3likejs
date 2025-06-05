import { TScale } from '@Type/common/typeCommon';
import type { TEntityOptions } from '../entity/TEntityOptions';
import type { ITextSpriteControl } from './ITextSpriteControl';
import type { ITextSpriteEvent } from './ITextSpriteEvent';
import type { ITextSpriteLooks } from './ITextSpriteLooks';
import type { ITextSpriteMotion } from './ITextSpriteMotion';
/**
 * Sprite
 */
export type TTextSprite = ITextSprite;
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
    /**
     * 文字の大きさ
     */    
    set fontSize(fontSize:number);
    /**
     * 文字を書き出す位置
     */
    set textAttributes(attr: {x:number, y:number});
    /**
     * テキスト
     */
    set text(text:string);


};