# summary

Scratch3風の動きをJavascriptで書く、というコンセプトのライブラリです。
Scratch-renderを使い、Scratch3と同様の動きをまねることを目指しています。
Typescriptのコード補完を導入し初心者でも分かりやすくプログラミングできるようにしています。
また、EslintでTscratch3独自の構文チェックをかけていますので、適切なコードに強制します。

This is a library based on the concept of writing Scratch3-style programming in Javascript. 

Using Scratch-render, we aim to mimic the same behavior as Scratch3.

We have introduced Typescript code completion to make programming easy even for beginners.

Eslint runs Tscratch3's own syntax check, forcing the code to be appropriate.

# install

```
npm install --save @amami-harhid/tscratch3likejs
```

# samples

testTs フォルダを参照してください。

ビルド結果を使った動作確認をしたいときは次より参照してください。

http://ts3.mirai-logic.com/testTs

# template 
git clone https://github.com/amami-harhid/templateTscrach3.git

# Bugs

## 2025/06/14(1) 【完了6/14】
StopOtherScriptの後でhideをするとhideしてくれない
【A】hide()の後ろにログを入れてもログがでない。
```js
    textSprite.Event.whenBroadcastReceived('IntroStart', async function*(){
        for(;;){
            if(this.Sensing.isMouseTouching() && this.Sensing.isMouseDown()){
                this.Event.broadcast('CherryStart');
                this.Control.stopOtherScripts();
                // StopOtherScriptの後でhideをするとhideしない。
                this.Looks.hide(); // <=== 【A】
                break;
            }
            yield;
        }
    });
```
stopOtherScripts()のなかの this は proxyではないため、threadIdを持っていない。
そのため Threads「自分自身以外のスレッドを止める」の判定にて、自分自身を含めて止めていた。

stopOtherScript(this) と Proxyである thisを渡すように変更した【完了6/14】


## 2025/06/14(2)

本体スプライトの ImageEffectが クローンに引き継がれない

## 2025/06/14(3) 【完了6/14】

スプライトクローン側でPEN機能を使うと下記エラーが発生する
createPenSkin()は 10回までしかできないのかな？

```
MaxListenersExceededWarning: Possible EventEmitter memory leak detected
```
放置していてたとえばスタンプを取り続けると動作が遅くなっていく。
Scratch3-render / PenSkin 

```ts
this._renderer.on(RenderConstants.Events.NativeSizeChanged, this.onNativeSizeChanged);
```
#### 動作が遅くなっていく
PenSkin を disposeしていないので
Sprite#remove() 時に Penをdisposeするようにした。
--> disposeすると Stampも消えてしまう弊害あり( 本家と結果が違う )
遅くはならなくなったが、それでも、MaxListenersExceededWarningは表示される。

PenSkinは、スプライトごとに存在させるのではなく、通しで１個だけなのではないか？

PenSkinは instanceは１個だけにする。(シングルトンにした)
stamp()が撮れない。
理屈はうまくいっているのであるが、よくわからない。
シングルトンのままにしてスタンプが取れない理由を突き詰めて調査する。

updateDrawableSkinIdのskinIdを間違えていた。--> 修正してうまくいった。【完了6/14】

```ts
renderer.updateDrawableSkinId(penDrawableId, skinId);
```

## 2025/06/14(4)【完了6/19】同期型に改良

連続してクローンを作りながら、本体のコスチュームを変えていくとき、
クローンされた側のコスチュームが正しく受け継がれない（微妙にずれてしまう）事象。

クローン処理は非同期、クローンが終わらないうちに 本体のコスチュームを変える(Costume.next)が動いているためと推測される。

ライブラリ側での対処は難しいので、スクリプト側で対処することにしたい

#### 解決方法１（1ブロックごとにコスチュームを変えるとき）
```ts
await this.Control.clone();
this.Looks.Costume.next();
```
#### 解決方法２（1ブロックごとにコスチュームを変えるとき）

```ts
this.Control.clone().then(_=>{
    this.Looks.Costume.next();
});
```
#### 解決方法３（1行ごとにコスチュームを変えるとき）

```ts
const promise = [];
// eslint-disable-next-line loopCheck/s3-loop-plugin
for(const x of xArr){
    this.Motion.Position.x = x;
    const clone = this.Control.clone();
    promise.push(clone);
}
await Promise.all(promise);
this.Looks.Costume.next();

```

# 改良

## Position.xy = {x: 0, y: 0}; 【完了 6/20】

{} を与えるとき、{x: 0, y: 0} と同じにしたい。【完了 6/20】
[0,0] を与えたら、{x: 0, y: 0} と同じにしたい。【完了 6/19】

Looks.Size.scale も同様とする 【完了 6/20】

## getRandomValueInRange 【完了 6/20】

random, randomInteger としたい。

## clone()【完了 6/19】

 同期型に改良。