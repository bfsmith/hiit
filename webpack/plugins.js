'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourceMap = process.env.TEST || process.env.NODE_ENV !== 'production'
  ? [new webpack.SourceMapDevToolPlugin({ filename: null, test: /\.tsx?$/ })]
  : [];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __TEST__: JSON.stringify(process.env.TEST || false),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
  }),
  new ExtractTextPlugin({ filename: 'bundle.css' }),
  new webpack.NoErrorsPlugin(),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
  ]),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
].concat(sourceMap);

const devPlugins = [
  // new StyleLintPlugin({
  //   configFile: './.stylelintrc',
  //   files: ['src/**/*.css'],
  //   failOnError: false,
  // }),
];

const prodPlugins = [
  new SplitByPathPlugin([
    { name: 'vendor', path: [path.join(__dirname, '..', 'node_modules')] },
  ]),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //     sourceMap: false
  //   },
  // }),
];

module.exports = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);
