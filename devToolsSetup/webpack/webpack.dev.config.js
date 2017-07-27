const merge = require('webpack-merge');
const webpackConfigShare = require('./webpackConfigShare');

const dev = {
   serverPort: 3030
};

module.exports = merge(webpackConfigShare, {
   output: {
      publicPath: `http://localhost:${dev.serverPort}/`
   },
   devtool: 'source-map',
   devServer: {
      port: dev.serverPort
   }
});