/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context';

export default class Tree extends React.Component {
  render() {
    const {
      activeId,
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
        <ActiveIdContext.Provider value={activeId}>
          {children}
        </ActiveIdContext.Provider>
      </ul>
    );
  }
}

Tree.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node.isRequired,
};
