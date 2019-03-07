import { addDecorator, configure } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

function loadStories() {
  require('../stories/index.js');
}

addDecorator(withA11y);
configure(loadStories, module);
