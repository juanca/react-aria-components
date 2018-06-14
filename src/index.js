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
      <div className={styles.banner}>
        <p>List of WAI-ARIA components implemented in React:</p>
        <ol>
          <li>Grid</li>
        </ol>
      </div>
      <div className={styles['grid-container']}>
        <Grid columns={columns} data={data} />
      </div>
    </React.Fragment>
  ), document.getElementById('page'));
}, 100);
