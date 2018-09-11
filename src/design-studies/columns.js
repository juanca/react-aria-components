import InputGridCell from '../examples/grid-cells/input-grid-cell.js';
import SelectablePosition from './grid-cells/selectable-position.js';

export default [
  {
    component: SelectablePosition,
    key: 'id',
  },
  {
    component: InputGridCell,
    key: 'title',
  },
  {
    component: InputGridCell,
    key: 'status',
  },
  {
    component: InputGridCell,
    key: 'tags',
  },
  {
    component: InputGridCell,
    key: 'assignees',
  },
  {
    component: InputGridCell,
    key: 'startDate',
  },
  {
    component: InputGridCell,
    key: 'endDate',
  },
  {
    component: InputGridCell,
    key: 'percent',
  },
];
