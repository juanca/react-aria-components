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
  'aria-label': function(props, propName, componentName) {
    const hasLabel = props['aria-label'];
    const hasLabelledBy = props['aria-labelledby'];
    const hasBoth = hasLabel && hasLabelledBy;
    const hasNeither = !(hasLabel || hasLabelledBy);

    if (hasBoth || hasNeither) {
      return new Error(`One, but not both, of "aria-label" and "aria-labelledby" must be present as a prop on ${componentName}`);
    }
  },
};
