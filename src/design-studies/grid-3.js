import React from 'react';
import {
  ColumnHeader,
  Grid,
  GridCell,
  RowHeaders,
} from '../grid';
import EditableRow from '../grid/editable-row.js';
import InputGridCell from '../examples/grid-cells/input-grid-cell.js';

import data from './data.js';
import styles from './styles.css';

const columns = Object.keys(data[0]);

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid3() {
  return (
    <Grid className={styles['grid-3-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map((column, index) => (
          <ColumnHeader
            className={column.columnHeaderClassName}
            key={index} // eslint-disable-line react/no-array-index-key
            idX={index}
            idY={0}
          >
            {column}
          </ColumnHeader>
        ))}
      </RowHeaders>
      {data.map(datum => (
        <EditableRow key={datum.id}>
          {editing => columns.map((column, index) => (
            <GridCell
              className={column.columnClassName}
              key={index} // eslint-disable-line react/no-array-index-key
              idX={index}
              idY={datum.id}
            >
              <InputGridCell
                defaultValue={datum[column].toString()}
                interactive={editing}
              />
            </GridCell>
          ))}
        </EditableRow>
      ))}
    </Grid>
  );
}
