const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Hoisted entries map to easily generate HtmlWebPackPlugin configurations
const entries = {
  accordions: {
    entry: './pages/accordions/index.js',
    publicPath: './accordions/index.html',
    title: 'Accordion Examples - React WAI-ARIA Components',
  },
  grids: {
    entry: './pages/grids/index.js',
    publicPath: './grids/index.html',
    title: 'Grid Examples - React WAI-ARIA Components',
  },
  index: {
    entry: './pages/index.js',
    publicPath: './index.html',
    title: 'React WAI-ARIA Components',
  },
  tabs: {
    entry: './pages/tabs/index.js',
    publicPath: './tabs/index.html',
    title: 'Tabs Examples - React WAI-ARIA Components',
  },
};

module.exports = {
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
  },
  entry: Object.keys(entries).reduce((config, key) => (Object.assign(config, {
    [key]: entries[key].entry,
  })), {}),
  mode: 'development',
  module: {
    rules: [{
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
    filename: entries[key].publicPath,
    template: './pages/index.html',
    title: entries[key].title,
  }))),
};
