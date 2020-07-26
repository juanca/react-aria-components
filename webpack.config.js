module.exports = {
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
        loader: 'css-loader',
        options: {
          modules: true,
        },
      }],
    }],
  },
};
