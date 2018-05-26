import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [{
  className: styles.c0,
  id: 'c0',
  labelNode: 'HEAD0',
  labelClassName: styles.hc0
}, {
  className: styles.c1
  id: 'c1',
  labelNode: 'HEAD1',
}, {
  className: styles.c2
  id: 'c2',
  labelNode: 'HEAD2',
}, {
  className: styles.c3
  id: 'c3',
  labelNode: 'HEAD3',
}, {
  className: styles.c4
  id: 'c4',
  labelNode: 'HEAD4',
}];

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} />
  </React.Fragment>
), document.getElementById('example-0'));
