import PropTypes from 'prop-types';
import React from 'react';

import {
  FocusedColumn,
  FocusedRow,
} from './grid-context.js';
import styles from './grid.css'

export default class Grid extends React.Component {
  constructor(props) {
    super();

    this.state = {
      row: props.axes.rows[0],
      rowIndex: 0,
      column: props.axes.columns[0],
      columnIndex: 0,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    switch(event.key) {
      case 'ArrowDown': {
        const nextIndex = Math.min(this.state.rowIndex + 1, this.props.axes.rows.length - 1);

        event.preventDefault();
        this.setState({
          row: this.props.axes.rows[nextIndex],
          rowIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowLeft': {
        const nextIndex = Math.max(this.state.columnIndex - 1, 0);

        event.preventDefault();
        this.setState({
          column: this.props.axes.columns[nextIndex],
          columnIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowRight': {
        const nextIndex = Math.min(this.state.columnIndex + 1, this.props.axes.columns.length - 1);

        event.preventDefault();
        this.setState({
          column: this.props.axes.columns[nextIndex],
          columnIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowUp': {
        const nextIndex = Math.max(this.state.rowIndex - 1, 0);

        event.preventDefault();
        this.setState({
          row: this.props.axes.rows[nextIndex],
          rowIndex: nextIndex,
        });

        return true;
      }
      default:
        return true;
    }
  }

  render() {
    return (
      <FocusedRow.Provider value={this.state.row}>
        <FocusedColumn.Provider value={this.state.column}>
          <div
            className={this.props.className}
            role="grid"
            onKeyDown={this.onKeyDown}
          >
            {this.props.children}
          </div>
        </FocusedColumn.Provider>
      </FocusedRow.Provider>
    );
  }
}

Grid.defaultProps = {
  className: styles.container,
};

Grid.propTypes = {
  axes: PropTypes.shape({
    columns: PropTypes.array,
    rows: PropTypes.array,
  }).isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
