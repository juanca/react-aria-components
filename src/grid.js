import PropTypes from 'prop-types';
import React from 'react';

import styles from './grid.css'

export default class Grid extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div
        className={this.props.className}
        role="grid"
      >
        {this.props.children}
      </div>
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
