/**
 * Target class
 */
import { EventEmitter } from "events";
import { Runtime } from "./runtime";
export class Target extends EventEmitter {
    public runtime: Runtime;
    /**
     * コンストラクター
     * @constructor
     * @param runtime {Runtime}
     */
    constructor(runtime: Runtime) {
        super();
        this.runtime = runtime;
    }
};