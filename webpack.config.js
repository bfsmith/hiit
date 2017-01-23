'use strict';

const path = require('path');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');
const postcssInit = require('./webpack/postcss');

const applicationEntries = process.env.NODE_ENV === 'development'
  ? [ 'webpack-hot-middleware/client?reload=true' ]
  : [ ];

module.exports = {
  entry: [ './src/index.tsx' ].concat(applicationEntries),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  devtool: process.env.NODE_ENV === 'production' ?
    'source-map' :
    'inline-source-map',

  resolve: {
    extensions: [
      // '',
      '.webpack.js', '.web.js',
      '.ts', '.tsx',
      '.js', '.jsx',
      '.json',
      '.css', '.scss'
    ],
  },

  plugins: plugins,

  devServer: {
    historyApiFallback: { index: '/' },
  },

  module: {
    // preLoaders: [
    //   loaders.tslint,
    // ],
    loaders: [
      loaders.tsx,
      loaders.html,
      loaders.css,
      loaders.scss,
      loaders.svg,
      loaders.eot,
      loaders.woff,
      loaders.woff2,
      loaders.ttf,
      loaders.json,
    ],
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  },
};
