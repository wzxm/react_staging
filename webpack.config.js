var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8000',//资源服务器地址
            'webpack/hot/only-dev-server',
            './src/containers/index.js'
        ],
        react: [
            'webpack-dev-server/client?http://localhost:8000',//资源服务器地址
            'webpack/hot/only-dev-server',
            'react','react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, '/assets/'),
        filename: "[name].js",
        publicPath: 'http://localhost:8000/assets/dev'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js[x]?$/, exclude: /node_modules/, loader:"babel", query: {presets: ['es2015', 'react'] }},
            { test: /\.scss$/, loader:"style!css!autoprefixer!sass" },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=[path][name].[ext]'}
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('react', 'react.js'),//这是第三方库打包生成的文件
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),//允许全局使用变量
    ]
};