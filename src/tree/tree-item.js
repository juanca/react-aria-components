import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context.js';
import OpenIdsContext from './open-ids-context.js';
import combineConsumers from '../utils/combine-consumers.js';

export default function TreeItem({
  children,
  id,
  title,
}) {
  const Consumer = combineConsumers(ActiveIdContext.Consumer, OpenIdsContext.Consumer);

  return (
    <Consumer>
      {(activeId, openIds) => {
        const active = activeId === id;
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
    </Consumer>
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
