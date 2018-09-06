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
import styles from './grid.css';

const columns = Object.keys(data[0]);

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid3(props) {
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
            {column}
          </ColumnHeader>
        ))}
      </RowHeaders>
      {data.map(datum => (
        <EditableRow
          className={styles['body-row']}
          key={datum.id}
        >
          {editing => columns.map((column, index) => (
            <GridCell
              className={styles['body-cell']}
              key={index} // eslint-disable-line react/no-array-index-key
              idX={index}
              idY={datum.id}
            >
              <InputGridCell
                className={styles['input-cell-input']}
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
