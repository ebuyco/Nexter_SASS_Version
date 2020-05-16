const paths = require('./path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config.js');


module.exports = merge(config, {
      mode: 'development',
      devtool: 'inline-source-map',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
      devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: true,
        compress: true,
        hot: true,
        port: 8081,
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],

})
