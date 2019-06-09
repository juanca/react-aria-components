import PropTypes from 'prop-types';
import React from 'react';

import GridCell from '../grid-cell.js';
import RefType from '../../prop-types/ref.js';
import styles from './input-cell.css';

export default class InputCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interactive: false,
      value: this.props.value,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': return this.setState(state => ({ interactive: !state.interactive })); // eslint-disable-line max-len
      case 'Escape': return this.setState({ interactive: false });
      default: {
        if (this.state.interactive) event.stopPropagation();
        return undefined;
      }
    }
  }

  render() {
    return this.state.interactive ? (
      <GridCell active={this.props.active} cellRef={this.props.cellRef} className={this.props.className} interactive>{/* eslint-disable-line max-len */}
        {(active, cellRef) => (
          <input onChange={this.onChange} onKeyDown={this.onKeyDown} tabIndex={active ? 0 : -1} ref={cellRef} value={this.state.value} /> // eslint-disable-line max-len
        )}
      </GridCell>
    ) : (
      <GridCell active={this.props.active} cellRef={this.props.cellRef} className={this.props.className} onKeyDown={this.onKeyDown}>{/* eslint-disable-line max-len */}
        {() => (
          <span>{this.state.value}</span>
        )}
      </GridCell>
    );
  }
}

InputCell.propTypes = {
  active: PropTypes.bool, // Part of implicit GridCell props from React.cloneElement
  cellRef: RefType.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
};

InputCell.defaultProps = {
  active: false,
  className: styles.container,
  value: '',
};
