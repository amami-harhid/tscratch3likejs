import { Sprite } from '../sprite';
import type { ISpriteSensingMouse } from '@Type/sprite/ISpriteSensingMouse';
import type { ISpriteSensingDistance } from '@Type/sprite/ISpriteSensingDistance';
import { SpriteSensingDistance } from './spriteSensingDistance';
/**
 * Sprite Sensing(調べる) Mouse
 */
export class SpriteSensingMouse implements ISpriteSensingMouse {
    private entity: Sprite;
    private Distance: ISpriteSensingDistance;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity:Sprite){
        this.entity = entity;
        this.Distance = new SpriteSensingDistance(entity);
    }
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    get isDown() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isMouseDown();
    }
    /**
     * マウス情報(x座標)
     */
    get x() {
        return this.entity.Mouse.x;
    }
    /**
     * マウス情報(y座標)
     */
    get y() {
        return this.entity.Mouse.y;
    }
    /**
     * 距離
     * 使用例：マウスポインターとの距離 
     * this.Sensing.Distance.mousePointer
     * 使用例：他スプライトとの距離
     * this.Sensing.Distance.to( otherSprite )
     */
    get distance(): number {
        return this.Distance.mousePointer();
    }
    /**
     * マウスカーソルへの向き
     */
    get degree(): number {
        return this.entity.degreeTowardsMouseCursol();
    }
    /**
     * マウスタッチしていないことの判定
     * @returns 
     */
    get isNotTouching() : boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isNotMouseTouching();
    }
    /**
     * マウスタッチしていることの判定
     * @returns 
     */
    get isTouching(): boolean {
        if( this.entity.$isAlive() != true ) return false;
        return this.entity.$isMouseTouching();
    }
};