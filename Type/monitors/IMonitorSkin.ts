/**
 * S3MonitorSkin
 */
export interface IMonitorSkin {
    get dropping( ): boolean;
    set dropping( _dropping: boolean );
    /**
     * @return {int} the unique ID for this Skin.
     */
    get id () : number;
    /**
     * @return {Array<number>} the "native" size, in texels, of this skin.
     */
    get size () : number[];

    get x () :number;
    get y () :number;
    set x (_x: number);
    set y (_y: number);
    show(): void;
    hide(): void;
    /**
     * Set parameters for this text monitor.
     * @param {string|number} value 
     */
    set value (value: string|number);
    get value() :string|number;
};