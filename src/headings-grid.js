import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import PropTypeColumns from './prop-types/columns.js';
import styles from './headings-grid.css'

export default function HeadingsGrid(props) {
  return (
    <Grid className={styles['container']}>
      {props.columns.map(column =>
        <Cell
          className={column.headingClassName || column.className}
          key={column.id}
        >
          {column.headingNode}
        </Cell>
      )}
    </Grid>
  );
};

HeadingsGrid.defaultProps = {
  columns: [],
};

HeadingsGrid.propTypes = {
  columns: PropTypeColumns,
};
