/** 位置 */
export declare type TPositionCanEmpty = {
    x?: number,
    y?: number,
};
export declare type TPosition = {
    x: number,
    y: number,
};
declare interface TwoNumberArray {
    0: number,
    1: number,
    length: 2,
}
export declare type TPositionArray = TwoNumberArray;
/** スケール */
export declare type TScaleCanEmpty = {
    w?: number,
    h?: number,
}
/** スケール */
export declare type TScale = {
    w: number,
    h: number,
}
export declare type TScaleArr = TwoNumberArray;

/** サイズ */
export declare type TSize = {
    width: number,
    height: number,
}
/** サイズ (X,Y) */
export declare type TSizeXY = {
    x: number,
    y: number,
}
/** 距離 */
export declare type TDistance = {
    x?: number,
    y?: number,
}

/** 上下左右の大きさ */
export declare type TBounds = {
    top: number,
    bottom: number,
    left: number,
    right: number,
}

/** Vec3 */
export declare type TVec3 = {
    x: number,
    y: number,
    z: number,
}
export declare type S3ImageData = {name:string, data:string|HTMLImageElement};
export declare type S3SoundData = {name?:string, data?:Uint8Array<ArrayBuffer>};