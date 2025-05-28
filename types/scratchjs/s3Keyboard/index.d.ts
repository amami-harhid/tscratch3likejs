/** 
 * キーボードキー 
 * ```ts
 *  if( this.Sensing.isKeyDown( Lib.Keyboard.LEFT )) {
 *      console.log('左矢印キーがおされている');
 *  }
 * ```
 * */
export interface S3Keyboard {
    /** スペースキー */
    SPACE: string;
    /** 左矢印キー */
    LEFT: string;
    /** 右矢印キー */
    RIGHT: string;
    /** 上向き矢印キー */
    UP: string;
    /** 下向き矢印キー */
    DOWN: string;
    /** エスケープキー */
    ESCAPE: string;
}
