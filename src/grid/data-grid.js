import PropTypes from 'prop-types';
import React from 'react';

import Cursor from '../cursor';
import RefType from '../prop-types/ref.js';

export default function Grid(props) {
  return (
    <Cursor refs={props.refs}>
      {(x, y) => (
        <React.Fragment>
          <span>{x}, {y}</span>
          {React.Children.map(props.children, (row, index) => (
            React.cloneElement(row, {
              active: index === y,
              cellIndex: x,
            })
          ))}
        </React.Fragment>
      )}
    </Cursor>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  refs: PropTypes.arrayOf(RefType).isRequired,
};

Grid.defaultProps = {
};
