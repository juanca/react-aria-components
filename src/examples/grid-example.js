/* eslint-disable react/no-array-index-key */
import React from 'react';

import Example from './example.js';
import DataGrid from '../grid/data-grid.js';
import GridRow from '../grid/grid-row.js';
import GridCell from '../grid/grid-cell.js';

const columns = [
  'Date',
  'Type',
  'Description',
  'Amount',
  'Balance',
];

const data = [{
  Date: '01-Jan-16',
  Type: 'Depost',
  Description: 'Cash Deposit',
  Amount: '$1,000,000.00',
  Balance: '$1,000,000.00',
}, {
  Date: '02-Jan-16',
  Type: 'Debit',
  Description: 'Downtown Grocery',
  Amount: '$250.00',
  Balance: '$999,750.00',
}, {
  Date: '03-Jan-16',
  Type: 'Debit',
  Description: 'Hot Coffee',
  Amount: '$9.00',
  Balance: '$999,741.00',
}, {
  Date: '04-Jan-16',
  Type: 'Debit',
  Description: 'The Filling Station',
  Amount: '$88.00',
  Balance: '$999,653.00',
}, {
  Date: '05-Jan-16',
  Type: 'Debit',
  Description: 'Tinker\'s Hardware',
  Amount: '$3,421.00',
  Balance: '$996,232.00',
}, {
  Date: '06-Jan-16',
  Type: 'Debit',
  Description: 'Cutey\' Salon',
  Amount: '$700.00',
  Balance: '$995,532.00',
}];

const gridRefs = [columns.map(() => (
  React.createRef()
))].concat(data.map(() => (
  columns.map(() => (
    React.createRef()
  ))
)));

export default function GridExample() {
  return (
    <Example title="Grid">
      <DataGrid refs={gridRefs}>
        <GridRow key="headers" cellRefs={gridRefs[0]} index={0}>
          {columns.map((header, x) => (
            <GridCell key={`header-cell-${x}`} cellRef={gridRefs[0][x]}>
              {active => (
                <span className={active ? 'active' : undefined}>
                  {header}
                </span>
              )}
            </GridCell>
          ))}
        </GridRow>
        {data.map((row, y) => (
          <GridRow key={`data-${y + 1}`} cellRefs={gridRefs[y + 1]} index={y + 1}>{/* eslint-disable-line max-len */}
            {columns.map((column, x) => (
              <GridCell key={`cell-${y + 1}${x}`} cellRef={gridRefs[y + 1][x]}>{/* eslint-disable-line max-len */}
                {active => (
                  <span className={active ? 'active' : undefined}>
                    {row[column]}
                  </span>
                )}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </DataGrid>
    </Example>
  );
}
