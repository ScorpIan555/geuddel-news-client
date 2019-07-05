const template = require('html-webpack-template');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  // define and configure plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
      appMountId: 'app'
      // meta: {
      //   viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      // }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  // configuration of modules
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // future builds read from cache to avoid re-running compilation
            // https://github.com/babel/babel-loader#options
            cacheDirectory: true
          }
        }
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
          // need style-loader, too????  why not????
          'css-loader', // look up using oblect syntax to add the option in for this
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // need to add MiniCssExtract????
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // options for resolving module requests
  // (does not apply to resolving to loaders)
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
