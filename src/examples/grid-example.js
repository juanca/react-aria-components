import faker from 'faker';
import React from 'react';

import Grid from '../grid.js';
import styles from './grid-example.css';

function get(key) {
  return function columnCell(datum) {
    return datum[key];
  }
}

const metaColumns = [
  { faker: ['name', 'findName'], attrs: { columnClassName: styles['frozen-column'], columnHeaderCell: 'Name' } },
  { faker: ['name', 'jobTitle'], attrs: { columnHeaderCell: 'Job Title' } },
  { faker: ['name', 'jobDescriptor'], attrs: { columnHeaderCell: 'Job Description' } },
];

const columns = metaColumns.map((meta, index) => Object.assign({
  id: index,
  columnCell: get(meta.faker.slice(-1)[0]),
}, meta.attrs));

// e.g. { id: 1, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() }
const data = new Array(20).fill(0).map((_, index) =>
  metaColumns.map(meta => ({
    [meta.faker.slice(-1)[0]]: meta.faker.reduce((obj, key) => obj[key], faker)()
  }))
  .concat({ id: index })
  .reduce((merge, obj) => Object.assign(merge, obj))
);

export default function GridExample() {
  return (
    <div className={styles['grid-container']}>
      <Grid columns={columns} data={data} />
    </div>
  );
}
