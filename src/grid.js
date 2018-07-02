import PropTypes from 'prop-types';
import React from 'react';

import {
  FocusedColumn,
  FocusedRow,
} from './grid-context.js';
import styles from './grid.css'

export default class Grid extends React.Component {
  constructor() {
    super();

    this.state = {
      row: 0,
      column: 0,
    };

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event) {
    switch(event.key) {
      case 'ArrowDown': {
        this.setState({ row: this.state.row + 1 });
        return true;
      }
      case 'ArrowLeft': {
        this.setState({ column: this.state.column - 1 });
        return true;
      }
      case 'ArrowRight': {
        this.setState({ column: this.state.column + 1 });
        return true;
      }
      case 'ArrowUp': {
        this.setState({ row: this.state.row - 1 });
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
            onKeyUp={this.onKeyUp}
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
  className: PropTypes.string,
  children: PropTypes.node,
};
