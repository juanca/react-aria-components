import PropTypes from 'prop-types';
import React from 'react';

export default function TabPanels({ accessibleId, activeIndex, children, className }) {
  return (
    <div
      aria-labelledby={accessibleId}
      role="tabpanel"
      className={className}
    >
      {React.Children.toArray(children)[activeIndex]}
    </div>
  );
}

TabPanels.propTypes = {
  accessibleId: PropTypes.string,
  activeIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
};

TabPanels.defaultProps = {
  accessibleId: undefined,
  activeIndex: 0,
  className: null,
};
