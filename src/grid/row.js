import PropTypes from 'prop-types';
import React from 'react';

import styles from './row.css'

export default function Row(props) {
  return (
    <div className={props.className} role="row">
      {props.children}
    </div>
  );
}

Row.defaultProps = {
  className: styles.container,
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
