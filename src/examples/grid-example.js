import React from 'react';

import Example from './example.js';
import Grid from '../grid';

function Row(props) {
  return (
    <div>
      I am {props.active ? 'an active row!' : 'a row'}
    </div>
  );
}

export default function GridExample() {
  return (
    <Example title="Grid">
      <Grid>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </Grid>
    </Example>
  );
}
