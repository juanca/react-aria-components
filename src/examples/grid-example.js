import faker from 'faker';
import React from 'react';

import Grid from '../grid.js';
import styles from './grid-example.css';

function get(key) {
  return function columnCell(datum) {
    return datum[key];
  }
}

const columns = [
  { id: 1, columnCell: get('findName'), columnClassName: styles['frozen-column'], columnHeaderCell: 'Name', columnHeaderClassName: undefined },
  { id: 2, columnCell: get('jobTitle'), columnClassName: undefined, columnHeaderCell: 'Job Title', columnHeaderClassName: undefined },
  { id: 3, columnCell: get('jobDescriptor'), columnClassName: undefined, columnHeaderCell: 'Job Description', columnHeaderClassName: undefined },
];

const data = [
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
]

export default function GridExample() {
  return (
    <div className={styles['grid-container']}>
      <Grid columns={columns} data={data} />
    </div>
  );
}
