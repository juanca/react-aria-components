import React from 'react';
import {
  ColumnHeader,
  Grid,
  Row,
  RowHeaders,
} from '../grid';
import FancyInputGridCell from '../examples/grid-cells/fancy-input-grid-cell.js';

import data from './data.js';
import styles from './grid.css';

const columns = Object.keys(data[0]);

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid2(props) {
  return (
    <Grid {...props} className={styles['grid-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map((column, index) => (
          <ColumnHeader
            className={styles['column-header']}
            key={index} // eslint-disable-line
            idX={index}
            idY={0}
          >
            {column}
          </ColumnHeader>
        ))}
      </RowHeaders>
      {data.map(datum => (
        <Row
          className={styles['body-row']}
          key={datum.id}
        >
          {columns.map((column, index) => (
            <FancyInputGridCell
              cssContainer={styles['body-cell']}
              cssInput={styles['input-cell-input']}
              defaultValue={datum[column].toString()}
              key={index} // eslint-disable-line
              idX={index}
              idY={datum.id}
            />
          ))}
        </Row>
      ))}
    </Grid>
  );
}
