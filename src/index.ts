/**
 * Main 
 * 
 * 【Buffer】
 * BufferはNodeAPIでありNODEの外では利用できない仕様である
 * Scratch-Render内で使用するGraphemeBreaker.jsの中でBufferを
 * 参照しているがこの参照には工夫を要する。
 * 
 * 【工夫点】
 * ブラウザ動作を前提とし Bufferをグローバル変数にする
 * 
 * 【import の eagerモード】
 * import { Buffer } from 'buffer';のようにBufferをimportで読み込む
 * 場合、【工夫】の対処ではまだ不完全である。
 * importの読み込みは非同期型(動的)、requireは同期型であるため
 * Bufferのimport読み込みを完了させる前にWindow.Bufferとして格納してしまうことがあり得る
 * よって、Bufferは「同期型」で読み込みたい
 * Bufferをrequireで読み込むか、またはawait import()で読み込むかの選択になる。
 * 
 * 今回は、await import()で読み込むことにする（ せっかくだから ）。
 * ただし、await import()では webpackは出力ファイルを自動的に分割してしまう。
 * 出力ファイルを１つにまとめたい気持ちがあり、eagerモードで import()することに
 * した。
 * 
 */
// 【eagerモード】の例
// const { Buffer } = await import(/* webpackMode: "eager" */ 'buffer');
// const { S3CSS } = await import(/* webpackMode: "eager" */ '../lib/elements/css');
// const { PlayGround } = await import(/* webpackMode: "eager" */ '../lib/playGround');

// ここからコードです。

import 'regenerator-runtime';
import 'core-js';
import { Version } from './version';

const { Buffer } = await import(/* webpackMode: "eager" */ 'buffer');
window.Buffer = window.Buffer || Buffer

const { S3CSS } = await import(/* webpackMode: "eager" */ '../lib/elements/css');
const { PgMain } = await import(/* webpackMode: "eager" */ '../lib/pgMain');
export const Pg = PgMain.getInstance();
export const Lib = Pg.Libs;
const S3Element = Pg.Element;
S3Element.insertCss(S3CSS);

const Initialize = async function() {
    console.log(`Library Version = "${Version}"`);
    await Lib.wait(1000);
    await Pg._init();
};

Initialize();