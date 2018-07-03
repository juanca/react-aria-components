import PropTypes from 'prop-types';
import React from 'react';

import {
  FocusedColumn,
  FocusedRow,
} from './grid-context.js';

import eventHandlersFactory from './utils/event-handlers-factory.js';
import styles from './grid-cell.css';

export default class GridCell extends React.Component {
  render() {
    return (
      <FocusedRow.Consumer>
        {focusedRow =>
          <FocusedColumn.Consumer>
            {focusedColumn =>
              <div
                className={this.props.className}
                role={this.props.role}
                {...eventHandlersFactory('Cell', ['Click'])}
                tabIndex={focusedRow === this.props.idY && focusedColumn === this.props.idX ? 0 : -1}
                ref={node => focusedRow === this.props.idY && focusedColumn === this.props.idX && node && node.focus()}
              >
                {this.props.children}
              </div>
            }
          </FocusedColumn.Consumer>
        }
      </FocusedRow.Consumer>
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
