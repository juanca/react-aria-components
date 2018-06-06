import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import styles from './labels-grid.css'

export default function LabelsGrid(props) {
  return (
    <Grid className={styles['container']}>
      {props.columns.map(column =>
        <Cell
          className={column.labelClassName || column.className}
          key={column.id}
        >
          {column.labelNode}
        </Cell>
      )}
    </Grid>
  );
};

LabelsGrid.defaultProps = {
  columns: [],
};

LabelsGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    renderNode: PropTypes.func.isRequired,
    labelClassName: PropTypes.string,
    labelNode: PropTypes.node,
  })),
};
