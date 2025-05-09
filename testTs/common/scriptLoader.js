const myScript = document.getElementsByTagName('script');
if(myScript && myScript[0]){
    // 元のscriptを削除して表示しない
    myScript[0].remove();
}
// bundle.js を参照する scriptを作成する
const href = location.href;
const simpleDirName = href.replace(/\/$/,'').replace(/^.+\//, '');
const bundleDir = `../../testBuild/${simpleDirName}/bundle.js`;
const scriptTag = document.createElement("script");
scriptTag.setAttribute('src', bundleDir);
scriptTag.setAttribute('type','module');
document.head.appendChild(scriptTag);
