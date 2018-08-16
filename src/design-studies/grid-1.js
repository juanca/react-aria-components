import React from 'react';
import {
  ColumnHeader,
  Grid,
  InteractiveGridCell,
  Row,
  RowHeaders,
} from '../grid';
import InputGridCell from '../examples/grid-cells/input-grid-cell.js';

import data from './data.js';
import styles from './styles.css';

const columns = Object.keys(data[0]);

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid1() {
  return (
    <Grid className={styles['grid-1-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map(column => (
          <ColumnHeader
            className={column.columnHeaderClassName}
            key={column.id}
            idX={column.id}
            idY={0}
          >
            {column}
          </ColumnHeader>
        ))}
      </RowHeaders>
      {data.map(datum => (
        <Row key={datum.id}>
          {columns.map(column => (
            <InteractiveGridCell
              defaultValue={datum[column].toString()}
              key={column.id}
              idX={column.id}
              idY={datum.id}
            >
              {interactive => (
                <InputGridCell
                  interactive={interactive}
                  defaultValue={datum[column].toString()}
                />
              )}
            </InteractiveGridCell>
          ))}
        </Row>
      ))}
    </Grid>
  );
}
