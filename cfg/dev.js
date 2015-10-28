var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('./base');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

// Setup for Nitrous dev server
var devServerUrl = 'http://127.0.0.1:8000';
if (process.env.NITROUS_USERNAME) {
  devServerUrl = 'http://' + process.env.HOSTNAME + ':' + process.env.NITROUS_PREVIEW_PORT;
}

var config = _.merge({
  entry: [
    'webpack-dev-server/client?' + devServerUrl,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
}, baseConfig);

// Add needed loaders
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src')
});

module.exports = config;
