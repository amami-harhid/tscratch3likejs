import {S3Stage} from "@typeJS/scratchjs/s3Stage"
import {S3Sprite} from "@typeJS/scratchjs/s3Sprite"
import {S3Point} from "@typeJS/scratchjs/s3Point";
import {S3ImageEffective} from "@typeJS/scratchjs/s3ImageEffective";
import {S3Monitors} from "@typeJS/scratchjs/s3Monitors";
declare interface Loop {
    /** ループ内で breakする */
    break() : void;
    /** ループ内で continue する */
    continue() : void;
}

declare interface S3Env {
    /** 1FPS単位の時間(ms) */
    pace : number,
    /** TRUEのときフキダシの大きさをスプライトに併せて変化させる */
    bubbleScaleLinkedToSprite : boolean,
    /** ブラウザウィンドウのサイズ */
    WindowSize : {w: number, h: number},
}

/** 回転方法 */
export interface S3RotationStyle {
    /** 左右のみ */
    LEFT_RIGHT: string;
    /** 回転しない */
    DONT_ROTATE: string;
    /** 自由に回転 */
    ALL_AROUND: string;
}

/** サウンドオプション */
declare interface S3SoundOption {
    /** ボリューム */
    VOLUME : string;
    /** ピッチ */
    PITCH : string;
}


/** 計算ユーティリティ */
declare interface S3MathUtils {
    /** デグリーからラジアンへ変換 */
    degToRad(degree: number): number;
    /** ラジアンからデグリーへ変換 */
    radToDeg(radian: number): number;
}

/** 利用クラス格納ライブラリー */
export interface S3Libs {
    /** ステージクラス */
    Stage : S3Stage;
    /** スプライトクラス */
    Sprite : S3Sprite;
    /**
     * 指定したミリ秒経過するまで待つ (await必須)
     * @param ms ﾐﾘ秒
     */
    //wait(ms:number): Promise<any>;
    
    /**
     * 条件が成立する間、待つ (await必須)
     * conditionの例： ()=> x>10 
     * @param condition 条件 
     */
    waitWhile( condition: CallableFunction): Promise<any>;
    /** 見た目効果 */
    ImageEffective: S3ImageEffective;
    /** 回転方法 */
    RotationStyle: S3RotationStyle;
    /** ループの制御 */
    Loop: Loop;
    /** サウンドオプション */
    SoundOption: S3SoundOption;
    /** ステージのランダムな位置 */
    randomPoint: {x: number, y: number};
    /** 環境設定 */
    Env: S3Env;

    /** 計算ユーティリティ */
    MathUtils : S3MathUtils;

    /**
     * 指定した範囲の中でランダムな値を返す
     * @param min 
     * @param max 
     * @param forceAsDecimal True時には強制的に小数値として扱う。省略時はFalse。
     */
    getRandomValueInRange( min: number, max: number, forceAsDecimal?: boolean): number;
    /**
     * 指定したキーが押されているとき true
     * @param key 指定するキー
     */
    keyIsDown(key: string) : boolean;
    /**
     * 何かのキーが押されているとき true
     */
    anyKeyIsDown() : boolean;
    /**
     * レンダリング率
     */
    renderRate: {x: number, y: number};
    /** マウスの位置 */
    mousePosition: {x: number, y: number};
    /** ステージ上のランダムな位置 */
    randomPoint: {x: number, y: number};
    /** ランダムな向き */
    randomDirection: number;
    /** ステージ幅 */
    stageWidth : number;
    /** ステージ高さ */
    stageHeight : number;

    FunctionChecker : any;
    /** 指定した回数分のイテレーター */
    Iterator(n: number):  Iterable<number>; 
    /** モニタークラス */
    Monitors: S3Monitors;
}
