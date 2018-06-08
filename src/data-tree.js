import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import styles from './data-tree.css'

export default function DataTree(props) {
  return (
    <Grid
      key={props.id}
    >
      {props.columns.map(column =>
        <Cell
          className={column.className}
          key={column.id}
        >
          {column.renderNode(props.datum)}
        </Cell>
      )}
    </Grid>
  );
};

DataTree.defaultProps = {
  columns: [],
  datum: {},
};

DataTree.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    renderNode: PropTypes.func.isRequired,
    labelClassName: PropTypes.string,
    labelNode: PropTypes.node,
  })),
  datum: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
