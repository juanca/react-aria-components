import React from 'react';

import ColumnHeader from '../grid/column-header.js';
import InputGridCell from '../examples/grid-cells/input-grid-cell.js';
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
      <InteractiveGridCell
        className={styles['large-body-cell']}
        key="title"
        idX={1}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.title}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="status"
        idX={2}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.status}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="tags"
        idX={3}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.tags.join(', ')}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="assignees"
        idX={4}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.assignees.join(', ')}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="start-date"
        idX={5}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.startDate}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="end-date"
        idX={6}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={data.endDate}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
      <InteractiveGridCell
        className={styles['medium-body-cell']}
        key="percent-complete"
        idX={7}
        idY={data.id}
      >
        {interactive => (
          <InputGridCell
            cssNonInteractive={styles['input-cell-non-interactive']}
            cssInteractive={styles['input-cell-interactive']}
            defaultValue={`${data.percent}`}
            interactive={interactive}
          />
        )}
      </InteractiveGridCell>
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
