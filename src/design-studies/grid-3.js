import React from 'react';
import {
  Grid,
  RowHeaders,
} from '../grid';
import EditableRow from '../grid/editable-row.js';

import columns from './columns-3.js';
import data from './data.js';
import styles from './grid.css';

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function Grid3(props) {
  return (
    <Grid {...props} className={styles['grid-container']} gridRefs={createGridRefs()}>
      <RowHeaders className={styles['row-headers']} key="row-headers">
        {columns.map(column => column.header)}
      </RowHeaders>
      {data.map((datum, index) => (
        <EditableRow
          className={styles['body-row']}
          idY={index + 1}
          key={datum.id}
        >
          {editing => columns.map(column => column.element(datum, editing))}
        </EditableRow>
      ))}
    </Grid>
  );
}
