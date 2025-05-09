/**
 * VERSION
 * package.jsonのバージョンを取り込む
 * __s3_version__ は 自分で定義したグローバル変数(webpack.config.js参照)
 */
declare const __s3_version__: string;
export const Version = (__s3_version__ == undefined)? 'UNDEFINED': __s3_version__;
