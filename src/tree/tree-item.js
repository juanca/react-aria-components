/* eslint-disable */
import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context';

export default class TreeItem extends React.Component {
  render() {
    const { children, id, open, title } = this.props;

    return (
      <ActiveIdContext.Consumer>
        {(activeId) => {
          const active = activeId === id;

          return (
            <li
              aria-expanded={children ? open : undefined}
              role="treeitem"
              tabIndex={active ? '0' : undefined}
            >
              <span>{title}</span>
              {children && (
                <ul role="group">
                  {children}
                </ul>
              )}
            </li>
          );
        }}
      </ActiveIdContext.Consumer>
    );
  }
}

TreeItem.propTypes = {
  // activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  open: PropTypes.bool,
  title: PropTypes.node.isRequired,
};

TreeItem.defaultProps = {
  children: undefined,
  open: false,
};
