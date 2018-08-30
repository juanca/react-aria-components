import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import RefType from '../prop-types/ref.js';
import styles from './grid.css';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowIndex: -1,
      columnIndex: -1,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {
    this.props.gridRefs[this.state.rowIndex][this.state.columnIndex].current.focus();
  }

  onFocus(event) {
    let newColumnIndex;
    const newRowIndex = this.props.gridRefs.findIndex((rows) => {
      newColumnIndex = rows.findIndex(cellRef => cellRef.current === event.target);
      return newColumnIndex > -1;
    });

    // If the click event does not match any of grid cell containers,
    // it must be within the active cell.
    if (newRowIndex === -1 || newColumnIndex === -1) { return; }

    this.setState({
      columnIndex: newColumnIndex,
      rowIndex: newRowIndex,
    });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.max(state.columnIndex, 0),
          rowIndex: Math.min(state.rowIndex + 1, this.props.gridRefs.length - 1),
        }));

        return true;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.max(state.columnIndex - 1, 0),
          rowIndex: Math.max(state.rowIndex, 0),
        }));

        return true;
      }
      case 'ArrowRight': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.min(state.columnIndex + 1, this.props.gridRefs[0].length - 1),
          rowIndex: Math.max(state.rowIndex, 0),
        }));

        return true;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.max(state.columnIndex, 0),
          rowIndex: Math.max(state.rowIndex - 1, 0),
        }));

        return true;
      }
      default:
        return true;
    }
  }

  render() {
    return (
      <GridContext.Provider value={this.props.gridRefs}>
        <div // eslint-disable-line jsx-a11y/interactive-supports-focus
          aria-labelledby={this.props['aria-labelledby']}
          className={this.props.className}
          role="grid"
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          tabIndex="0"
        >
          {this.props.children}
        </div>
      </GridContext.Provider>
    );
  }
}

Grid.defaultProps = {
  className: styles.container,
};

Grid.propTypes = {
  'aria-labelledby': PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  gridRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
};
