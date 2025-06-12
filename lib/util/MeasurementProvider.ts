import { IMeasurementProvider } from '@Type/util/IMeasurementProvider';
/**
 * MeasurementProvider
 */
export class MeasurementProvider implements IMeasurementProvider{

    private _ctx: CanvasRenderingContext2D;
    private _cache: {[key:string]: number};
    
    /**
     * @param {CanvasRenderingContext2D} ctx - provides a canvas rendering context
     * with 'font' set to the text style of the text to be wrapped.
     */
    constructor (ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._cache = {};
    }

    /**
     * 文字列の長さを測定する、測定値はキャッシュする.
     * @param {string} text - 測定対象の文字列.
     * @returns {number} - 文字列の長さ.
     */
    measureText (text: string): number {
        if (!this._cache[text]) {
            this._cache[text] = this._ctx.measureText(text).width;
        }
        return this._cache[text];
    }

    // 以降のメソッドは後で消す
    /**
     * Called by the TextWrapper before a batch of zero or more calls to measureText().
     */
    beginMeasurementSession () {}

    /**
     * Called by the TextWrapper after a batch of zero or more calls to measureText().
     */
    endMeasurementSession () {}

};