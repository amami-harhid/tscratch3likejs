import {S3Effect} from "../s3Effect";
import {S3Point} from "../s3Point";
import {S3Scale } from "../s3Scale";
export declare interface S3EntityOption {
    /** 位置指定 */
    position?: S3Point;
    /** 向き指定 */
    direction?: number;
    /** 大きさ指定 */
    scale?: S3Scale;
    /** 表示効果 */
    effect?: S3Effect;    
}

/** 実体(Entity) */
export interface Entity {

}
