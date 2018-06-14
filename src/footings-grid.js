import React from 'react';

import GridCell from './grid-cell.js';
import Grid from './grid.js';
import PropTypeColumns from './prop-types/columns.js';
import styles from './footings-grid.css'

export default function FootingsGrid(props) {
  return (
    <Grid className={styles['container']}>
      {props.columns.map(column =>
        <GridCell
          className={column.footingsClassName || column.className}
          key={column.id}
        >
          {column.footingNode}
        </GridCell>
      )}
    </Grid>
  );
};

FootingsGrid.defaultProps = {
  columns: [],
};

FootingsGrid.propTypes = {
  columns: PropTypeColumns,
};
