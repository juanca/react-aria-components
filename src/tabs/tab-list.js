import PropTypes from 'prop-types';
import React from 'react';
import Tab from './tab.js';
import styles from './tab-list.css';

export default class TabList extends React.Component {
  constructor(props) {
    super(props);

    const childrenCount = React.Children.count(props.children);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.tabRefs = new Array(childrenCount)
      .fill(0)
      .map(() => React.createRef());
    this.handlers = this.getHandlers(props.vertical);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.tabRefs[this.props.activeIndex].current.focus();
    }
  }

  getHandlers(vertical) {
    if (vertical) {
      return {
        ArrowDown: this.next.bind(this),
        ArrowUp: this.previous.bind(this),
      };
    }
    return {
      ArrowLeft: this.previous.bind(this),
      ArrowRight: this.next.bind(this),
    };
  }

  wrapIndex(index) {
    const count = React.Children.count(this.props.children);
    return (index + count) % count;
  }

  handleKeyPress(event) {
    const handler = this.handlers[event.key];
    if (handler) { handler(); }
  }

  previous() {
    const newIndex = this.wrapIndex(this.props.activeIndex - 1);
    this.props.onActivateTab(newIndex);
  }

  next() {
    const newIndex = this.wrapIndex(this.props.activeIndex + 1);
    this.props.onActivateTab(newIndex);
  }

  render() {
    const {
      accessibleId,
      activeIndex,
      children,
      className,
      onActivateTab,
    } = this.props;

    return (
      <ul className={className} onKeyUp={this.handleKeyPress} role="tablist">
        {React.Children.map(children, (child, index) => {
          if (child.type !== Tab) {
            throw new Error('Direct children of a <TabList> must be a <Tab>');
          }

          const active = index === activeIndex;
          const tabRef = this.tabRefs[index];

          return React.cloneElement(child, {
            accessibleId: active ? accessibleId : undefined,
            active,
            tabRef,
            onActivate: () => onActivateTab(index),
          });
        })}
      </ul>
    );
  }
}

TabList.propTypes = {
  accessibleId: PropTypes.string,
  activeIndex: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  onActivateTab: PropTypes.func,
  vertical: PropTypes.bool,
};

TabList.defaultProps = {
  accessibleId: undefined,
  activeIndex: 0,
  children: null,
  className: styles.container,
  onActivateTab: () => {},
  vertical: false,
};
