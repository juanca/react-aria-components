import PropTypes from 'prop-types';
import React from 'react';
import RefType from '@react-aria-components/core/src/prop-types/ref.js';

import GridContext from './grid-context.js';
import styles from './grid.css';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);

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
    const newRowIndex = this.props.gridRefs.findIndex((rows) => {
      newColumnIndex = rows.findIndex(cellRef => cellRef.current === event.target);
      return newColumnIndex > -1;
    });

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
          rowIndex: Math.min(state.rowIndex + 1, this.props.gridRefs.length - 1),
        }));

        return true;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.max(state.columnIndex - 1, 0),
        }));

        return true;
      }
      case 'ArrowRight': {
        event.preventDefault();
        this.setState(state => ({
          columnIndex: Math.min(state.columnIndex + 1, this.props.gridRefs[0].length - 1),
        }));

        return true;
      }
      case 'ArrowUp': {
        event.preventDefault();
        this.setState(state => ({
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
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  gridRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
};
