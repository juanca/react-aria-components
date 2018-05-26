import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [{
  id: 'c0',
  className: styles.c0,
  labelNode: 'HEAD0',
  labelClassName: styles.hc0
}, {
  id: 'c1',
  className: styles.c1
  labelNode: 'HEAD1',
}, {
  id: 'c2',
  className: styles.c2
  labelNode: 'HEAD2',
}, {
  id: 'c3',
  className: styles.c3
  labelNode: 'HEAD3',
}, {
  id: 'c4',
  className: styles.c4
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
