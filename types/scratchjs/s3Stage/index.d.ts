import {S3ImageFunctions} from "@typeJS/scratchjs/s3ImageFunctions";
import {S3SoundFunctions} from "@typeJS/scratchjs/s3SoundFunctions";
import {S3ControlFunctions} from "@typeJS/scratchjs/s3ControlFunctions";
import {S3EventFunctions} from "@typeJS/scratchjs/s3EventFunctions";

/** イベント処理 */
declare interface S3StageEventFunctions extends S3EventFunctions{
    /** 次の背景にする */
    nextBackdrop() : void;
    /** 背景を切り替える */
    switchBackdrop(val: string | number ) : void;
}

/** ステージ（実体[Entity]を継承）*/
export interface S3Stage extends S3Entity{
    new(): S3Stage;
    Image: S3ImageFunctions;
    Event: S3StageEventFunctions;
    Control: S3ControlFunctions;
    Sound: S3SoundFunctions;
    Looks: S3StageEventFunctions;
}
