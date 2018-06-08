import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import FootingsGrid from './footings-grid.js';
import HeadingsGrid from './headings-grid.js';
import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <HeadingsGrid columns={props.columns} />
      {props.data.map(datum =>
        <Grid
          key={datum.id}
        >
          {props.columns.map(column =>
            <Cell
              className={column.className}
              key={column.id}
            >
              {column.renderNode(datum)}
            </Cell>
          )}
        </Grid>
      )}
      <FootingsGrid columns={props.columns} />
    </div>
  );
};

TreeGrid.defaultProps = {
  columns: [],
  data: [],
};

TreeGrid.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    renderNode: PropTypes.func.isRequired,
    labelClassName: PropTypes.string,
    labelNode: PropTypes.node,
  })),
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
};
