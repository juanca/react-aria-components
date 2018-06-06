import PropTypes from 'prop-types';
import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import HeadingsGrid from './headings-grid.js';
import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <HeadingsGrid columns={props.columns} />
      <div>
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

      </div>
      <Grid className={styles['footer-row']}>
        {props.columns.map(column =>
          <Cell
            className={column.footerClassName || column.className}
            key={column.id}
          >
            {column.footerNode}
          </Cell>
        )}
      </Grid>
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
