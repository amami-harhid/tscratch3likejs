/**
 * Threads
 */
const INTERVAL = 1000/33;
import { PlayGround } from "../playGround";
import type { TThreadObj } from "./TThreadObj";
export class Threads {
    static instance: Threads;
    static playGround: PlayGround;
    static getInstance(){
        if(!Threads.instance) {
            Threads.instance = new Threads();
        }
        return Threads.instance;
    }
    static set p(playGround: PlayGround) {
        Threads.playGround = playGround;
    }
    static get p(): PlayGround{
        return Threads.playGround;
    }
    //private stopper: boolean;
    private _running: boolean;
    private _startSwitch: boolean;
    private _intervalId: NodeJS.Timeout|null;
    private threadArr: TThreadObj[];
    constructor(){
        //this.stopper = false;
        this.threadArr = [];
        this._intervalId = null;
        this._running = false;
        this._startSwitch = false;
    }
    get RUNNING(){
        return 'running';
    }
    get YIELD(){
        return 'yield';
    }
    get STOP(){
        return 'stop';
    }
    static get THROW_STOP_THIS_SCRIPTS(){
        return "throwStopThisScripts";
    } 
    static get THROW_FORCE_STOP_THIS_SCRIPTS(){
        return "throwForceStopThisScripts";
    } 
    getTopThreadObj(threadId){
        for(const obj of this.threadArr){
            if(obj.threadId == threadId) {
                return obj;
            }
        }
        return null;
    }
    getTopParentObj(obj){
        let _obj = obj.parentObj;
        for(;;){
            if(_obj == null || _obj.parentObj==null) break;
            _obj = _obj.parentObj;
        }
        if(_obj == null)
            return obj;
        else
            return _obj;
    }
    getLastChildObj(obj){
        let _obj = obj.childObj;
        for(;;){
            if(_obj == null || _obj.childObj == null) break;
            _obj = _obj.childObj;
        }
        if(_obj==null){
            _obj = obj;
        }
        return _obj;
    }
    createObj():TThreadObj {
        const obj: TThreadObj = {
            f:null,
            originalF:null,
            done:false, 
            status: this.YIELD,
            forceExit: false,
            threadId: null,
            entityId: null,
            childObj: null, 
            parentObj: null,
            entity: null,
            doubleRunable: true
        };
        return obj;
    }
    registThread( obj ){
        this.threadArr.push( obj );
    }
    async startAll() {
        this._startSwitch = true;
        if(this._intervalId != null) return; // この行の扱いは注意せよ！
        this._intervalId = setInterval(this.interval, INTERVAL, this);
        this._running = true;
    }
    isNotRunning(){
        return !this._running;
    }
    isRunning(){
        return this._running;
    }
    clearThreads(){
        this.threadArr = [];
    }
    pauseThreadsInterval() {
        if(this._intervalId){
            // 音なっているときは止める。
            const stage = Threads.p.stage;
            if(stage != null){
                stage.$soundStopImmediately();
                stage.$speechStopImmediately();
                if(stage.sprites != null){
                    for(const s of stage.sprites){
                        s.$soundStopImmediately();
                        s.$speechStopImmediately();
                    }    
                }    
            }
            clearInterval(this._intervalId);
            this._intervalId = null;
            this._running = false;
        }

    }
    /**
     * intervalを停止する
     * クローンをremoveする
     * threads はクリアする
     * クローン以外のスプライト、ステージはremoveしない（そのまま）
     */
    stopThreadsInterval(){
        if(this._intervalId){
            clearInterval(this._intervalId);
            this._intervalId = null;
            this.clearThreads();
            // 音なっているときは止める。
            const stage = Threads.p.stage;
            if(stage != null){
                stage.$soundStopImmediately();
                stage.$speechStopImmediately();
                if(stage.sprites != null){
                    for(const s of stage.sprites){
                        if(s){
                            s.$soundStopImmediately();
                            s.$speechStopImmediately();
                        }
                    }    
                }    
            }
        }
        this._running = false;
    }
    stopAll(){
        //this.stopper = true;
        this._running = false;
    }
    stopOtherScripts(entity){
        const me = this;
        for(const obj of me.threadArr){
            // @ts-ignore undefined error (entity.threadId). 
            if(obj.entity && obj.entity.id == entity.id && obj.threadId != entity.threadId){
                // 実行中のスレッドの途中の場合、
                // Motion,Looks,Sound,Event,Control,Sensingを使ったときは
                // Proxyのなかで例外を発生させる
                // @ts-ignore undefined error (setStopThisScriptSwitch) 
                obj.entity.setStopThisScriptSwitch(true); // 【A】
                // 「終わるまで音を鳴らす」が実行中の場合、音を強制停止させる
                obj.entity.emit(obj.entity.SOUND_FORCE_STOP);
                // 上記の【A】により例外が起きなかった場合、
                // 他のスクリプトが(next)により再実行されるときに必ず例外を起こして止める。
                
                const f = async function*(){
                    // ここで例外が起きる。
                    if(obj.entity){
                        // @ts-ignore undefined error (throwForceStopThisScripts) 
                        obj.entity.throwForceStopThisScripts();
                        //yield; // ここには到達しない                            
                    }
                }
                obj.f = f(); // Generator関数を生成
            }
        }
    }
    removeObjById(id: string, clickCounter?: number){
        if( clickCounter == undefined){
            for(const obj of this.threadArr){
                if(obj.entity && obj.doubleRunable === false && obj.entityId == id){
                    obj.forceExit = true;
                    obj.entity.$soundStopImmediately();
                    obj.entity.$speechStopImmediately();
                }
            }    
        }else{
            for(const obj of this.threadArr){
                if(obj.doubleRunable === false && obj.entityId == id && 
                        // @ts-ignore undefined error (threadCounter) 
                        obj.entity && obj.entity.threadCounter == clickCounter){
                    obj.forceExit = true;
                    obj.entity.$soundStopImmediately();
                    obj.entity.$speechStopImmediately();
                }
            }    
        }
    }
    async interval(me: Threads) {
        for(const obj of me.threadArr){
            if(obj.entity && !obj.entity.isAlive()){ // Entity生きていないとき
                obj.forceExit = true; // 強制終了とする
            }
            if(obj.status != me.STOP){
                // TODO ↓ getLastChildObj は不要だと思う。あとで確認すること。
                // obj.childObj が設定済のときは最終OBJを取り出す。
                const _obj = obj; //me.getLastChildObj(obj);
                if(_obj.f && _obj.status == me.YIELD){
                    // 投げっぱなし, Promise終了時に done をObjへ設定する
                    // await はつけずにPromise.then で解決する。
                    // await をつけると長いBGM演奏などのとき他スレッドが止まる弊害がある。
                    _obj.status = me.RUNNING;
                    try{
                        _obj.f.next().then((rslt)=>{
                            _obj.done = rslt.done || false;
                            _obj.status = me.YIELD;
                            //if(_obj.entity.getStopThisScriptSwitch() === true) {
                            //    _obj.status = me.STOP;
                            //}
                            // waitするメソッドがあるときは
                        }).catch(e=>{
                            if(_obj.entity && (e==Threads.THROW_STOP_THIS_SCRIPTS || e==Threads.THROW_FORCE_STOP_THIS_SCRIPTS)){
                                // この例外はthrowせずに objは抹消する（再実行しない）
                                _obj.forceExit = true;
                                _obj.status = me.STOP;
                                // 「終わるまで音を鳴らす」に対して、強制停止を行う(例外を起こす)
                                _obj.entity.emit(_obj.entity.SOUND_FORCE_STOP);
                            }else{
                                const f= _obj.originalF;
                                console.error(e);
                                if(f){
                                    console.error(f.toString());
                                }
                                _obj.forceExit = true;
                                throw e;    
                            }
                        }); 
    
                    }catch(e){
                        const f= _obj.originalF;
                        if(f){
                            console.error(f.toString())
                        }
                        _obj.forceExit = true;
                        throw e;    
                    }
                }
            }
        }
        // 終了したOBJは削除する
        // @type {THREAD_OBJ[]}
        const _arr:TThreadObj[] = [];
        for(const obj of me.threadArr){
            if(!(obj.forceExit || obj.done) ) {
                _arr.push(obj);
            }
        }
        me.threadArr = [..._arr];
        if(me.threadArr.length == 0){
            if( me._startSwitch === true){
                // 実行中のスレッドがなくなったとき
                // 緑の旗のボタンを押せるようにする（赤の停止ボタンは実行待ちのステータスになる）
                const runtime = Threads.p.runtime;
                const EmitID_GREEN_MARK_BUTTON_ENABLED = runtime.GREEN_BUTTON_ENABLED;
                // 個数ゼロになった直後の１回だけ emit するべき。
                runtime.emit(EmitID_GREEN_MARK_BUTTON_ENABLED);
                me._startSwitch = false;
            }
        }
        Threads.p._draw();
    }
}