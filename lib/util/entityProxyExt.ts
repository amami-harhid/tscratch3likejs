/**
 * EntityProxyExt
 */
import { Threads } from '../controls/threads';
/**
 * エンティティのプロキシ拡張
 */
export class EntityProxyExt {
    /** スレッドＩＤ */
    static THREAD_ID = "threadId";
    /** スレッドカウンター */
    static THREAD_COUNTER = "threadCounter";
    /** 「他のスクリプトを削除する」メソッド名 */
    static STOP_OTHER_SCRIPTS = "$stopOtherScripts";
    /** 「このスクリプトを停止」スイッチの名前 */
    static STOP_THIS_SCRIPT_SWITCH = "$stopThisScriptSwitch";
    static SET_STOP_THIS_SCRIPT_SWITCH = "setStopThisScriptSwitch";
    static GET_STOP_THIS_SCRIPT_SWITCH = "getStopThisScriptSwitch";
    static PROP_STOP_THIS_SCRIPT_SWITCH = "stopThisScriptSwitch";
    static THREAD_NAME = "threadName";
    /** プロキシテスター */
    static IS_PROXY_TEST = "isProxyTest"

    
    /** プロキシの定義 */
    static getProxy(obj, callback) {

        const proxy = new Proxy(obj, {
            get(target, name, receiver) {
                // 実体がプロキシであるかをチェックする
                if(name == EntityProxyExt.IS_PROXY_TEST){
                    return (_=>true);
                }
                // スレッドＩＤを返す
                if (name == EntityProxyExt.THREAD_ID) {
                        // @ts-ignore : threadId は定義なしだがOK 
                        return this.threadId;
                }
                if(name == EntityProxyExt.THREAD_NAME) {
                        // @ts-ignore : threadName は定義なしだがOK 
                        return this.threadName;
                }
                // スレッドカウンターを返す
                if(name == EntityProxyExt.THREAD_COUNTER){
                        // @ts-ignore : threadCounter は定義なしだがOK 
                        return this.threadCounter;
                }
                if(name == EntityProxyExt.PROP_STOP_THIS_SCRIPT_SWITCH){
                    const self = this;                    
                    // @ts-ignore : stop_this_script_switchは定義なしだがOK 
                    return self.stop_this_script_switch;
                }
                if(name == EntityProxyExt.GET_STOP_THIS_SCRIPT_SWITCH){
                    const self = this;                    
                    return function(){
                        // @ts-ignore : stop_this_script_switchは定義なしだがOK 
                        return self.stop_this_script_switch;
                    }
                }
                if(name == EntityProxyExt.SET_STOP_THIS_SCRIPT_SWITCH){
                    const self = this;                    
                    return function(value: boolean){
                        // @ts-ignore : stop_this_script_switchは定義なしだがOK 
                        self.stop_this_script_switch = value;
                    }
                }
                //「このスクリプトを停止」スイッチオンのとき
                // @ts-ignore : stop_this_script_switchは定義なしだがOK 
                if(this.stop_this_script_switch === true){
                    if(name == 'Motion' || 
                        name == 'Looks' ||
                        name == 'Sound' ||
                        name == 'Event' ||
                        name == 'Control' ||
                        name == 'Sensing' ||
                        name == 'Image'
                    ){
                        // 「このスクリプトを停止」スイッチオンのときは
                        // 例外を発生させる。
                        throw Threads.THROW_STOP_THIS_SCRIPTS;
                    }
                }
                if(name == Threads.THROW_FORCE_STOP_THIS_SCRIPTS) {
                    return function() {
                        throw Threads.THROW_FORCE_STOP_THIS_SCRIPTS;
                    }
                }
                // @ts-ignore : ...arguments は任意のメソッドに対応させるため。 
                return Reflect.get(...arguments);
            },
            set(target, name, value) {
                // スレッドＩＤのセッター
                if(name == EntityProxyExt.THREAD_ID){
                    // @ts-ignore : threadId は定義なしだがOK 
                    this.threadId = value;
                    return true;
                }
                // スレッドカウンターのセッター
                if(name == EntityProxyExt.THREAD_COUNTER){
                    // @ts-ignore : threadCounter は定義なしだがOK 
                    this.threadCounter = value;
                    return true;
                }
                // 「このスクリプトを停止」スイッチのセッター
                if(name == EntityProxyExt.PROP_STOP_THIS_SCRIPT_SWITCH){
                    // @ts-ignore : stop_this_script_switch は定義なしだがOK 
                    this.stop_this_script_switch = value;
                    return true;
                }
                if(name == EntityProxyExt.THREAD_NAME) {
                    // @ts-ignore : threadName は定義なしだがOK 
                    this.threadName = value;
                    return true;
                }
                // @ts-ignore : ...arguments は任意のメソッドに対応させるため。 
                return Reflect.set(...arguments);
            }
        });
        
        return proxy;
    }
};