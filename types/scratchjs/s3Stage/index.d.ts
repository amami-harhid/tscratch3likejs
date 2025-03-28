import {S3EventFunctions} from "../s3EventFunctions";
import {S3ImageFunctions} from "../s3ImageFunctions";
import {S3LooksFunctions} from "../s3LooksFunctions";
import {S3SoundFunctions} from "../s3SoundFunctions";
import {S3Entity} from '../s3Entity';

/** イベント処理 */
declare interface S3StageEventFunctions extends S3EventFunctions{
    /** 次の背景にする */
    nextBackdrop() : void;
    /** 背景を切り替える */
    switchBackdrop(val: string | number ) : void;
}
declare interface S3StageLooksFunctions extends S3LooksFunctions{
    /** 次の背景にする */
    nextBackdrop(): void;
    /** 指定した名前(または番号)で背景を切り替える */
    switchBackdrop(backdrop: string | number): void;
 }

/** ステージ（実体[Entity]を継承）*/
export interface S3Stage extends S3Entity{
    new(): S3Stage;
    Image: S3ImageFunctions;
    Event: S3StageEventFunctions;
    Control: S3ControlFunctions;
    Sound: S3SoundFunctions;
    Looks: S3StageLooksFunctions;
}
