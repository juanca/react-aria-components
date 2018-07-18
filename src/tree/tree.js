/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';

export default class Tree extends React.Component {
  render() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children
    } = this.props;

    return (
      <ul
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role="tree"
      >
        {children}
      </ul>
    );
  }
}

Tree.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node.isRequired,
};
