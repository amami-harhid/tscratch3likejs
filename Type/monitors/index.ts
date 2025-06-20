import type { IMonitor } from "./monitor";

/**
 * Monitors
 */
export interface SMonitors{
    new(): IMonitors;    
}
export interface IMonitors{
    /**
     * IDとラベルを指定して モニターを追加する.
     * IDが重複する場合は追加しない.
     * @param {string} monitorId - Monitor id 
     * @param {string} label - Monitor label 
     */
    add(monitorId: string, label: string): void;
    /**
     * 指定したIDのモニターを返す
     * @param monitorId {string}
     * @returns {Monitor}
     */
    get(monitorId: string): IMonitor;
    /**
     * 指定したIDのモニターを表示する
     * @param monitorId 
     */
    show(monitorId: string):void;
    /**
     * 指定したIDのモニターを隠す
     * @param monitorId {string}
     */
    hide(monitorId: string): void;
    /**
     * 全てのMonitorを描画する
     */
    draw(): void;
};