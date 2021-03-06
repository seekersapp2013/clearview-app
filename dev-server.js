const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js').development

const server = new WebpackDevServer(webpack(config), {
  contentBase: 'www/',
  stats: config.stats,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
})

server.listen(config.port, 'localhost', function (err) {
  return err ? console.error(err)
    : console.log('Listening on http://localhost:' + config.port)
})
