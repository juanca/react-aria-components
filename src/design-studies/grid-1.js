import React from 'react';
import {
  ColumnHeader,
  Grid,
  InteractiveGridCell,
  Row,
  RowHeaders,
} from '../grid';
import InputGridCell from '../examples/grid-cells/input-grid-cell.js';
import SelectablePosition from './grid-cells/selectable-position.js';

import data from './data.js';
import styles from './grid-1.css';

const columns = Object.keys(data[0]).map(column => ({
  element: column === 'id' ? SelectablePosition : InputGridCell,
  key: column,
}));

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid1() {
  return (
    <Grid className={styles['grid-container']} gridRefs={createGridRefs()}>
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
                <column.element
                  interactive={interactive}
                  defaultValue={datum[column.key].toString()}
                />
              )}
            </InteractiveGridCell>
          ))}
        </Row>
      ))}
    </Grid>
  );
}
