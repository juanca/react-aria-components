module.exports = {
  setupFiles: [
    './jest-setup-file.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  verbose: true,
};
