import React from 'react';

import ColumnHeader from './column-header.js';
import Row from './row.js';
import GridCell from './grid-cell.js';
import PropTypeColumns from './prop-types/columns.js';
import PropTypeData from './prop-types/data.js';
import styles from './grid.css'

export default function TreeGrid(props) {
  return (
    <div
      className={styles.container}
      role="grid"
    >
      <Row
        className={styles['row-headers-container']}
        key="row-headers"
      >
        {props.columns.map(column =>
          <ColumnHeader
            className={column.headerClassName || column.className}
            key={column.id}
          >
            {column.headerNode}
          </ColumnHeader>
        )}
      </Row>
      {props.data.map(datum =>
        <Row
          key={datum.id}
        >
          {props.columns.map(column =>
            <GridCell
              className={column.className}
              key={column.id}
            >
              {column.renderNode(datum)}
            </GridCell>
          )}
        </Row>
      )}
    </div>
  );
};

TreeGrid.defaultProps = {
  columns: [],
  data: [],
};

TreeGrid.propTypes = {
  columns: PropTypeColumns,
  data: PropTypeData,
};
