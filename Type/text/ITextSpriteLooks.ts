import type { ISpriteLayer } from '../sprite/ISpriteLayer';
import type { ISpriteSize } from '../sprite/ISpriteSize';
import type { ISpriteEffect } from '../sprite/ISpriteEffect';
/**
 * Sprite Looks(見た目)
 */
export interface ITextSpriteLooks {

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

};

