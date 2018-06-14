import React from 'react';

import GridCell from './grid-cell.js';
import Grid from './grid.js';
import PropTypeColumns from './prop-types/columns.js';
import PropTypeDatum from './prop-types/datum.js';
import styles from './row.css'

export default function Row(props) {
  return (
    <Grid>
      {props.columns.map(column =>
        <GridCell
          className={column.className}
          key={column.id}
        >
          {column.renderNode(props.datum)}
        </GridCell>
      )}
    </Grid>
  );
};

Row.defaultProps = {
  columns: [],
  datum: {},
};

Row.propTypes = {
  columns: PropTypeColumns,
  datum: PropTypeDatum,
};
