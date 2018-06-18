import PropTypes from 'prop-types';
import React from 'react';

export default function Tab({
  accessibleId,
  active,
  activeClassName,
  children,
  inactiveClassName,
  onActivate,
  tabRef,
}) {
  return (
    <li
      aria-selected={active}
      className={active ? activeClassName : inactiveClassName}
      id={accessibleId}
      onClick={onActivate}
      ref={tabRef}
      role="tab"
      tabIndex={active ? 0 : undefined}
    >
      {children}
    </li>
  );
}

Tab.propTypes = {
  accessibleId: PropTypes.string,
  active: PropTypes.bool,
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  inactiveClassName: PropTypes.string,
  onActivate: PropTypes.func,
  tabRef: PropTypes.object,
};

Tab.defaultProps = {
  accessibleId: undefined,
  active: false,
  activeClassName: undefined,
  inactiveClassName: undefined,
  onActivate: undefined,
  tabRef: undefined,
};
