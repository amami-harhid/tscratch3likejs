import { S3Stage } from "@typeJS/scratchjs/s3Stage";
import { S3Sprite } from "@typeJS/scratchjs/s3Sprite";
/** 暫定データの格納用(Entityを入れられる) */
export declare interface S3Storage {

    stage: S3Stage,

    [key:string] : S3Sprite,

}
