import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context';
import OpenIdsContext from './open-ids-context';

export default function TreeItem({
  children,
  id,
  title,
}) {
  return (
    <ActiveIdContext.Consumer>
      {(activeId) => {
        const active = activeId === id;

        return (
          <OpenIdsContext.Consumer>
            {(openIds) => {
              const open = openIds.includes(id);

              return (
                <li
                  aria-expanded={children ? open : undefined}
                  role="treeitem"
                  tabIndex={active ? '0' : undefined}
                >
                  <span>
                    {title}
                  </span>
                  {children && (
                    <ul role="group">
                      {children}
                    </ul>
                  )}
                </li>
              );
            }}
          </OpenIdsContext.Consumer>
        );
      }}
    </ActiveIdContext.Consumer>
  );
}

TreeItem.propTypes = {
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.node.isRequired,
};

TreeItem.defaultProps = {
  children: undefined,
};
