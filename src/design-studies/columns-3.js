import React from 'react';

import ColumnHeader from '../grid/column-header.js';
import GridCell from '../grid/grid-cell.js';
import EditableRowSelectablePosition from './grid-cells/editable-row-selectable-position.js';
import EditableRowInputCell from './grid-cells/editable-row-input-cell.js';

import styles from './columns.css';

export default [
  {
    element: (data, interactive, active) => (
      <GridCell
        className={styles['small-body-cell']}
        key="position"
        idX={0}
        idY={data.id}
      >
        <EditableRowSelectablePosition
          active={active}
          cssNonInteractive={styles['position-cell-non-interactive']}
          cssInteractive={styles['position-cell-interactive']}
          defaultValue={`${data.id}`}
          interactive={interactive}
        />
      </GridCell>
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['large-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.title}
        interactive={interactive}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.status}
        interactive={interactive}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.tags.join(', ')}
        interactive={interactive}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['medium-body-cell']}
        cssNonInteractive={styles['input-cell-non-interactive']}
        cssInteractive={styles['input-cell-interactive']}
        defaultValue={data.assignees.join(', ')}
        interactive={interactive}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['date-cell-layout']}
        cssNonInteractive={styles['date-cell-non-interactive']}
        cssInteractive={styles['date-cell-interactive']}
        defaultValue={data.startDate}
        interactive={interactive}
        key="start-date"
        idX={5}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['date-header-cell']}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['date-cell-layout']}
        cssNonInteractive={styles['date-cell-non-interactive']}
        cssInteractive={styles['date-cell-interactive']}
        defaultValue={data.endDate}
        interactive={interactive}
        key="end-date"
        idX={6}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['date-header-cell']}
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
    element: (data, interactive, active) => (
      <EditableRowInputCell
        active={active}
        cssContainer={styles['number-cell-layout']}
        cssNonInteractive={styles['number-cell-non-interactive']}
        cssInteractive={styles['number-cell-interactive']}
        defaultValue={`${data.percent}`}
        interactive={interactive}
        key="percent-complete"
        idX={7}
        idY={data.id}
      />
    ),
    header: (
      <ColumnHeader
        className={styles['number-header-cell']}
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
