var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var publicPath = !!config[0] ? config[0].output.publicPath : config.output.publicPath;
new WebpackDevServer(webpack(config), {
    publicPath: publicPath,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}).listen("8000", "localhost", function (err, result) {
    if (err) console.log(err);
    console.log('Listening at ' + "localhost:8000");
});