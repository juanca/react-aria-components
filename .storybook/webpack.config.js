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
  // TODO... figure out how to make the above work.
  const cssRule = config.module.rules.filter(x => x.test.test('.css'))[0];
  const cssLoader = cssRule.use.filter(x => /css-loader/.test(x.loader))[0];
  cssLoader.options.modules = true;
  return config;
}
