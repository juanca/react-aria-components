import React from 'react';
import {
  Grid,
  Row,
  RowHeaders,
} from '../grid';

import columns from './columns-1.js';
import data from './data.js';
import styles from './grid.css';

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid1(props) {
  return (
    <Grid {...props} className={styles['grid-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map(column => column.header)}
      </RowHeaders>
      {data.map(datum => (
        <Row
          className={styles['body-row']}
          key={datum.id}
        >
          {columns.map(column => column.element(datum))}
        </Row>
      ))}
    </Grid>
  );
}
