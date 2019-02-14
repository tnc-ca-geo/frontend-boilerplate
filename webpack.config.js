const CleanWebpackPlugin = require('clean-webpack-plugin');
const ArcGISPlugin = require('@arcgis/webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: [
          'cache-loader',
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
            }
          }
        ]
      },
      {
        test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          // 'cache-loader',  // Causing problems with fonts
          {
            loader: 'file-loader',
            options: {
              name: 'build/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
  },

  plugins: [

    new CleanWebpackPlugin(['dist']),

    new ArcGISPlugin({
      useDefaultAssetLoaders: false
    }),

    new HtmlWebPackPlugin({
      title: 'Boilerplate',
      template: './src/index.html',
      filename: './index.html',
      chunksSortMode: 'none',
      favicon: './src/assets/favicon.ico',
      inlineSource: '.(css)$',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })

  ],

  resolve: {
    modules: [
      path.resolve(__dirname, '/src'),
      path.resolve(__dirname, 'node_modules/')
    ],
    extensions: ['.js', '.scss']
  },

  externals: [
    (context, request, callback) => {
      if (/pe-wasm$/.test(request)) {
        return callback(null, 'amd ' + request);
      }
      callback();
    }
  ],

  node: {
    process: false,
    global: false,
    fs: 'empty'
  }
};
