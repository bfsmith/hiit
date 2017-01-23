'use strict';


const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.tslint = {
  test: /\.tsx?$/,
  loader: 'tslint-loader',
  exclude: /node_modules/,
};

exports.tsx = {
  test: /\.tsx?$/,
  loader: 'babel-loader!awesome-typescript-loader',
  exclude: /node_modules/,
};

exports.html = {
  test: /\.html$/,
  loader: 'raw-loader',
  exclude: /node_modules/,
};

exports.css = {
  test: /\.css$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: "style-loader",
    loader: ['css-loader?-minimize!postcss-loader']
  }),
};

exports.scss = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: "style-loader",
    loader: [
      {
        loader: 'css-loader',
        // current extract-text-plugin supports query not never options format
        query: {
          importLoaders: 3,
          minimize: true,
          // Even if disabled sourceMaps gets generated
          sourceMap: false
        }
      },
      'postcss-loader',
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        query: {
          // Enable sourcemaps for resolve-url-loader to work properly
          sourceMap: true
        }
      }
    ]
  }),
};

exports.json = {
  test: /\.json$/,
  loader: 'json-loader',
};

exports.svg = makeUrlLoader(/\.svg$/);
exports.eot = makeUrlLoader(/\.eot$/);
exports.woff = makeUrlLoader(/\.woff$/);
exports.woff2 = makeUrlLoader(/\.woff2$/);
exports.ttf = makeUrlLoader(/\.ttf$/);

function makeUrlLoader(pattern) {
  return {
    test: pattern,
    loader: 'url-loader',
    // exclude: /node_modules/,
  };
}
