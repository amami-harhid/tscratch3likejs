import {S3ImageElem} from "../s3ImageElem"
/** イメージ格納用 */
declare interface S3ImagePool {
     [key:string] : S3ImageElem,
}
