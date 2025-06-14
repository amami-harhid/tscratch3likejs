import type { IStagePen } from '@Type/stage/IStagePen';
import { Stage } from '../stage';
import { ISprite } from '@Type/sprite';

/** 
 * StagePen 
 */
export class StagePen implements IStagePen{

    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity: Stage){
        this.entity = entity;
    }

    clear(): void {
        const sprites : ISprite[] = this.entity.sprites;
        for(const s of sprites) {
            if(s.Pen.isPrepareDone() === true){
                s.Pen.clear();
            }
        }
    }
}
