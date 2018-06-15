import PropTypes from 'prop-types';
import React from 'react';

import styles from './grid.css'

export default function Grid(props) {
  return (
    <div
      className={props.className}
      role="grid"
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
