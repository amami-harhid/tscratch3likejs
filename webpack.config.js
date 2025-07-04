/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const version = JSON.stringify(require('./package.json').version);
module.exports = {
    mode: 'production',
    context: `${__dirname}/src`,
    entry: {
        'index': path.join(__dirname, '/src', 'index.ts')
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
    plugins: [
        new webpack.DefinePlugin({ __s3_version__: version }),
        new NodePolyfillPlugin()
    ],
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