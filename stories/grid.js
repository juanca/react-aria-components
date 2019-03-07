/* eslint-disable react/no-array-index-key */
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import DataGrid from '../src/grid/data-grid.js';
import GridRow from '../src/grid/grid-row.js';
import GridCell from '../src/grid/grid-cell.js';

storiesOf('Grid', module)
  .add('default', () => {
    const rows = 10;
    const columns = 10;

    const gridRefs = Array(rows).fill(undefined).map(() => (
      Array(columns).fill(undefined).map(() => (
        React.createRef()
      ))
    ));

    return (
      <DataGrid refs={gridRefs}>
        {Array(rows).fill(undefined).map((row, y) => (
          <GridRow key={y} cellRefs={gridRefs[y]} index={y}>
            {Array(columns).fill(undefined).map((column, x) => (
              <GridCell key={x} cellRef={gridRefs[y][x]}>
                {active => (active ? 'cell!' : 'cell')}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </DataGrid>
    );
  });
