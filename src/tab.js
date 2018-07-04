import PropTypes from 'prop-types';
import React from 'react';
import styles from './tab.css';

const Tab = React.forwardRef(({
  accessibleId,
  active,
  children,
  className,
  onActivate,
}, ref) => {
  return (
    <li
      aria-selected={active}
      className={className}
      id={accessibleId}
      onClick={onActivate}
      ref={ref}
      role="tab"
      tabIndex={active ? 0 : undefined}
    >
      {children}
    </li>
  );
});

Tab.propTypes = {
  accessibleId: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onActivate: PropTypes.func,
};

Tab.defaultProps = {
  accessibleId: undefined,
  active: false,
  className: styles.container,
  onActivate: undefined,
};

export default Tab;
