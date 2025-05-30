import { Sprite } from '../sprite';
import type { TypeRotationStyle } from '@Type/entity/TRotationStyle';

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
    get style(): TypeRotationStyle {
        return this.entity.$getRotationStyle();
    }
    /**
     * 回転方法
     * 
     * {@link RotationStyle}
     */
    set style(style: TypeRotationStyle) {
        this.entity.$setRotationStyle(style);
    }
};