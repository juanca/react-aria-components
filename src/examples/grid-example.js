import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';
import GridRow from '../grid/grid-row.js';
import GridCell from '../grid/grid-cell.js';

export default function GridExample() {
  return (
    <Example title="Grid">
      <DataGrid>
        <GridRow>
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
        </GridRow>
        <GridRow>
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
        </GridRow>
        <GridRow>
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
          <GridCell />
        </GridRow>
      </DataGrid>
    </Example>
  );
}
