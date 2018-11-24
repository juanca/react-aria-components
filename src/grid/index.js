import React from 'react';

import Cursor from '../cursor';

export default function Grid(props) {
  return (
    <Cursor>
      {(x, y) => (
        <React.Fragment>
          <span>{x}, {y}</span>
          {React.Children.map(props.children, (row, index) => (
            React.cloneElement(row, { active: index === y })
          ))}
        </React.Fragment>
      )}
    </Cursor>
  );
}
