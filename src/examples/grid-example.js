import faker from 'faker';
import React from 'react';

import {
  ColumnHeader,
  Grid,
  GridCell,
  Row,
  RowHeaders,
} from '../grid';

import Example from './example.js';
import styles from './grid-example.css';

function get(key) {
  return function columnCell(datum) {
    return datum[key];
  }
}

const metaColumns = [
  { faker: ['name', 'findName'], attrs: { columnClassName: styles['frozen-column'], columnHeaderCell: 'Name', columnHeaderClassName: styles['frozen-header'] } },
  { faker: ['name', 'jobTitle'], attrs: { columnHeaderCell: 'Job Title' } },
  { faker: ['name', 'jobDescriptor'], attrs: { columnHeaderCell: 'Job Description' } },
  { faker: ['phone', 'phoneNumber'], attrs: { columnHeaderCell: 'Phone Number' } },
  { faker: ['address', 'country'], attrs: { columnHeaderCell: 'Country' } },
  { faker: ['address', 'city'], attrs: { columnHeaderCell: 'City' } },
  { faker: ['address', 'zipCode'], attrs: { columnHeaderCell: 'Zip Code' } },
  { faker: ['company', 'companyName'], attrs: { columnHeaderCell: 'Company' } },
  { faker: ['company', 'bs'], attrs: { columnHeaderCell: 'Mission' } },
  { faker: ['database', 'engine'], attrs: { columnHeaderCell: 'Engine' } },
  { faker: ['date', 'weekday'], attrs: { columnHeaderCell: 'Weekday' } },
  { faker: ['finance', 'accountName'], attrs: { columnHeaderCell: 'Account Name' } },
  { faker: ['finance', 'amount'], attrs: { columnHeaderCell: 'Account Amount' } },
  { faker: ['finance', 'bitcoinAddress'], attrs: { columnHeaderCell: 'Account Address' } },
  { faker: ['hacker', 'phrase'], attrs: { columnHeaderCell: 'Phrase' } },
  { faker: ['lorem', 'word'], attrs: { columnHeaderCell: 'Word' } },
  { faker: ['lorem', 'words'], attrs: { columnHeaderCell: 'Words' } },
  { faker: ['lorem', 'sentence'], attrs: { columnHeaderCell: 'Sentence' } },
  { faker: ['lorem', 'slug'], attrs: { columnHeaderCell: 'Slug' } },
  { faker: ['lorem', 'paragraph'], attrs: { columnHeaderCell: 'Paragraph' } },
  { faker: ['lorem', 'paragraphs'], attrs: { columnHeaderCell: 'Paragraphs' } },
  { faker: ['lorem', 'text'], attrs: { columnHeaderCell: 'Text' } },
  { faker: ['lorem', 'lines'], attrs: { columnHeaderCell: 'Lines' } },
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
    <Example title="Grid">
      <Grid className={styles['grid-container']}>
        <RowHeaders className={styles['row-headers']} key="row-headers">
          {columns.map(column =>
            <ColumnHeader className={column.columnHeaderClassName} key={column.id}>
              {column.columnHeaderCell}
            </ColumnHeader>
          )}
        </RowHeaders>
        {data.map(datum =>
          <Row key={datum.id}>
            {columns.map(column =>
              <GridCell className={column.columnClassName} key={column.id}>
                {column.columnCell(datum)}
              </GridCell>
            )}
          </Row>
        )}
      </Grid>
    </Example>
  );
}
