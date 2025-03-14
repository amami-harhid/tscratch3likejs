import { S3PlayGround } from "@typeJS/scratchjs/s3PlayGround";
import { S3Storage } from "@typeJS/scratchjs/s3Storage";
import { S3Libs } from "@typeJS/scratchjs/s3Libs";
import { S3Images } from "@typeJS/scratchjs/s3Images";
import { S3Sounds } from "@typeJS/scratchjs/s3Sounds";
/** LikeScratchJsLib */
export interface LikeScratchLib {
    PlayGround: S3PlayGround;
    /** 暫定データの格納用  */
    Storage: S3Storage;
    /** ライブラリー */
    Libs: S3Libs;
    /** イメージ格納先 */
    Images:S3Images;
    /** サウンド格納先 */
    Sounds:S3Sounds;
}