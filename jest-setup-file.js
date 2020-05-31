/* eslint-disable no-console */

console.error = (...args) => {
  throw new Error([
    '>>> console.error arguments start',
    args.join('\n'),
    '>>> console.error arguments end',
  ]);
};
