const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigShare = require('./webpackConfigShare');

const pathsShare = require('./webpackPathsShare');

let paths = pathsShare.paths;

let prod = {

};

module.exports = merge(webpackConfigShare, {
   output: {
      path: path.resolve(paths.projectRoot, 'deploy'),
      filename: '[name].bundle.js',
      publicPath: '/',
      sourceMapFilename: '[name].map'
   },
   plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
});