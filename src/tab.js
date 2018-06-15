import PropTypes from 'prop-types';
import React from 'react';

export default function Tab({
  accessibleId,
  active,
  activeClassName,
  children,
  focus,
  inactiveClassName,
  onActivate,
}) {
  return (
    <li
      aria-selected={active}
      className={active ? activeClassName : inactiveClassName}
      id={accessibleId}
      onClick={onActivate}
      ref={el => focus && el && el.focus()}
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
  focus: PropTypes.bool,
  inactiveClassName: PropTypes.string,
  onActivate: PropTypes.func,
};

Tab.defaultProps = {
  accessibleId: undefined,
  active: false,
  activeClassName: undefined,
  focus: false,
  inactiveClassName: undefined,
  onActivate: undefined,
};
