import type { IEntity } from '../entity/IEntity';
import type { TEntityOptions } from '@Type/entity/TEntityOptions';
import type { ISpriteMotion } from './ISpriteMotion';
import type { ISpriteLooks } from './ISpriteLooks';
import type { ISpriteControl } from './ISpriteControl';
import type { ISpriteSound } from './ISpriteSound';
import type { ISpriteImage } from './ISpriteImage';
import type { ISpriteFont } from './ISpriteFont';
// import type { ISpriteCostume } from './ISpriteCostume';
// import type { ISpriteBackdrop } from './ISpriteBackdrop';
import type { ISpriteSensing } from './ISpriteSensing';
import type { ISpriteEvent } from './ISpriteEvent';
import type { ISpriteTextToSpeech } from './ISpriteTextToSpeech';
import type { ISpriteDragMode } from './ISpriteDragMode';
import type { ISpritePen } from './ISpritePen';
import type { ISvgText } from '../svgText/svgText';
/**
 * Sprite
 */
export type TSprite = ISprite;
export interface SSprite{
    /**
     * @param name
     * @param options 
     */
    new(name?:string, options?:TEntityOptions):ISprite;

};
export interface ISprite extends IEntity {

    /**
     * 動き
     */
    readonly Motion: ISpriteMotion;

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
    readonly Looks: ISpriteLooks;
    /**
     * 制御
     */
    readonly Control: ISpriteControl;
    /**
     * 調べる
     */
    readonly Sensing: ISpriteSensing;
    /**
     * イベント
     */
    readonly Event: ISpriteEvent;
    /**
     * イメージ
     */
    readonly Image: ISpriteImage;
    /**
     * サウンド
     */
    readonly Sound: ISpriteSound;


    readonly Font : ISpriteFont;
    /**
     * 音声合成
     */
    readonly TextToSpeech: ISpriteTextToSpeech;

    /**
     * DragModeを設定するためのオブジェクト
     */
    readonly DragMode: ISpriteDragMode;

    /**
     * ペン機能
     */
    readonly Pen : ISpritePen;
    /**
     * 生存期間 ( およその秒数 )
     */
    readonly life : number;

    readonly SvgText: ISvgText;

};