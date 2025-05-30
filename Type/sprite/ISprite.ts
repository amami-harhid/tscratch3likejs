import type { IEntity } from '../entity/IEntity';
import type { ISpriteMotion } from './ISpriteMotion';
import type { ISpriteLooks } from './ISpriteLooks';
import type { ISpriteControl } from './ISpriteControl';
import type { ISpriteSound } from './ISpriteSound';
import type { ISpriteImage } from './ISpriteImage';
import type { ISpriteCostume } from './ISpriteCostume';
import type { ISpriteBackdrop } from './ISpriteBackdrop';
import type { ISpriteSensing } from './ISpriteSensing';
import type { ISpriteEvent } from './ISpriteEvent';
import type { ISpriteTextToSpeech } from './ISpriteTextToSpeech';
import type { ISpriteDragMode } from './ISpriteDragMode';
import type { ISpritePen } from './ISpritePen';
/**
 * Sprite
 */
export declare interface ISprite extends IEntity {

    /**
     * 動き
     */
    get Motion() : ISpriteMotion;

    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     * 使用例：this.Costume.no, this.Costume.name
     * @returns {{no: number, name: string}}
     */
    get Costume(): ISpriteCostume;
    
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): ISpriteBackdrop;

    /**
     * 見た目
     */
    get Looks() : ISpriteLooks;
    /**
     * 制御
     */
    get Control() : ISpriteControl;
    /**
     * 調べる
     */
    get Sensing() : ISpriteSensing;
    /**
     * イベント
     */
    get Event() : ISpriteEvent;
    /**
     * イメージ
     */
    get Image () : ISpriteImage;
    /**
     * サウンド
     */
    get Sound () : ISpriteSound;
    /**
     * 音声合成
     */
    get TextToSpeech(): ISpriteTextToSpeech;

    /**
     * DragModeを設定するためのオブジェクト
     * @returns {{draggable: boolean, dragging: boolean}}
     */
    get DragMode(): ISpriteDragMode;

    /**
     * ペン機能
     */
    get Pen() : ISpritePen;
};