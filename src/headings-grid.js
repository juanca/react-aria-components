import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
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
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    renderNode: PropTypes.func.isRequired,
    headingClassName: PropTypes.string,
    headingNode: PropTypes.node,
  })),
};
