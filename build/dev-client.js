/* eslint-disable */
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  console.log(event.action)
  if (event.action === 'reload') {
    window.location.reload()
  }
})
