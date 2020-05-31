module.exports = {
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFiles: [
    './jest-setup-file.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  verbose: true,
};
