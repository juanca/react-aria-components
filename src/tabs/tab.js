import PropTypes from 'prop-types';
import React from 'react';
import styles from './tab.css';

export default function Tab({
  accessibleId,
  active,
  children,
  className,
  onActivate,
  tabRef,
}) {
  return (
    <li
      aria-selected={active}
      className={className}
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
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onActivate: PropTypes.func,
  tabRef: PropTypes.object,
};

Tab.defaultProps = {
  accessibleId: undefined,
  active: false,
  className: styles.container,
  onActivate: undefined,
  tabRef: undefined,
};
