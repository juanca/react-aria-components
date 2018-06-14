import React from 'react';

import ColumnHeader from './column-header.js';
import Row from './row.js';
import GridCell from './grid-cell.js';
import PropTypeColumns from './prop-types/columns.js';
import PropTypeData from './prop-types/data.js';
import styles from './grid.css'

export default function Grid(props) {
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
            className={column.columnHeaderClassName || column.columnClassName}
            key={column.id}
          >
            {column.columnHeaderCell}
          </ColumnHeader>
        )}
      </Row>
      {props.data.map(datum =>
        <Row
          key={datum.id}
        >
          {props.columns.map(column =>
            <GridCell
              className={column.columnClassName}
              key={column.id}
            >
              {column.columnCell(datum)}
            </GridCell>
          )}
        </Row>
      )}
    </div>
  );
};

Grid.defaultProps = {
  columns: [],
  data: [],
};

Grid.propTypes = {
  columns: PropTypeColumns,
  data: PropTypeData,
};
