import PropTypes from 'prop-types';
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
      className={props.className}
      role="grid"
    >
      <Row
        className={styles['row-headers-container']}
        key="row-headers"
      >
        {props.columns.map(column =>
          <ColumnHeader
            className={column.columnHeaderClassName}
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
  className: styles.container,
  columns: [],
  data: [],
};

Grid.propTypes = {
  className: PropTypes.string,
  columns: PropTypeColumns,
  data: PropTypeData,
};
