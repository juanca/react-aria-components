import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';

function Row(props) {
  return (
    <React.Fragment>
      <div>I am {props.active ? 'an active row!' : 'a row'}</div>
      {React.Children.map(props.children, (cell, index) => (
        React.cloneElement(cell, { active: props.active && index === props.cellIndex })
      ))}
    </React.Fragment>
  );
}

function Cell(props) {
  return (
    <span>
      {props.active ? 'cell!' : 'cell'}
    </span>
  );
}

export default function GridExample() {
  return (
    <Example title="Grid">
      <Grid>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
        <Row>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </Row>
      </Grid>
    </Example>
  );
}
