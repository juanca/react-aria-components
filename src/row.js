import PropTypes from 'prop-types';
import React from 'react';

import eventHandlersFactory from './utils/event-handlers-factory.js';
import styles from './row.css'

export default function Row(props) {
  return (
    <div
      className={props.className}
      draggable
      role="row"
      {...eventHandlersFactory('Grid', ['Click', 'Drag'])}
    >
      {props.children}
    </div>
  );
};

Row.defaultProps = {
  className: styles.container,
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
