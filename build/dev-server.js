const config = require('../config')
const path = require('path')
const express = require('express');
const webpack = require('webpack');
const open = require('open');
// // 把 webpack 处理过的文件发送到一个 server
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.dev.conf');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
// 解决单击刷新或输入地址的方式找不到页面的问题
const history = require('connect-history-api-fallback');
const  hot = require('webpack-hot-middleware');
// local
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
console.log('NODE_ENV', process.env.NODE_ENV)

// default port where dev server listens for incoming traffic
// 8000
let port = process.env.PORT || config.dev.port;
console.log('port', port)
let server = express()
let compiler = webpack(webpackConfig)

server.use(history());

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
server.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      // output in the different colors.
      colors: true,
      //  whether to add information about the chunk
      chunks: false
    }
  })
);

//
let context = config.dev.context
if (context.length) {
  server.use(createProxyMiddleware(context, {
    target: 'https://elm.cangdu.org',
    // 是否需要改变原始主机头为目标URL，是否进行代理
    changeOrigin: true,
    logLevel: 'debug',
  }));
}

server.use(hot(compiler))

// serve pure static assets
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
server.use(staticPath, express.static('./static'))

module.exports = server.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  let uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    open(uri)
  }
});
