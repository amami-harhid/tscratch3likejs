import { TextSprite } from './textSprite';
import { TextSpriteLayer } from './textSpriteLayer';
import { TextSpriteSize } from './TextSpriteSize';
import { TextSpriteEffect } from './textSpriteEffect';
import type { ITextSpriteLayer } from '@Type/text/ITextSpriteLayer';
import type { ISpriteSize } from '@Type/sprite/ISpriteSize';
import type { ITextSpriteLooks } from '@Type/text/ITextSpriteLooks';
import type { ITextSpriteEffect } from '@Type/text/ITextSpriteEffect';
/**
 * Sprite Looks(見た目)
 */
export class TextSpriteLooks implements ITextSpriteLooks {
    private entity: TextSprite;
    private layer: ITextSpriteLayer;
    private effect: ITextSpriteEffect;
    private size : ISpriteSize;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:TextSprite){
        this.entity = entity;
        this.layer = new TextSpriteLayer(entity);
        this.effect = new TextSpriteEffect(entity);
        this.size = new TextSpriteSize(entity);
    }
    /**
     * サイズ
     */
    get Size() : ISpriteSize {
        return this.size;
    }
    /**
     * 表示する
     */
    show() : void {
        this.entity.$show();
    }
    /**
     * 隠す
     */
    hide() : void {
        this.entity.$hide();
    }
    /**
     * 階層
     * 
     * {@link Layer}
     */
    get Layer() : ITextSpriteLayer {
        return this.layer;
    }
    /**
     * 効果
     */
    get Effect() : ITextSpriteEffect {
        return this.effect;
    }

};

