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
  { id: '1', columnCell: get('findName'), columnClassName: styles['frozen-column'], columnHeaderCell: 'Name', columnHeaderClassName: undefined },
  { id: '2', columnCell: get('jobTitle'), columnClassName: undefined, columnHeaderCell: 'Job Title', columnHeaderClassName: undefined },
  { id: '3', columnCell: get('jobDescriptor'), columnClassName: undefined, columnHeaderCell: 'Job Description', columnHeaderClassName: undefined },
];

const data = [
  { id: 1, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 2, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 3, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 4, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 5, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 6, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 7, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 8, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 9, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 10, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 11, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 12, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 13, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 14, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 15, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 16, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 17, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 18, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 19, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
  { id: 20, findName: faker.name.findName(), jobTitle: faker.name.jobTitle(), jobDescriptor: faker.name.jobDescriptor() },
]

export default function GridExample() {
  return (
    <div className={styles['grid-container']}>
      <Grid columns={columns} data={data} />
    </div>
  );
}
