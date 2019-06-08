const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: {
    index: './src/examples/index.js',
    grids: './src/examples/grids/index.js',
    tabs: './src/examples/tabs/index.js',
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
      chunks: ['index'],
      filename: './index.html',
      template: './src/examples/index.html',
    }),
    new HtmlWebPackPlugin({
      chunks: ['grids'],
      filename: './grids/index.html',
      template: './src/examples/grids/index.html',
    }),
    new HtmlWebPackPlugin({
      chunks: ['tabs'],
      filename: './tabs/index.html',
      template: './src/examples/tabs/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ],
};
