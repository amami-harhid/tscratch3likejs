import { ImageEffective } from './ImageEffective';
/** 効果 */
export interface IEntityEffect {

    /**
     * イメージ効果を指定量だけ変える。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 変更量
     */
    change(effective:ImageEffective, value:number): void;
    /**
     * イメージ効果を指定量にする。
     * @param effective {ImageEffective} - イメージ効果
     * @param value {number} - 指定量
     */
    set(effective:ImageEffective, value:number): void;
    /**
     * イメージ効果をクリアする（初期値に戻す）
     */
    clear() : void;


}