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
  // 查找方式做修改
  resolve: {
    // 尝试按顺序解析这些后缀名 能够使用户在引入模块时不带扩展 '' 改为'*'
    extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
    // 当正常解析失败时，重定向模块请求 webpack 5 不再自动 polyfill Node.js 的核心模块
    //fallback: [path.join(__dirname, '../node_modules')],
    // 引入变得更简单
    alias: {
      // 末尾添加 $，以表示精准匹配 配置别名
      'vue$': 'vue/dist/vue.js',
      // 'src': path.resolve(__dirname, '../src'),
      // 'assets': path.resolve(__dirname, '../src/assets'),
      // 'components': path.resolve(__dirname, '../src/components')
    }
  },
  // 仅用于解析 webpack 的 loader 包
  resolveLoader: {
    // webpack4+ fallback 改为 modules
    modules: ['node_modules']
  },
  // webpack v4+中使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开
  optimization: {
    splitChunks: {
      // 提取出的chunk的最小大小 生成文件的最小大小bytes 小于不会被提取出来
      //minSize: 30,
      cacheGroups: {
        default: {
          // 共用业务代码 提取出来的公共模块将会以这个来命名
          name: 'common',
          // 指定哪些类型的chunk参与拆分
          chunks: 'initial',
          // 模块被引用2次以上的才抽离 否则默认1，所有模块都会合并到vendor.js
          minChunks: 2,
          priority: -20
        },
        //拆分第三方库（通过npm|yarn安装的库）
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          // 大于业务配置：当一个第三方库被引用超过2次的时候，就不会打包到业务模块里了。
          priority: -10
        },
        /* 拆分指定文件
        locallib: {  //拆分指定文件
          test: /(src\/locallib\.js)$/,
          name: 'locallib',
          chunks: 'initial',
          priority: -9
        }
       */
      }
    }
  },
  module: {
    // 使用rules而不是loader
    rules: [
      {
        test: /\.vue$/,
        // 使用use而不是loader
        use: ['vue-loader']
      },
      {
        test: /\.m?js$/,
        include: projectRoot,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // 使用 options 属性，来向 loader 传递
          options: {
            // 不用写.babelrc配置文件
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  }
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
