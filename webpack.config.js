const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    design_studies: './src/design-studies/index.js',
    examples: './src/examples/index.js',
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
      }, {
        loader: 'eslint-loader',
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
      chunks: ['design_studies'],
      filename: './design-studies.html',
      template: './src/design-studies/index.html',
    }),
    new HtmlWebPackPlugin({
      chunks: ['examples'],
      filename: './index.html',
      template: './src/examples/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ],
};
