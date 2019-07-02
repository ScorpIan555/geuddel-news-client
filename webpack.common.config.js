const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const config = {
//   entry: './src/index.js',  // webpack 4 default
  plugins: [
    new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        inject: false,
        appMountId: 'app',
        links: [
          '/theme.scss', '/theme.css'
      ]
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    })
  ],

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
          // 'style-loader',
          // 'css-loader',
          // 'sass-loader'

          // {
          //   loader: 'style-loader', options: { sourceMap: true }
          // },
          // {
          //   loader: 'css-loader', options: { sourceMap: true }
          // },
          // {
          //   loader: 'sass-loader', options: { sourceMap: true }
          // }

          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
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