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
          <div className={props.className}>
            {React.Children.map(props.children, (row, index) => (
              React.cloneElement(row, {
                active: index === y,
                cellIndex: x,
              })
            ))}
          </div>
        </React.Fragment>
      )}
    </Cursor>
  );
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  refs: PropTypes.arrayOf(RefType).isRequired,
};

Grid.defaultProps = {
  className: undefined,
};
