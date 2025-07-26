/** 
 * DragMode 
 */
export interface ISpriteDragMode {
    /**
     * ドラッグ中
     */
    get dragging(): boolean;
    /**
     * ドラッグ可能
     */
    get draggable(): boolean;

    /**
     * ドラッグ可能
     */
    set draggable(draggable: boolean);
}
