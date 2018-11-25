import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';
import GridRow from '../grid/grid-row.js';
import GridCell from '../grid/grid-cell.js';

export default function GridExample() {
  return (
    <Example title="Grid">
      <DataGrid>
        {Array(10).fill(undefined).map(_ => (
          <GridRow>
            {Array(10).fill(undefined).map(_ => (
              <GridCell />
            ))}
          </GridRow>
        ))}
      </DataGrid>
    </Example>
  );
}
