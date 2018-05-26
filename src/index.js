import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [
  { component: 'HEAD0', dataKey: 'b0', id: 'c0', className: styles.c0, labelClassName: styles.hc0 },
  { component: 'HEAD1', dataKey: 'b1', id: 'c1', className: styles.c1 },
  { component: 'HEAD2', dataKey: 'b2', id: 'c2', className: styles.c2 },
  { component: 'HEAD3', dataKey: 'b3', id: 'c3', className: styles.c3 },
  { component: 'HEAD4', dataKey: 'b4', id: 'c4', className: styles.c4 },
];

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} />
  </React.Fragment>
), document.getElementById('example-0'));
