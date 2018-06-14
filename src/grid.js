import PropTypes from 'prop-types';
import React from 'react';

import eventHandlersFactory from './utils/event-handlers-factory.js';
import styles from './grid.css';

export default function Grid(props) {
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

Grid.defaultProps = {
  className: styles.container,
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
