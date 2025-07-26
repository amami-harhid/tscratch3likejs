import { Stage} from '../stage';
import { StageSensingKey } from './stageSensingKey';
import type { IStageSensing } from '@Type/stage/IStageSensing';
import type { IEntitySensingMouse } from '@Type/entity/IEntitySensingMouse';
import type { IEntitySensingKey } from '@Type/entity/IEntitySensingKey';
/**
 * Stage Sensing(調べる) Mouse
 */
export class StageSensingMouse implements IEntitySensingMouse {
    private entity: Stage;
    /**
     * @internal
     * @param entity {Stage}
     */
    constructor(entity:Stage){
        this.entity = entity;
    }
    /**
     * マウスが押されていることの判定
     * @returns {boolean} - マウスが押されている判定
     */
    get isDown() : boolean {
        return this.entity.$isMouseDown();
    }

    /**
     * マウス情報 (x座標)
     */
    get x() : number {
        return this.entity.Mouse.x;
    }
    /**
     * マウス情報 (y座標)
     */
    get y() : number {
        return this.entity.Mouse.y;
    }
};