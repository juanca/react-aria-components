/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';

export default class TreeItem extends React.Component {
  render() {
    const { children, open, title } = this.props;

    return (
      <li
        aria-expanded={children ? open : undefined}
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
  open: PropTypes.bool,
  title: PropTypes.node.isRequired,
};

TreeItem.defaultProps = {
  children: undefined,
  open: undefined,
};
