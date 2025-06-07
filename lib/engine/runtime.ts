/**
 * Runtime
 */
import { EventEmitter } from 'events';
// Virtual I/O devices.
import { Keyboard } from '../io/keyboard';

import type {IRenderWebGL} from '../render/IRenderWebGL';
declare type IODEVICES = {
    keyboard: Keyboard,
}
export class Runtime extends EventEmitter {
    private renderer:IRenderWebGL|undefined;
    public ioDevices: IODEVICES;
    /**
     * @constructor
     */
    constructor() {
        super();
        //this._target = [];
        /** @type Renderer */
        this.renderer;
        const ioDevice:IODEVICES = {
            keyboard: new Keyboard(this),
        }
        this.ioDevices = ioDevice;
    }

    get GREEN_BUTTON_ENABLED () :string{
        return 'GREEN_BUTTON_ENABLED';
    }
    /**
     * ScratchRendererを設定する
     * @param renderer {IRenderWebGL}
     */
    attachRenderer ( renderer: IRenderWebGL ) {
        this.renderer = renderer;
    }
    /**
     * 指定したキーが押されているかの判定
     * @param key {string}
     * @returns {boolean}
     */
    keyIsDown(key?: string) : boolean{
        return this.ioDevices.keyboard.keyIsDown(key);
    }

};