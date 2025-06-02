import { Sprite } from '../sprite';
import { RotationStyle } from '../../../Type/entity/RotationStyle';

export class SpriteMotionRotation {
    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
    }
    /**
     * 回転方法
     * 
     * {@link RotationStyle}
     */
    get style(): RotationStyle {
        return this.entity.$getRotationStyle();
    }
    /**
     * 回転方法
     * 
     * {@link RotationStyle}
     */
    set style(style: RotationStyle) {
        this.entity.$setRotationStyle(style);
    }
};