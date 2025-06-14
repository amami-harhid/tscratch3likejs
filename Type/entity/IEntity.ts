import { IRender } from "../render/IRender";
export declare interface IEntity {
    readonly drawableID: number;
    readonly render: IRender
    readonly id: string;
};