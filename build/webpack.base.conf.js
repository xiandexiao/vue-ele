const path = require('path')
const config = require('../config')
// const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')

const env = process.env.NODE_ENV
console.log(`webpack-base: ${env}`);
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd


module.exports = {
  // development, production 或 none 之中的一个
  mode: env || 'production',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: env === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  // resolve: {
  //   // 尝试按顺序解析这些后缀名 能够使用户在引入模块时不带扩展 '' 改为'*'
  //   extensions: ['*', '.js', '.vue', '.less', '.css', '.scss'],
  //   // 当正常解析失败时，重定向模块请求 webpack 5 不再自动 polyfill Node.js 的核心模块
  //   fallback: [path.join(__dirname, '../node_modules')],
  //   alias: {
  //     // 末尾添加 $，以表示精准匹配
  //     'vue$': 'vue/dist/vue.common.js',
  //     'src': path.resolve(__dirname, '../src'),
  //     'assets': path.resolve(__dirname, '../src/assets'),
  //     'components': path.resolve(__dirname, '../src/components')
  //   }
  // },
  // // 仅用于解析 webpack 的 loader 包
  // resolveLoader: {
  //   // webpack4+ fallback 改为 modules
  //   modules: ['node_modules']
  // },
  // module: {
  //   // 使用rules而不是loader
  //   rules: [
  //     {
  //       test: /\.vue$/,
  //       // 使用use而不是loader
  //       use: ['vue']
  //     },
  //     {
  //       test: /\.js$/,
  //       use: ['babel'],
  //       include: projectRoot,
  //       exclude: /node_modules/
  //     },
  //     {
  //       test: /\.json$/,
  //       use: ['json']
  //     },
  //     {
  //       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  //       use: [{
  //         loader: 'url'
  //       }]
  //     },
  //     {
  //       test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  //       use: [{
  //         loader: 'url'
  //         // options: {
  //         //   limit: 10000,
  //         //   name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
  //         // }
  //       }]
  //     }
  //   ]
  // }
}
