import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context.js';
import OpenIdsContext from './open-ids-context.js';
import combineRenderProps from '../utils/combine-render-props.js';

export default function TreeItem({
  allowFocus,
  children,
  id,
  title,
}) {
  const Consumer = combineRenderProps(
    ActiveIdContext.Consumer,
    OpenIdsContext.Consumer,
  );

  return (
    <Consumer>
      {(activeId, openIds) => {
        const active = activeId === id;
        const open = openIds.includes(id);

        return (
          <li
            aria-expanded={children ? open : undefined}
            aria-selected={active ? true : undefined}
            role="treeitem"
            tabIndex={active || allowFocus ? '0' : undefined}
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
  allowFocus: PropTypes.bool,
  children: PropTypes.node,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.node.isRequired,
};

TreeItem.defaultProps = {
  allowFocus: undefined,
  children: undefined,
};
