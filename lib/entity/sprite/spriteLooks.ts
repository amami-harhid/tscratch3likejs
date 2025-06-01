import { Sprite } from '../sprite';
import { SpriteSize } from '../sprite/spriteSize';
import { SpriteLayer } from '../sprite/spriteLayer';
import { SpriteEffect } from '../sprite/spriteEffect';
import { SpriteBubble } from '../sprite/spriteBubble';
import type { ISprite } from '@Type/sprite';
import type { ISpriteBubble } from '@Type/sprite/ISpriteBubble';
import type { ISpriteLooks } from '@Type/sprite/ISpriteLooks';
import { ISpriteCostume } from '@Type/sprite/ISpriteCostume';
import { SpriteCostume } from './spriteCostume';
import { ISpriteBackdrop } from '@Type/sprite/ISpriteBackdrop';
import { SpriteBackdrop } from './spriteBackdrop';
import { ISpriteEffect } from '@Type/sprite/ISpriteEffect';
import { ISpriteSize } from '@Type/sprite/ISpriteSize';
/**
 * Sprite Looks(見た目)
 */
export class SpriteLooks implements ISpriteLooks{
    private entity: Sprite;
    private layer: SpriteLayer;
    private effect: ISpriteEffect;
    private size : ISpriteSize;
    private bubble: ISpriteBubble;
    private costume: ISpriteCostume;
    private backdrop: ISpriteBackdrop;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
        this.layer = new SpriteLayer(entity);
        this.effect = new SpriteEffect(entity);
        this.size = new SpriteSize(entity);
        this.bubble = new SpriteBubble(entity);
        this.costume = new SpriteCostume(entity);
        this.backdrop = new SpriteBackdrop(entity);
    }
    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     */
    get Costume() : ISpriteCostume {
        return this.costume;
    }
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(): ISpriteBackdrop{
        return this.backdrop;
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
    get Layer() : SpriteLayer {
        return this.layer;
    }
    /**
     * 効果
     */
    get Effect() : ISpriteEffect {
        return this.effect;
    }
    /**
     * フキダシ
     */
    get Bubble() : ISpriteBubble {
        return this.bubble;
    }

};

