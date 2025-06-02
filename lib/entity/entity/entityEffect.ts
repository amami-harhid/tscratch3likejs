import { Entity } from '../entity';
import type { IEntity } from '@Type/entity/IEntity';
import { ImageEffective } from '../../../Type/entity/ImageEffective';

/** 効果 */
export class EntityEffect {

    protected entity: Entity;
    /**
     * @internal
     * @param entity {Entity}
     */
    constructor(entity:IEntity){
        this.entity = entity as unknown as Entity;
    }
    /**
     * イメージ効果を指定量だけ変える。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 変更量
     */
    change(effective:ImageEffective, value:number): void {
        this.entity.$changeEffectBy(effective, value);
    }
    /**
     * イメージ効果を指定量にする。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 指定量
     */
    set(effective:ImageEffective, value:number): void {
        this.entity.$setEffectTo(effective, value);
    }
    /**
     * イメージ効果をクリアする（初期値に戻す）
     */
    clear() : void {
        this.entity.$clearEffect();
    }


}