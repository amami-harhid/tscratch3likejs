/** 制御処理 */
export interface S3ControlFunctions {
    /** 指定した秒数分待つ(await必要) */
    wait(second: number) : Promise<any>;
    /** 指定した条件が成立するまで待つ(await任意) */
    waitUntil(condition: Function) : Promise<any>;
    /** 指定した条件が成立する間、待つ(await任意) */
    waitWhile(condition: Function) : Promise<any>;
    /** ずっと繰り返す(await任意) */
    forever(process: Function) : Promise<any>;
    /** 指定した条件が成立する間、繰り返す(await任意) */
    while(condition: Function|boolean, process:Function ) : Promise<any>;
    /** 指定した回数、繰り返す(await任意) */
    repeat(count: number, process:Function ) : Promise<any>;
    /** 指定した条件が成立するまで、繰り返す(await任意) */
    repeatUntil(condition: Function, process:Function ) : Promise<any>;
}
