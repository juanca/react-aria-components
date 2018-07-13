import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import styles from './grid.css'

export default class Grid extends React.Component {
  constructor(props) {
    super();

    this.state = {
      rowIndex: 0,
      columnIndex: 0,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {
    this.props.gridRefs[this.state.rowIndex][this.state.columnIndex].current.focus();
  }

  onClick(event) {
    let newColumnIndex;
    const newRowIndex = this.props.gridRefs.findIndex(rows => {
      newColumnIndex = rows.findIndex(cellRef => cellRef.current === event.target);
      return newColumnIndex > -1;
    });

    this.setState({
      columnIndex: newColumnIndex,
      rowIndex: newRowIndex,
    });
  }

  onKeyDown(event) {
    switch(event.key) {
      case 'ArrowDown': {
        const nextIndex = Math.min(this.state.rowIndex + 1, this.props.gridRefs.length - 1);

        event.preventDefault();
        this.setState({
          rowIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowLeft': {
        const nextIndex = Math.max(this.state.columnIndex - 1, 0);

        event.preventDefault();
        this.setState({
          columnIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowRight': {
        const nextIndex = Math.min(this.state.columnIndex + 1, this.props.gridRefs[0].length - 1);

        event.preventDefault();
        this.setState({
          columnIndex: nextIndex,
        });

        return true;
      }
      case 'ArrowUp': {
        const nextIndex = Math.max(this.state.rowIndex - 1, 0);

        event.preventDefault();
        this.setState({
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
      <GridContext.Provider value={this.props.gridRefs}>
        <div
          className={this.props.className}
          role="grid"
          onClick={this.onClick}
          onKeyDown={this.onKeyDown}
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
  // refs: PropTypes.shape().isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};
