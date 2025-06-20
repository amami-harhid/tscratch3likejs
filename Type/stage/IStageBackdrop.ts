/** 背景 */
import type { IEntityBackdrop } from "@Type/entity/IEntityBackdrop";
/**
 * StageBackdrop
 */
export interface IStageBackdrop extends IEntityBackdrop {
    /**
     * コスチューム名 配列
     */
    readonly names : string[];
    
    switchAndWait(name: string): Promise<void>;

    nextAndWait(): Promise<void>;

    previousAndWait(): Promise<void>;

    randomAndWait(): Promise<void>;
}
