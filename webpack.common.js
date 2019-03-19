const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {


  entry: {
    app: './src/scripts/index.js',
    styles: './src/styles/style.scss',
    // another: './src/scripts/modules/another-module.js' // this is how you add extra modules
  },


  resolve: {
    alias: {
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),

      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  },


  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.s?[ac]ss$/,
        use: [

          // style-loader is better for one-page-applications
          // fallback to style-loader in development
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // process.env.NODE_ENV !=='production'

          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'
          }
        }]
        // loader: 'url-loader?limit=1024&name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // use: [ 'file-loader' ],
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      }, {
        test:/\.html$/,
        loader: ['html-loader']
      }
    ]
  },


  plugins: [

    // Clean /dist folder before each build
    new CleanWebpackPlugin([ 'dist' ]),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),

    // it will replace our index.html file with a newly generated one
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html'
    }),

    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: './src/templates/test.html',
    }),

    // Enabling Hot Module Replacement
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: devMode ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },


  optimization: {
    // prevent to duplicate dependencies
    splitChunks: {
      chunks: 'all'
    }
  }


};
