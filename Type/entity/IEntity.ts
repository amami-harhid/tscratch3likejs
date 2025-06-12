import type { IEntitySound } from "./IEntitySound";
import type { IEntityImage } from "./IEntityImage";
import { Render } from "@Lib/render/render";
export declare interface IEntity {
    readonly drawableID: number;
    readonly render: Render
    readonly id: string;
    readonly Sound: IEntitySound;
    readonly Image: IEntityImage;
};