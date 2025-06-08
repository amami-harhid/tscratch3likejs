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
    readonly Costume: ISpriteCostume;
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    readonly Backdrop: ISpriteBackdrop;

    /**
     * サイズ
     */
    readonly Size : ISpriteSize;
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
    readonly Layer : ISpriteLayer;
    /**
     * 効果
     */
    readonly Effect : ISpriteEffect;
    /**
     * フキダシ
     */
    readonly Bubble : ISpriteBubble;

};

