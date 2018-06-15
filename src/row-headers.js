import PropTypes from 'prop-types';
import React from 'react';

import Row from './row.js';
import styles from './row-headers.css'

export default function RowHeaders(props) {
  return (
    <Row className={props.className}>
      {props.children}
    </Row>
  );
};

Row.defaultProps = {
  className: styles.container,
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
