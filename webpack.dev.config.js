const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');

// webpack dev server config object
// https://webpack.js.org/configuration/
const config = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  //  https://webpack.js.org/guides/development/
  mode: 'development',
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  // options related to how webpack emits results
  output: {
    publicPath: '/',
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    path: path.resolve(__dirname, 'public/dist'), // string
    // the filename template for entry chunks
    filename: 'devBundle.js'
  },
  devServer: {
    contentBase: './public'
  }
};

module.exports = merge(common, config);
