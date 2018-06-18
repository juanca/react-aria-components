import React from 'react';
import { render } from 'react-dom';

import Example from './example.js';
import GridExample from './grid-example.js';
import TabsExample from './tabs-example.js';

setTimeout(_ => {
  render((
    <React.Fragment>
      <Example>
        <p>List of WAI-ARIA components implemented in React:</p>
        <ol>
          <li>Grid</li>
        </ol>
      </Example>
      <GridExample />
      <TabsExample />
    </React.Fragment>
  ), document.getElementById('page'));
}, 100);
