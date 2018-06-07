import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import styles from './footings-grid.css'

export default function FootingsGrid(props) {
  return (
    <Grid className={styles['container']}>
      {props.columns.map(column =>
        <Cell
          className={column.footingsClassName || column.className}
          key={column.id}
        >
          {column.footingNode}
        </Cell>
      )}
    </Grid>
  );
};

FootingsGrid.defaultProps = {
  columns: [],
};

FootingsGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    renderNode: PropTypes.func.isRequired,
    footingsClassName: PropTypes.string,
    footingNode: PropTypes.node,
  })),
};
