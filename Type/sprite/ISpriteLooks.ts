import type { ISpriteCostume } from './ISpriteCostume';
import type { ISpriteBackdrop } from './ISpriteBackdrop';
import type { ISpriteSize } from './ISpriteSize';
import { ISpriteLayer } from './ISpriteLayer';
import { ISpriteEffect } from '@Type/sprite/ISpriteEffect';
import { ISpriteBubble } from '@Type/sprite/ISpriteBubble';
/**
 * Sprite Looks(見た目)
 */
export interface ISpriteLooks {
    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     */
    get Costume() : ISpriteCostume;
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): ISpriteBackdrop;

    /**
     * サイズ
     */
    get Size() : ISpriteSize;
    /**
     * 表示する
     */
    show() : void;
    /**
     * 隠す
     */
    hide() : void;
    /**
     * 階層
     * 
     * {@link Layer}
     */
    get Layer() : ISpriteLayer;
    /**
     * 効果
     */
    get Effect() : ISpriteEffect;
    /**
     * フキダシ
     */
    get Bubble() : ISpriteBubble;

};

