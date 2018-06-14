import React from 'react';

import GridCell from './grid-cell.js';
import Grid from './grid.js';
import PropTypeColumns from './prop-types/columns.js';
import styles from './headings-grid.css'

export default function HeadingsGrid(props) {
  return (
    <Grid className={styles['container']}>
      {props.columns.map(column =>
        <GridCell
          className={column.headingClassName || column.className}
          key={column.id}
          role="columnheader"
        >
          {column.headingNode}
        </GridCell>
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
