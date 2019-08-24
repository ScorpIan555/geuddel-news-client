const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

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
  },
  // https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze
  // https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_STAGE': "'prod'",
      REACT_APP_STAGE: "'prod'",
      NODE_ENV: '"prod"'
    })
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = merge(common, config);
