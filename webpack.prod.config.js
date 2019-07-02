const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'production', // default in webpack 4
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: require('html-webpack-template'),
    //         inject: false,
    //         appMountId: 'app',
    //     }),
    //     new MiniCssExtractPlugin({
    //         filename: '[name].css',
    //         chunkFilename: '[id].css'
    //     })
    // ],
    output: {
        path: path.resolve(__dirname, 'dist'),
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
}

module.exports = merge(common, config);