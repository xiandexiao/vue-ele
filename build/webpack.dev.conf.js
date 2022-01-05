const config = require('../config');
const webpack = require('webpack');
// 高版本merge不为函数
const { merge } = require('webpack-merge');
// const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// add hot-reload related code to entry chunks
// Object.keys(baseWebpackConfig.entry).forEach(function(name) {
//   baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
// })

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development 选择一种 source map 风格来增强调试过程
  devtool: 'inline-source-map',
  devServer: {
    static: './elm',
  },
  plugins: [
    // {
    //       'process.env': config.dev.env
    //     }
    //new webpack.DefinePlugin(),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // webpack2+多个r 默认启用，不用手动调用
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // webpack2+ NoErrorsPlugin已经重命名为 NoEmitOnErrorsPlugin
   // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: true
    })
  ]
})
