import type { ISpriteDragMode } from "./ISpriteDragMode";
import type { IEntitySensing } from "../entity/IEntitySensing";
import type { ISpriteSensingEdge } from './ISpriteSensingEdge';
import type { ISpriteSensingColor } from './ISpriteSensingColor';
import type { ISpriteSensingMouse } from './ISpriteSensingMouse';
import type { ISpriteSensingSprite } from './ISpriteSensingSprite';
/**
 * Sprite Sensing(調べる)
 */
export interface ISpriteSensing extends IEntitySensing{

    /**
     * 端関連
     */
    readonly Edge: ISpriteSensingEdge;
    /**
     * マウス関連
     */
    readonly Mouse: ISpriteSensingMouse;
    /**
     * 色関連
     */
    readonly Color: ISpriteSensingColor;

    /**
     * スプライト関連
     */
    readonly Sprite: ISpriteSensingSprite;

    /**
     * Drag Mode
     */
    readonly DragMode :ISpriteDragMode;
};