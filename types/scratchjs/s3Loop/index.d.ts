import {S3Stage} from "@typeJS/scratchjs/s3Stage"
import {S3Sprite} from "@typeJS/scratchjs/s3Sprite"
/** ループ処理用関数 */
export interface Loop {
    /** 『break』する */
    break(): void;
    /** 『continue』する */
    continue(): void;
}
