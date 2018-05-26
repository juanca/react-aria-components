import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const columns = [{
  className: styles.c0,
  id: 'c0',
  labelNode: 'HEAD0',
  labelClassName: styles.hc0,
  renderNode: (datum => datum.b0),
}, {
  className: styles.c1,
  id: 'c1',
  labelNode: 'HEAD1',
  renderNode: (datum => datum.b1),
}, {
  className: styles.c2,
  id: 'c2',
  labelNode: 'HEAD2',
  renderNode: (datum => datum.b2),
}, {
  className: styles.c3,
  id: 'c3',
  labelNode: 'HEAD3',
  renderNode: (datum => datum.b3),
}, {
  className: styles.c4,
  id: 'c4',
  labelNode: 'HEAD4',
  renderNode: (datum => datum.b4),
}];

const data = [
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 0 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 1 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 2 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 3 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 4 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 5 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 6 },
  { b0: 'B0', b1: 'B1', b2: 'B2', b3: 'B3', b4: 'B4', id: 7 },
];

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} data={data} />
  </React.Fragment>
), document.getElementById('example-0'));
