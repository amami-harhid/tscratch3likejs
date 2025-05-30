import type { IEntitySound } from "./IEntitySound";
import type { IEntityImage } from "./IEntityImage";
export declare interface IEntity {

    get Sound(): IEntitySound;
    get Image(): IEntityImage;
};