/**
 * MeasurementProvider
 */
export interface IMeasurementProvider {

    /**
     * 文字列の長さを測定する、測定値はキャッシュする.
     * @param {string} text - 測定対象の文字列.
     * @returns {number} - 文字列の長さ.
     */
    measureText (text: string): number;


};