import React from 'react';

export default function Row(props) {
  return (
    <React.Fragment>
      <div>I am {props.active ? 'an active row!' : 'a row'}</div>
      {React.Children.map(props.children, (cell, index) => (
        React.cloneElement(cell, { active: props.active && index === props.cellIndex })
      ))}
    </React.Fragment>
  );
}
