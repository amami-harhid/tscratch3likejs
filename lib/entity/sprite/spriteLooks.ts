import { Sprite } from '../sprite';
import { SpriteSize } from '../sprite/spriteSize';
import { SpriteLayer } from '../sprite/spriteLayer';
import { SpriteEffect } from '../sprite/spriteEffect';
import { SpriteBubble } from '../sprite/spriteBubble';
/**
 * Sprite Looks(見た目)
 */
export class SpriteLooks {
    private entity: Sprite;
    private layer: SpriteLayer;
    private effect: SpriteEffect;
    private size : SpriteSize;
    private bubble: SpriteBubble;
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
    }
    /**
     * コスチューム番号、コスチューム名を取り出すためのオブジェクト
     */
    get Costume() {
        return this.entity.Costume;
    }
    /**
     * 背景番号、背景名を取り出すためのオブジェクト
     */
    get Backdrop(){
        return this.entity.Backdrop;
    }
    /**
     * 次のコスチュームにする
     */
    nextCostume() {
        this.entity.$nextCostume();
    }
    /**
     * コスチュームを切り替える
     * @param costume {number|string} - コスチューム
     */
    switchCostume(costume:number|string) :void {
        this.entity.$switchCostume(costume);
    }
    /**
     * 次の背景にする
     */
    nextBackdrop(): void {
        this.entity.$nextBackdrop();
    }
    switchBackdrop(backdrop: number|string ): void {
        this.entity.$switchBackdrop(backdrop);
    }
    /**
     * サイズ
     */
    get Size() : SpriteSize {
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
    get Effect() : SpriteEffect {
        return this.effect;
    }
    /**
     * フキダシ
     */
    get Bubble() : SpriteBubble {
        return this.bubble;
    }

};

