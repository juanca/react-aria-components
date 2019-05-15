import PropTypes from 'prop-types';
import React from 'react';

import Cursor from '../cursor';
import RefType from '../prop-types/ref.js';

export default function Grid(props) {
  return (
    <Cursor className={props.className} refs={props.refs} role="grid">
      {(x, y) => React.Children.map(props.children, (row, index) => (
        React.cloneElement(row, {
          active: index === y,
          cellIndex: x,
        })
      ))}
    </Cursor>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  refs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
};

Grid.defaultProps = {
  className: undefined,
};
