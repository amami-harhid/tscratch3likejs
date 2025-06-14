import type { IStageFont } from '@Type/stage/IStageFont';
import { Stage } from '../stage';
/**
 * StageFont
 */
export class StageFont implements IStageFont {
    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        this.entity = entity;
    }

    async add(fontName: string) : Promise<void>{
        await this.entity.$addFont(fontName);
    }

    get names() : string[] {
        return this.entity.$getImageNames();
    }
};