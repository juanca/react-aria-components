import React from 'react';

import GridCell from './grid-cell.js';
import Grid from './grid.js';
import PropTypeColumns from './prop-types/columns.js';
import PropTypeDatum from './prop-types/datum.js';
import styles from './row.css'

const subtreeLength = 2;
const subtreeChildren = new Array(subtreeLength).fill(0).map((_, index) => index);

export default function Row(props) {
  return (
    <React.Fragment>
      <Grid
        key={props.id}
      >
        {props.columns.map(column =>
          <GridCell
            className={column.className}
            key={column.id}
          >
            {column.renderNode(props.datum)}
          </GridCell>
        )}
      </Grid>
    </React.Fragment>
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
