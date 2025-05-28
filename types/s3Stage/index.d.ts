import {S3EventFunctions} from "../s3EventFunctions";
import {S3ImageFunctions} from "../s3ImageFunctions";
import {S3LooksFunctions} from "../s3LooksFunctions";
import {S3SoundFunctions} from "../s3SoundFunctions";
import {S3SensingFunctions} from "../s3SensingFunctions";
import {Entity, S3EntityOption} from '../s3Entity';
import { S3ControlFunctions } from "../s3ControlFunctions";

/** イベント処理 */
declare interface S3StageEventFunctions extends S3EventFunctions{
}
declare interface S3StageLooksFunctions extends S3LooksFunctions{
}
declare interface S3StageSensingFunctions extends S3SensingFunctions{
}
declare interface S3StageContorlFunctions extends S3ControlFunctions {
}

/** ステージ（実体[Entity]を継承）*/
export interface Stage extends Entity{
    /**
     * @constructor
     * ```ts
     * let stage: Stage;
     * stage = new Lib.Stage();
     * ```
     */
    new(): Stage;
    /** イメージ */
    Image: S3ImageFunctions;
    /** サウンド */
    Sound: S3SoundFunctions;
    /** 見た目 */
    Looks: S3StageLooksFunctions;
    /** イベント */
    Event: S3StageEventFunctions;
    /** 制御 */
    Control: S3StageContorlFunctions;
    /** 調べる */
    Sensing: S3StageSensingFunctions;
}
