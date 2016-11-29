var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ['./src/containers/index.js'],
        react: ['react','react-dom']
    },
    output: {
        path: path.join(__dirname, '/assets/'),
        filename: "[name].js",
        publicPath: './'
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
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),//允许全局使用变量
    ]
};