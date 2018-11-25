import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';
import GridRow from '../grid/grid-row.js';
import GridCell from '../grid/grid-cell.js';

const gridRefs = Array(10).fill(undefined).map(_ => (
  Array(10).fill(undefined).map(_ => (
    React.createRef()
  ))
));

export default function GridExample() {
  return (
    <Example title="Grid">
      <DataGrid refs={gridRefs}>
        {Array(10).fill(undefined).map((_, y) => (
          <GridRow cellRefs={gridRefs[y]}>
            {Array(10).fill(undefined).map((_, x) => (
              <GridCell cellRef={gridRefs[y][x]} />
            ))}
          </GridRow>
        ))}
      </DataGrid>
    </Example>
  );
}
