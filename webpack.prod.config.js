const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

const config = {
  // set mode for webpack 4 environment-specific defaults
  mode: 'production', // default in webpack 4
  // options related to how webpack emits results
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = merge(common, config);
