import { Sprite } from '../sprite';
import { ISprite } from '@Type/sprite/ISprite';
import { Utils } from "../../util/utils";
import type { ISpriteSensingDistance } from '@Type/sprite/ISpriteSensingDistance';

/** 距離 */
export class SpriteSensingDistance implements ISpriteSensingDistance{

    private entity: Sprite;
    /**
     * @internal
     * @param entity {Sprite}
     */
    constructor(entity: Sprite){
        this.entity = entity;
    }
    /**
     * マウスカーソルとの距離
     * @returns 
     */
    mousePointer(): number {
        const obj1 = {
            x: this.entity.$_position.x,
            y: this.entity.$_position.y,
        }
        const obj2 = {
            x: this.entity.Sensing.Mouse.x,
            y: this.entity.Sensing.Mouse.y,
        }
        const _distance = Utils.distance(obj1, obj2);
        return _distance;
    }
    /**
     * 他スプライトとの距離
     * @param otherSprite 
     * @returns 
     */
    to(otherSprite:ISprite) : number {
        const _otherSprite: Sprite = otherSprite as unknown as Sprite;
        if(_otherSprite && (_otherSprite.isSprite === true )){
            const obj1 = {
                x: this.entity.$_position.x,
                y: this.entity.$_position.y,
            }
            const obj2 = {
                x: _otherSprite.$_position.x,
                y: _otherSprite.$_position.y,
            }
            const _distance = Utils.distance(obj1, obj2);
            return _distance;
        }
        return -1;
    }
}
