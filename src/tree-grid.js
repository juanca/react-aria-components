import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <div className={styles['header-row']}>
        {props.columns.map(column =>
          <Cell
            className={column.labelClassName || column.className}
            key={column.id}
          >
            {column.component}
          </Cell>
        )}
      </div>
      <div>
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
      </div>
    </div>
  );
};

TreeGrid.defaultProps = {
  columns: [],
};

TreeGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    dataKey: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
  })),
};
