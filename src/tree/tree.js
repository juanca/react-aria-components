import PropTypes from 'prop-types';
import React from 'react';
import ActiveIdContext from './active-id-context';

export default function Tree({
  activeId,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
}) {
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

Tree.propTypes = {
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  children: PropTypes.node.isRequired,
};

Tree.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
};
