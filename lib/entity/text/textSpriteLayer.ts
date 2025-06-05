import { Sprite } from '../sprite';
import { ITextSpriteLayer } from '@Type/text/ITextSpriteLayer';
import { TextSprite } from './textSprite';

/** 階層 */
export class TextSpriteLayer implements ITextSpriteLayer{
 
    private entity: TextSprite;
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
        this.entity = entity;
    }

    /**
     * @internal
     * 最前面にする
     */
    gotoFront() : void {
        this.entity.$goToFront();
    }
    /**
     * @internal
     * 最背面にする
     */
    gotoBack() : void {
        this.entity.$goToBack();
    }
    /**
     * @internal
     * 手前に出す
     * @param nLayer　{number} - 階層数 
     */
    goForwardLayers(nLayer: number) : void {
        this.entity.$goForwardLayers(nLayer);
    }
    /**
     * 奥に下げる
     * @param nLayer {number} - 階層数
     */
    goBackwardLayers(nLayer: number) : void {
        this.entity.$goBackwardLayers(nLayer);
    }

}