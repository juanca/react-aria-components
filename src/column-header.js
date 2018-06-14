import PropTypes from 'prop-types';
import React from 'react';

import GridCell from './grid-cell.js';

export default function ColumnHeader(props) {
  return (
    <GridCell
      className={props.className}
      role="columnheader"
    >
      {props.children}
    </GridCell>
  );
};

ColumnHeader.defaultProps = {
  className: undefined,
};

ColumnHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
