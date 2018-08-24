const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const nodeExternals = require('webpack-node-externals'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  entry: './src/examples/examples.js',
  externals: [nodeExternals()],
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
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
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'ssr'),
    filename: 'ssr-bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].css',
    }),
  ],
  target: 'node',
};
