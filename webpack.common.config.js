const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const progressHandler = (percentage, message, ...args) => {
//   // e.g. Output each progress message directly to the console:
//   console.info(percentage, message, ...args);
// };

// @TODO https://developers.google.com/web/fundamentals/performance/webpack/monitor-and-analyze

const config = {
  // define and configure plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      appMountId: 'app'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[id].css'
    }),
    new CleanWebpackPlugin()
    // new webpack.ProgressPlugin(progressHandler)
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
          // 'css-loader', // look up using oblect syntax to add the option in for this
          // 'postcss-loader',
          // 'sass-loader'
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
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
