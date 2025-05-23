# summary
Scratch3風Javascriptをコンセプトとして作成されたScratch3LikeJsをTypescriptで書き直しました(移植しました)。
また、EslintでTscratch3独自の構文チェックをかけていますので、適切なコードに強制します。

# npm install
npm install --save-dev @amami-harhid/tscratch3likejs

# samples

testTs フォルダを参照してください。

ビルド結果を使った動作確認をしたいときは次より参照してください。

https://amami-harhid.github.io/tscratch3likejs/testTs

# template 
git clone https://github.com/amami-harhid/templateTscrach3.git

# z-index
main main z-index=999
    div stageCanvasWrapper z-index=5000
        div likeScratch-canvas 
            canvas likeScratch-canvas
            canvas likeScratch-text-canvas z-index=5100
    <img z-index=5500>

# 未実装およびバグ
### (1) 端に触れたら跳ね返る
角度45度で進み「端に触れたら跳ね返る(*1)」動作でPEN描画をすると、本家の描画と異なる
(*1)の動作が本家と微妙に異なるためと思われる。

### (2) 「端に触れたら跳ね返る」動作中にDragして「端」に触れたときの動作
解決すみ。

次の条件のとき、本家はDrag中に向きが変わる。
(1) Drag「できる」ようにする
(2) 角度45度にする
(3) 向きの方向に進める
(4) 大きな画面にする
(5) 端に触れる前にDragを始める
(6) Dragしながら端に触れる
～ 進む方向の反対の端に触れても向きは変わらない==>跳ね返った向きが同じなので動作に気づかないだけ。

### (3) 繰り返してスタンプする動作のときDRAGでスタンプが止まらない
本家ではDrag中のときはスタンプしない。
penSprite#stamp() にて、Drag中にスタンプ回避をする

### (4) Pen 透明度の扱いが 本家と逆
Pen 透明度 100のとき完全透明、0 のとき 完全非透明とした
解決済。

### (5) スプライトが回転しているときのDrag
本家はDrag中も回転する
解決済。

### (6) Drag中に回転させると Drag画像がカクカクする
Drag画像は左上を基準にして配置する
左上の位置は、マウスをクリックしたときの位置と中心位置の距離を基準に作り出すが
回転することにより計算した左上位置が変化することによりカクカクしている。
Drag画像は、スプライトの中心位置を基準にして高さ横幅をもとに算出したらよいのではと考える。
解決済。