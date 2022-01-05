const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // development, production 或 none 之中的一个
  mode: 'production',
  // 分离 app(应用程序) 和 vendor(第三方库) 入口
  // webpack v4+中使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'elm'),
    // contenthash
    // 使用 占位符(substitutions) 来确保每个文件具有唯一的名称
    filename: '[name].js'
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    favicon: 'favicon.ico',
    // 指定在何处（body or head）引入 script 文件
    inject: "body"
  })],
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
          chunks: "initial",
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
  }
};
