import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'row',
};

export default function Row(props) {
  return (
    <div style={styles}>
      {React.Children.map(props.children, (cell, index) => (
        React.cloneElement(cell, { active: props.active && index === props.cellIndex })
      ))}
    </div>
  );
}
