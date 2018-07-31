const hypernova = require('hypernova/server'); // eslint-disable-line import/no-extraneous-dependencies
const renderReact = require('hypernova-react').renderReact; // eslint-disable-line import/no-extraneous-dependencies
const bundle = require('./ssr/ssr-bundle.js').default;

hypernova({
  getComponent(name) {
    return renderReact(name, bundle);
  },
});
