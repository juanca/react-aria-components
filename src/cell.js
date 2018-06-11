import PropTypes from 'prop-types';
import React from 'react';

import eventHandlersFactory from './utils/event-handlers-factory.js';
import styles from './cell.css';

export default function Cell(props) {
  return (
    <div
      className={props.className}
      role="gridcell"
      {...eventHandlersFactory('Cell', ['Click'])}
    >
      {props.children}
    </div>
  );
};

Cell.defaultProps = {
  className: styles.container,
};

Cell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
