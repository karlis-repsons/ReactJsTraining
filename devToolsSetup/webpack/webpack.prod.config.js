const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const pathsShare = require('./webpackPathsShare');
const webpackConfigShare = require('./webpackConfigShare');

let paths = pathsShare.paths;
let prod = {
   outputPath: path.resolve(paths.projectRoot, 'deploy')
};

module.exports = merge(webpackConfigShare, {
   output: {
      path: prod.outputPath,
      filename: '[name].bundle.[chunkhash].js',
      publicPath: '/',
      sourceMapFilename: '[name].map'
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
         }
      })
   ]
});