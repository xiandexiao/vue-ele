const path = require('path');

module.exports = {
  // development, production 或 none 之中的一个
  mode: 'development',
  // 分离 app(应用程序) 和 vendor(第三方库) 入口
  // webpack v4+中使用 optimization.splitChunks 选项，将 vendor 和 app(应用程序) 模块分开
  entry: {
    app: './src/main.js',
    //vendor: './src/vendor.js',
  },
  output: {
    path: path.resolve(__dirname, 'elm'),
    // contenthash
    // 使用 占位符(substitutions) 来确保每个文件具有唯一的名称
    filename: '[name].js'
  },
};
