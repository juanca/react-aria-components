const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Hoisted entries map to easily generate HtmlWebPackPlugin configurations
const entries = {
  accordions: './src/examples/accordions/index.js',
  index: './src/examples/index.js',
  grids: './src/examples/grids/index.js',
  tabs: './src/examples/tabs/index.js',
};

module.exports = {
  devServer: {
    contentBase: './dist',
  },
  entry: entries,
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
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ].concat(Object.keys(entries).map(key => new HtmlWebPackPlugin({
    chunks: [key],
    filename: key === 'index' ? './index.html' : `./${key}/index.html`,
    template: key === 'index' ? './src/examples/index.html' : `./src/examples/${key}/index.html`,
  }))),
};
