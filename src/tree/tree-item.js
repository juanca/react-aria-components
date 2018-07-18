/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';

export default class TreeItem extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  render() {
    const { children, title } = this.props;

    return (
      <li
        aria-expanded={children ? this.state.open : undefined}
        role="treeitem"
        tabIndex={undefined}
      >
        <span>{title}</span>
        {children && (
          <ul role="group">
            {children}
          </ul>
        )}
      </li>
    );
  }
}

TreeItem.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

TreeItem.defaultProps = {
  children: undefined,
};
