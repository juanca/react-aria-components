import PropTypes from 'prop-types';
import React from 'react';
import uniqueId from '@react-aria-components/core/src/unique-id';
import TabList from './tab-list';
import TabPanels from './tab-panels';

export default class Tabs extends React.Component {
  constructor() {
    super();
    this.accessibleId = uniqueId();
  }

  render() {
    const { activeIndex, children, className, onActivateTab } = this.props;
    const accessibleId = this.accessibleId;

    return (
      <div className={className}>
        {React.Children.map(children, (child) => {
          if (!child) { return child; }

          switch (child.type) {
            case TabList:
              return React.cloneElement(child, { accessibleId, activeIndex, onActivateTab });
            case TabPanels:
              return React.cloneElement(child, { accessibleId, activeIndex });
            default:
              return child;
          }
        })}
      </div>
    );
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onActivateTab: PropTypes.func,
};

Tabs.defaultProps = {
  children: null,
  className: undefined,
  onActivateTab: () => {},
};
