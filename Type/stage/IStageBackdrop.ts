/** 背景 */
import { IEntityBackdrop } from "@Type/entity/IEntityBackdrop";
/**
 * StageBackdrop
 */
export interface IStageBackdrop extends IEntityBackdrop {

    switchAndWait(name: string): Promise<void>;

    nextAndWait(): Promise<void>;

    previousAndWait(): Promise<void>;

    randomAndWait(): Promise<void>;
}
