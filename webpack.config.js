const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: {
    examples: './src/examples/index.js',
    examplesGrids: './src/examples/grids/index.js',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      }],
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      chunks: ['examples'],
      filename: './index.html',
      template: './src/examples/index.html',
    }),
    new HtmlWebPackPlugin({
      chunks: ['examplesGrids'],
      filename: './grids/index.html',
      template: './src/examples/grids/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ],
};
