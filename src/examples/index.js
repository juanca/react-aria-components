import React from 'react';
import { render } from 'react-dom';

import GridExample from './grid-example.js';
import styles from './index.css';

setTimeout(_ => {
  render((
    <React.Fragment>
      <div className={styles.banner}>
        <p>List of WAI-ARIA components implemented in React:</p>
        <ol>
          <li>Grid</li>
        </ol>
      </div>
      <GridExample />
    </React.Fragment>
  ), document.getElementById('page'));
}, 100);
