/**
 * Monitors
 */
import { Monitor } from "./monitor";
import { Libs } from "../controls/libs";
import { S3MonitorSkin } from "./s3MonitorSkin";
import { PgMain } from "../pgMain";
import { MonitorMaxRowSize } from "./monitorPosition";
import type { IMonitors } from "@Type/monitors";
import { IRenderWebGL } from "@Type/render/IRenderWebGL";

export class Monitors implements IMonitors{
    private _renderer: IRenderWebGL;
    private _monitors: Monitor[];
    private _pgMain: PgMain;
    /**
     * @constructor
     */
    constructor() {
        this._monitors = [];
        this._pgMain = Libs.getInstance().p;
        const render = this._pgMain.render;
        const renderer = render.renderer;
        this._renderer = renderer;
        /**
         * (独自関数) monitorSkin を作成する
         * @param drawableID {number}
         * @param label {string}
         * @returns SkinId (number)
         */
        function s3CreateMonitorSkin(drawableID: number, label: string) :number {
            const skinId = renderer._nextSkinId++;
            const newSkin = new S3MonitorSkin(skinId, renderer, label );
            const drawable = renderer._allDrawables[drawableID];
            renderer._allSkins[skinId] = newSkin;
            drawable.skin = newSkin;
            return skinId;
        }
        /**
         * (独自関数) monitorSkin を取得する
         * @param skinId {number}
         * @returns {S3MonitorSkin}
         */
        function getS3Skin(skinId: number) : S3MonitorSkin{
            return renderer._allSkins[skinId] as S3MonitorSkin;
        }
        renderer.s3CreateMonitorSkin = s3CreateMonitorSkin;
        renderer.getS3Skin = getS3Skin;
        this._pgMain.monitors = this;
    }
    /**
     * IDとラベルを指定して モニターを追加する.
     * IDが重複する場合は追加しない.
     * @param {string} monitorId - Monitor id 
     * @param {string} label - Monitor label 
     */
    add(monitorId: string, label: string): void {
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId) {
                return;
            }
        }
        const monitor = new Monitor(monitorId, label);
        monitor.createTextSkin();
        monitor.scale = {w: 100, h:100};
        monitor.text = '';
        this._monitors.push(monitor);
        this.reposition();
    }
    reposition() : void {

        for(let _idx = 0; _idx < this._monitors.length; _idx++){
            const monitor = this._monitors[_idx];
            this._reposition(monitor, _idx);
        }
        this.draw();
    }
    private _reposition(monitor: Monitor, index: number) : void {
        const _column = Math.floor( (index) / MonitorMaxRowSize);
        const _row = (index) % MonitorMaxRowSize;
        monitor.position.x = 0;
        const size = index+1;
        const sWidth = this._pgMain.stageWidth;
        const sHeight = this._pgMain.stageHeight;
        const startRowPos = 5;
        const startColumnPos = 5;
        const rowFiller = 5;
        const columnFiller = 5;
        if(_column == 0) {
            // 1列目の場合
            const x = startColumnPos - Math.floor(sWidth/2);
            if( _row == 0 ) {
                // 1行目の場合
                const y = Math.floor(sHeight/2) - startRowPos;
                monitor.position.x = x;
                monitor.position.y = y;
            }else{
                // 2行目以降の場合
                const preMonitor = this._monitors[size-2];
                // 1つ前のモニターのy座標
                const preMonitorY = preMonitor.position.y;
                const preMonitorDrawableId = preMonitor.drawableID;
                const bounds = this._renderer.getBounds(preMonitorDrawableId);
                // 1つ前のモニターの高さ
                const h = Math.abs( bounds.top - bounds.bottom ); //*preMonitor.scale.h/100;
                monitor.position.x = x;
                const y = preMonitorY - h - rowFiller;
                monitor.position.y = y;
            }
        }else{
            // ひとつ前の列の同じ行のモニター
            const idx = size - MonitorMaxRowSize;
            const preColumnMonitor = this._monitors[idx-1];
            // X 座標
            const preColumnMonitorX = preColumnMonitor.position.x;
            const preColumnMonitorId = preColumnMonitor.drawableID;
            const bounds = this._renderer.getBounds(preColumnMonitorId);
            // 幅
            const w = Math.abs(bounds.right - bounds.left); //*preColumnMonitor.scale.w/100;
            // 新X
            monitor.position.x = preColumnMonitorX + w + columnFiller;
            if( _row == 0 ) {
                monitor.position.y = Math.floor(sHeight/2) - startRowPos;
            }else{
                // ひとつ前
                const preMonitor = this._monitors[size-2];
                // 1つ前のモニターのy座標
                const preMonitorY = preMonitor.position.y;
                const preMonitorDrawableId = preMonitor.drawableID;
                const bounds = this._renderer.getBounds(preMonitorDrawableId);
                // 1つ前のモニターの高さ
                const h = Math.abs( bounds.top - bounds.bottom ); //*preMonitor.scale.h/100;
                const y = preMonitorY - h - rowFiller;
                monitor.position.y = y;
            }

        }

    }
    /**
     * 指定したIDのモニターを返す
     * @param monitorId {string}
     * @returns {Monitor}
     */
    get(monitorId: string): Monitor{
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                return _monitor;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    /**
     * 指定したIDのモニターを表示する
     * @param monitorId 
     */
    show(monitorId: string): void{
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                _monitor.show();
                break;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    /**
     * 指定したIDのモニターを隠す
     * @param monitorId {string}
     */
    hide(monitorId: string): void{
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                _monitor.hide();
                break;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    /**
     * 全てのMonitorを描画する
     */
    draw() {
        for(const _monitor of this._monitors){
            _monitor.draw();
        }
    }
};