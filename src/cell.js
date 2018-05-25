import PropTypes from 'prop-types';
import React from 'react';

import styles from './cell.css';

export default function Cell(props) {
  return (
    <div className={props.className}>
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
