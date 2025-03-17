# tscratch3likejs

Scratch3LikeJs をTypescriptで利用するためのパッケージです。

npm install --save-dev 


# 問題点

async function(this:S3Sprite) {
    for(;;){
        await this.Sound.playUntilDone();
    }
}
functionをgeneratorにするfixerを実行してから
yieldを付与すること！

ForStatement の親->親->親 と上っていき FunctionExpressionまでたどりついた時点で
generator == true でないときに、function の後ろに * をつける

親->親->親　はどこまでたどればよいのだろうか？ 


