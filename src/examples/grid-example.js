import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';
import GridRow from '../grid/grid-row.js';
import GridCell from '../grid/grid-cell.js';

const rows = 10;
const columns = 10;

const gridRefs = Array(rows).fill(undefined).map(_ => (
  Array(columns).fill(undefined).map(_ => (
    React.createRef()
  ))
));

export default function GridExample() {
  return (
    <Example title="Grid">
      <DataGrid refs={gridRefs}>
        {Array(rows).fill(undefined).map((_, y) => (
          <GridRow key={y} cellRefs={gridRefs[y]} index={y}>
            {Array(columns).fill(undefined).map((_, x) => (
              <GridCell key={x} cellRef={gridRefs[y][x]}>
                {active => active ? 'cell!' : 'cell'}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </DataGrid>
    </Example>
  );
}
