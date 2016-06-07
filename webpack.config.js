var path = require('path');
// var ghpages = require('gh-pages');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var packageData = require('./package.json');
var filename = [packageData.name, packageData.version, 'js'];
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
      main: [
        path.resolve(__dirname, packageData.main),
        'animate-css-webpack!./node_modules/animate-css-webpack/animate-css.config.js',
      ]
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: filename.join('.'),
    },
    devtool: 'source-map',
    plugins: [new HtmlWebpackPlugin({
      inject: 'head',
      template: 'index.html',
      minify: {
        "collapseWhitespace": true, 
        "removeComments": true, 
        "removeRedundantAttributes": true, 
        "removeScriptTypeAttributes": true, 
        "removeStyleLinkTypeAttributes": true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
            {from: 'assets', to: 'assets'}
        ]),
  ],
  module: {
    loaders: [
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract(
              // activate source maps via loader query
            'css?sourceMap!' +
            'less?sourceMap'
          )
      },
      { 
          test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"
      }
    ]
  }
};

// ghpages.publish(path.join(__dirname, 'build'), callback);