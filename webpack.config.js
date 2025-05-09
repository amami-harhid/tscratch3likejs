/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const version = JSON.stringify(require('./package.json').version);
module.exports = {
    mode: 'development',
    context: `${__dirname}/src`,
    entry: {
        'likeScratchLib': path.join(__dirname, '/src', 'likeScratchLib.ts')
    },
    target: "web",
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.js', //まとめた結果出力されるファイル名
        library:{
            type: "module",
        }
    },
    experiments: {
        outputModule: true,
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    devtool: 'source-map',
    plugins: [new webpack.DefinePlugin({ __s3_version__: version })],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\src\/*\.ts$/,
                loader: 'exports-loader',
                options: {
                    exports: 'playGround',
                }
            }
        ]
    }
}