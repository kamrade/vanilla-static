const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// common.plugins.push(
//   new webpack.HotModuleReplacementPlugin()
// );

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // any "source-map"-like devtool is possible
  devServer: {

    contentBase: path.join(__dirname, 'src/templates'),
    // hot: true,


    // suggested official config:
    // contentBase: './dist',

    // hot reloading html on save - fix / hack:
    // https://github.com/webpack/webpack-dev-server/issues/1271

  }
});
