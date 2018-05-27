const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
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
      }]
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
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ]
};
