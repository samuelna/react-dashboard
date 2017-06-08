'use strict'

const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_DIR   = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: `${APP_DIR}/index.js`,
    // vendor: `${APP_DIR}/vendor/moment.js`,
    vendor: 'moment',
  },
  output: {
    // filename: 'bundle.js', // for single entry point
    // filename: '[name].js', // for multiple entry points
    filename: '[name].[chunkhash].js', // for code splitting (vendor) with caching
    path: BUILD_DIR,
  },
  cache: true,
  debug: true,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // this is not asynchronous
      { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) }, // asynchronous method
   ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'), // enable async method to load css styles
    new webpack.HotModuleReplacementPlugin(), // enable HMR
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1; // assume vendor imports exists in the node_modules/
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html' // taken from webpack site
      // template: require('html-webpack-template'), // from bobby's webpack; requires html-webpack-template module
    }),
  ],
};