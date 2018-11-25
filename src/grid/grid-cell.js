import React from 'react';

export default function Cell(props) {
  return (
    <span>
      {props.active ? 'cell!' : 'cell'}
    </span>
  );
}
