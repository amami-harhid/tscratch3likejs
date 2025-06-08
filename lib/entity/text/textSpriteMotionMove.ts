import { ITextSpriteMotionMove } from '@Type/text/ITextSpriteMotionMove';
import { TextSprite } from './textSprite';
import { SpriteMotionMove } from '../sprite/spriteMotionMove';
export class TextSpriteMotionMove implements ITextSpriteMotionMove {
    private entity: TextSprite;
    /**
     * @internal
     * @param entity {TextSprite}
     */
    constructor(entity:TextSprite){
        this.entity = entity;
    }
    /**
     * ステップ数分、進ませる
     * @param steps {number} - ステップ数
     */
    steps(steps: number): void {
        this.entity.$moveSteps(steps);
    }
    /**
     * 指定座標へ移動する
     * @param x {number} - X座標
     * @param y {number} - Y座標
     */
    toXY(x:number, y:number): void {
        this.entity.$goToXY(x, y);
    }

};