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
