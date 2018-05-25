import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [
  { component: 'HEAD0', dataKey: 'b0', id: 'c0', labelClassName: styles.hc0 },
  { component: 'HEAD1', dataKey: 'b1', id: 'c1', labelClassName: styles.hc1 },
  { component: 'HEAD2', dataKey: 'b2', id: 'c2', labelClassName: styles.hc2 },
  { component: 'HEAD3', dataKey: 'b3', id: 'c3', labelClassName: styles.hc3 },
  { component: 'HEAD4', dataKey: 'b4', id: 'c4', labelClassName: styles.hc4 },
];

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} />
  </React.Fragment>
), document.getElementById('example-0'));
