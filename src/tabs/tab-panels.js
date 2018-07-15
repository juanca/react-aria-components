import PropTypes from 'prop-types';
import React from 'react';

export default function TabPanels({
  accessibleId,
  activeIndex,
  children,
  className,
  hasFocusableContent,
}) {
  return (
    <div
      aria-labelledby={accessibleId}
      role="tabpanel"
      className={className}
      tabIndex={hasFocusableContent ? undefined : 0}
    >
      {React.Children.toArray(children)[activeIndex]}
    </div>
  );
}

TabPanels.propTypes = {
  accessibleId: PropTypes.string,
  activeIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasFocusableContent: PropTypes.bool.isRequired,
};

TabPanels.defaultProps = {
  accessibleId: undefined,
  activeIndex: 0,
  className: null,
};
