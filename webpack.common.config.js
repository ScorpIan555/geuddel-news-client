const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
//   entry: './src/index.js',  // webpack 4 default

  // configuration regarding modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // options for resolving module requests
  // (does not apply to resolving to loaders)
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },

}

module.exports = config;