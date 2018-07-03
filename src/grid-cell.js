import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';

import styles from './grid-cell.css';

export default class GridCell extends React.Component {
  render() {
    return (
      <GridContext.Consumer>
        {gridRefs =>
          <div
            className={this.props.className}
            ref={gridRefs[this.props.idY][this.props.idX]}
            role={this.props.role}
            tabIndex={-1}
          >
            {this.props.children}
          </div>
        }
      </GridContext.Consumer>
    );
  }
};

GridCell.defaultProps = {
  className: styles.container,
  role: 'gridcell'
};

GridCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
  role: PropTypes.oneOf(['columnheader', 'gridcell']),
};
