/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
    entry: {
        'main': './index.ts',
    },
    output: {
        path: path.resolve(__dirname, "./testBuild"),
        filename: './bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node-modules/,
            use: 'ts-loader',
        }]
    },
    resolve: {
        extensions: ['.ts']
    }
}
