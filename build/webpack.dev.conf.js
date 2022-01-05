const config = require('../config');
const webpack = require('webpack');
// 高版本merge不为函数
const { merge } = require('webpack-merge');
// const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于解析vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development 选择一种 source map 风格来增强调试过程
  devtool: 'inline-source-map',
  plugins: [
    // 需要根据开发模式与生产模式进行不同的操作时，非常有用
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // webpack2+多个r 默认启用，不用手动调用
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // webpack2+ NoErrorsPlugin已经重命名为 NoEmitOnErrorsPlugin
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: true
    })
  ]
})
