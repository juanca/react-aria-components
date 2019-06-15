const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Hoisted entries map to easily generate HtmlWebPackPlugin configurations
const entries = {
  accordions: './pages/accordions/index.js',
  index: './pages/index.js',
  grids: './pages/grids/index.js',
  tabs: './pages/tabs/index.js',
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
    template: key === 'index' ? './pages/index.html' : `./pages/${key}/index.html`,
  }))),
};
