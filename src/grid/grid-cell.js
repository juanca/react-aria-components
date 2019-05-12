import PropTypes from 'prop-types';
import React from 'react';

import RefType from '../prop-types/ref.js';

export default class GridCell extends React.Component {
  componentDidMount() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active;
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  render() {
    const tabIndex = this.props.active ? 0 : -1;

    const element = this.props.interactive ? (
      <div className={this.props.className} role={this.props.header ? 'rowheader' : 'cell'}>{/* eslint-disable-line max-len */}
        {this.props.children(this.props.active, this.props.cellRef)}
      </div>
    ) : (
      <div className={this.props.className} ref={this.props.cellRef} role={this.props.header ? 'rowheader' : 'cell'} tabIndex={tabIndex}>{/* eslint-disable-line max-len */}
        {this.props.children(this.props.active)}
      </div>
    );

    return element;
  }
}

GridCell.propTypes = {
  active: PropTypes.bool,
  cellRef: RefType.isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  header: PropTypes.bool,
  interactive: PropTypes.bool,
};

GridCell.defaultProps = {
  active: false,
  className: undefined,
  header: false,
  interactive: false,
};
