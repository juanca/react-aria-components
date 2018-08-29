import faker from 'faker'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

import {
  ColumnHeader,
  Grid,
  Row,
  RowHeaders,
} from '../grid';

import FancyInputGridCell from './grid-cells/fancy-input-grid-cell.js';
import Example from './example.js';
import styles from './grid-example.css';

function get(key) {
  return function columnCell(datum) {
    return datum[key];
  };
}

const metaColumns = [
  { faker: ['name', 'findName'], attrs: { columnClassName: styles['frozen-column'], columnHeaderCell: 'Name', columnHeaderClassName: styles['frozen-header'] } },
  { faker: ['name', 'jobTitle'], attrs: { columnHeaderCell: 'Job Title' } },
  { faker: ['name', 'jobDescriptor'], attrs: { columnHeaderCell: 'Job Description' } },
  { faker: ['phone', 'phoneNumber'], attrs: { columnHeaderCell: 'Phone Number' } },
  { faker: ['address', 'country'], attrs: { columnHeaderCell: 'Country' } },
  { faker: ['address', 'city'], attrs: { columnHeaderCell: 'City' } },
  { faker: ['address', 'zipCode'], attrs: { columnHeaderCell: 'Zip Code' } },
];

const columns = metaColumns.map((meta, index) => Object.assign({
  id: index,
  columnCell: get(meta.faker.slice(-1)[0]),
}, meta.attrs));

// e.g. { id: 1, findName: faker.name.findName(), jobTitle: faker.name.jobTitle() }
const data = new Array(20).fill(0).map((_, index) => (
  metaColumns.map(meta => ({
    [meta.faker.slice(-1)[0]]: meta.faker.reduce((obj, key) => obj[key], faker)(),
  })).concat({
    id: index + 1,
  }).reduce((merge, obj) => (
    Object.assign(merge, obj)
  ))
));

function createGridRefs() {
  return [0].concat(data).map(() => columns.map(() => React.createRef()));
}

export default function GridExample() {
  return (
    <Example title="Grid">
      <Grid className={styles['grid-container']} gridRefs={createGridRefs()}>
        <RowHeaders className={styles['row-headers']} key="row-headers">
          {columns.map(column => (
            <ColumnHeader
              className={column.columnHeaderClassName}
              key={column.id}
              idX={column.id}
              idY={0}
            >
              {column.columnHeaderCell}
            </ColumnHeader>
          ))}
        </RowHeaders>
        {data.map(datum => (
          <Row key={datum.id}>
            {columns.map(column => (
              <FancyInputGridCell
                className={column.columnClassName}
                defaultValue={column.columnCell(datum)}
                key={column.id}
                idX={column.id}
                idY={datum.id}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </Example>
  );
}
