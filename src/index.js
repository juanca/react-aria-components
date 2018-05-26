import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [{
  id: 'c0',
  className: styles.c0,
  component: 'HEAD0',
  labelClassName: styles.hc0
}, {
  id: 'c1',
  className: styles.c1
  component: 'HEAD1',
}, {
  id: 'c2',
  className: styles.c2
  component: 'HEAD2',
}, {
  id: 'c3',
  className: styles.c3
  component: 'HEAD3',
}, {
  id: 'c4',
  className: styles.c4
  component: 'HEAD4',
}];

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} />
  </React.Fragment>
), document.getElementById('example-0'));
