import React from 'react';
import {
  ColumnHeader,
  Grid,
  InteractiveGridCell,
  Row,
  RowHeaders,
} from '../grid';

import columns from './columns.js';
import data from './data.js';
import styles from './grid.css';

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid1(props) {
  return (
    <Grid {...props} className={styles['grid-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map((column, index) => (
          <ColumnHeader
            className={styles['column-header']}
            key={index} // eslint-disable-line react/no-array-index-key
            idX={index}
            idY={0}
          >
            {column.key}
          </ColumnHeader>
        ))}
      </RowHeaders>
      {data.map(datum => (
        <Row
          className={styles['body-row']}
          key={datum.id}
        >
          {columns.map((column, index) => (
            <InteractiveGridCell
              className={styles['body-cell']}
              defaultValue={datum[column.key].toString()}
              key={index} // eslint-disable-line react/no-array-index-key
              idX={index}
              idY={datum.id}
            >
              {interactive => (
                <column.component
                  className={styles['input-cell-input']}
                  defaultValue={datum[column.key].toString()}
                  interactive={interactive}
                />
              )}
            </InteractiveGridCell>
          ))}
        </Row>
      ))}
    </Grid>
  );
}
