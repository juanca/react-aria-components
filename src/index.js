import React from 'react';
import { render } from 'react-dom';

import TreeGrid from './tree-grid.js';
import styles from './index.css';

const numberOfColumns = 20;
const numberOfRows = 20;

const columns = new Array(numberOfColumns).fill(0).map((_, index) => ({
  className: styles[`c${index % 5}`],
  id: `c${index}`,
  labelNode: `HEAD #${index % 5}`,
  labelClassName: index === 0 ? styles.hc0 : undefined,
  renderNode: (datum => datum[`b${index}`]),
}));

const data = new Array(numberOfRows).fill(0).map((_, rIndex) =>
  new Array(numberOfColumns).fill(0).reduce((datum, _, cIndex) => Object.assign(datum, {
    [`b${cIndex}`]: `BCELL-${rIndex}-${cIndex}`,
  }), { id: rIndex })
);

render((
  <React.Fragment>
    <div className={styles.container}>
      Hello world!
    </div>
    <TreeGrid columns={columns} data={data} />
  </React.Fragment>
), document.getElementById('example-0'));
