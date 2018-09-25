import PropTypes from 'prop-types';
import React from 'react';

import RefPropType from '../prop-types/ref.js';
import styles from './row.css';

export default function Row(props) {
  return (
    <div // eslint-disable-line jsx-a11y/interactive-supports-focus
      className={props.className}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onKeyDown={props.onKeyDown}
      ref={props.rowRef}
      role="row"
    >
      {props.children}
    </div>
  );
}

Row.defaultProps = {
  className: styles.container,
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  rowRef: { current: null },
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  rowRef: RefPropType,
};
