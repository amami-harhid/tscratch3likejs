/**
 * Monitors
 */
import { Monitor } from "./monitor";
import { Libs } from "../controls/libs";
import { S3MonitorSkin } from "./s3MonitorSkin";
import { PlayGround } from "../playGround";
import type { IRenderWebGL } from "lib/render/IRenderWebGL";

export class Monitors {
    private _monitors: Monitor[];
    private _playGround: PlayGround;
    /**
     * @constructor
     */
    constructor() {
        this._monitors = [];
        this._playGround = Libs.getInstance().p;
        const render = this._playGround.render;
        const renderer = render.renderer;
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
        this._playGround.monitors = this;
    }
    /**
     * add
     * @param {string} monitorId - Monitor id 
     * @param {string} label - Monitor label 
     */
    add(monitorId, label) {
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId) {
                return;
            }
        }
        const monitor = new Monitor(monitorId, label);
        monitor.createTextSkin();
        this._monitors.push(monitor);
    }
    get(monitorId){
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                return _monitor;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    show(monitorId){
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                _monitor.show();
                break;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    hide(monitorId){
        for(const _monitor of this._monitors){
            if(monitorId === _monitor.monitorId){
                _monitor.hide();
                break;
            }
        }
        throw `指定した${monitorId}のMonitorはありません`;
    }
    draw() {
        for(const _monitor of this._monitors){
            _monitor.draw();
        }
    }
};