// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           { loader: 'style-loader' },
//           {
//             loader: 'css-loader',
//             options: {
//               modules: true
//             },
//           },
//         ],
//       },
//     ],
//   },
// };

module.exports = function ({ config }) {
  const cssRule = config.module.rules.find(rule => rule.test.test('.css'));
  if (!cssRule) {
    throw new Error('No css rule detected in base storybook webpack config! Maybe the storybook internals have changed?');
  }

  const cssLoader = cssRule.use.find(loader => /css-loader/.test(loader.loader));
  if (!cssLoader) {
    throw new Error('css-loader not detected in base storybook webpack config! Maybe the storybook internals have changed?');
  }

  cssLoader.options.modules = true;
  cssLoader.options.localIdentName = '[name]__[emoji]__[hash:base64:5]';

  return config;
}
