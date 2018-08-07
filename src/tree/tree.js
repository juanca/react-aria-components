import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context.js';
import OpenIdsContext from './open-ids-context.js';

export default function Tree({
  activeId,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  openIds,
}) {
  return (
    <ul
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      role="tree"
    >
      <ActiveIdContext.Provider value={activeId}>
        <OpenIdsContext.Provider value={openIds}>
          {React.Children.map(children, (child, index) => {
            if (!activeId && index === 0) {
              return React.cloneElement(child, { allowFocus: true });
            }
            return child;
          })}
        </OpenIdsContext.Provider>
      </ActiveIdContext.Provider>
    </ul>
  );
}

Tree.propTypes = {
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node.isRequired,
  openIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

Tree.defaultProps = {
  activeId: undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
};
