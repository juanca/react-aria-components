import React from 'react';
import { render } from 'react-dom';

import Grid from './grid.js';
import styles from './index.css';

const numberOfColumns = 20;
const numberOfRows = 200;

const columns = new Array(numberOfColumns).fill(0).map((_, index) => ({
  id: `c${index}`,
  columnCell: (datum => datum[`b${index}`]),
  columnClassName: index === 0 ? styles.c0 : styles[`c${(index % 4) + 1}`],
  columnHeaderCell: <span>{`HEAD #${index % 5}`}</span>,
  columnHeaderClassName: index === 0 ? styles.hc0 : undefined,
}));

const data = new Array(numberOfRows).fill(0).map((_, rIndex) =>
  new Array(numberOfColumns).fill(0).reduce((datum, _, cIndex) => Object.assign(datum, {
    [`b${cIndex}`]: `BCELL-${rIndex}-${cIndex}`,
  }), { id: rIndex })
);

setTimeout(_ => {
  render((
    <React.Fragment>
      <div className={styles.container}>
        Hello world!
      </div>
      <Grid columns={columns} data={data} />
    </React.Fragment>
  ), document.getElementById('example-0'));
}, 100);
