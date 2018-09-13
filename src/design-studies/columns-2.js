import React from 'react';

import ColumnHeader from '../grid/column-header.js';
import FancyInputGridCell from '../examples/grid-cells/fancy-input-grid-cell.js';
import InteractiveGridCell from '../grid/interactive-grid-cell.js';
import SelectablePosition from './grid-cells/selectable-position.js';

import styles from './columns.css';

export default [
  {
    element: data => (
      <InteractiveGridCell
        className={styles['small-body-cell']}
        key="position"
        idX={0}
        idY={data.id}
      >
        {interactive => (
          <SelectablePosition
            defaultValue={`${data.id}`}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
    ),
    header: (
      <ColumnHeader
        className={styles['small-header-cell']}
        key="position"
        idX={0}
        idY={0}
      >
        {' '}
      </ColumnHeader>
    ),
    key: 'id',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['large-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.title}
        key="title"
        idX={1}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['large-header-cell']}
        key="title"
        idX={1}
        idY={0}
      >
        Title
      </ColumnHeader>
    ),
    key: 'title',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.status}
        key="status"
        idX={2}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="status"
        idX={2}
        idY={0}
      >
        Status
      </ColumnHeader>
    ),
    key: 'status',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.tags.join(', ')}
        key="tags"
        idX={3}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="tags"
        idX={3}
        idY={0}
      >
        Tags
      </ColumnHeader>
    ),
    key: 'tags',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.assignees.join(', ')}
        key="assignees"
        idX={4}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="assignees"
        idX={4}
        idY={0}
      >
        Assignees
      </ColumnHeader>
    ),
    key: 'assignees',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.startDate}
        key="start-date"
        idX={5}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="start-date"
        idX={5}
        idY={0}
      >
        Start Date
      </ColumnHeader>
    ),
    key: 'startDate',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.endDate}
        key="end-date"
        idX={6}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="end-date"
        idX={6}
        idY={0}
      >
        End Date
      </ColumnHeader>
    ),
    key: 'endDate',
  },
  {
    element: data => (
      <FancyInputGridCell
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={`${data.percent}`}
        key="percent-complete"
        idX={7}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['medium-header-cell']}
        key="percent-complete"
        idX={7}
        idY={0}
      >
        % Complete
      </ColumnHeader>
    ),
    key: 'percent',
  },
];
