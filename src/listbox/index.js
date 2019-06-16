import PropTypes from 'prop-types';
import React from 'react';

import Cursor from '../cursor/index.js';
import RefType from '../prop-types/ref.js';

export default function Listbox(props) {
  return (
    <Cursor
      className={props.className}
      dimensions={1}
      refs={props.refs.map(ref => [ref])}
      role="listbox"
    >
      {(x, y) => React.Children.map(props.children, (option, index) => (
        React.cloneElement(option, {
          active: index === y,
        })
      ))}
    </Cursor>
  );
}

Listbox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  refs: PropTypes.arrayOf(RefType).isRequired,
};

Listbox.defaultProps = {
  className: undefined,
};
