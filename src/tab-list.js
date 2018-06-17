import PropTypes from 'prop-types';
import React from 'react';

export default class TabList extends React.Component {
  constructor() {
    super();
    this.state = { focus: false };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlers = {
      ArrowLeft: this.previous.bind(this),
      ArrowRight: this.next.bind(this),
    };
  }

  wrapIndex(index) {
    const count = React.Children.count(this.props.children);
    return (index + count) % count;
  }

  handleBlur() {
    this.setState({ focus: false });
  }

  handleKeyPress(event) {
    const handler = this.handlers[event.key] || (() => {});
    handler();
  }

  previous() {
    const newIndex = this.wrapIndex(this.props.activeIndex - 1);
    this.setState({ focus: true });
    this.props.onActivateTab(newIndex)
  }

  next() {
    const newIndex = this.wrapIndex(this.props.activeIndex + 1);
    this.setState({ focus: true });
    this.props.onActivateTab(newIndex)
  }

  render() {
    const { accessibleId, activeIndex, children, className, onActivateTab } = this.props;

    return (
      <ul className={className} onBlur={this.handleBlur} onKeyUp={this.handleKeyPress} role="tablist">
        {React.Children.map(children, (child, index) => {
          const active = index === activeIndex;

          return React.cloneElement(child, {
            accessibleId: active ? accessibleId : undefined,
            active,
            focus: active && this.state.focus,
            onActivate: () => this.props.onActivateTab(index),
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
};

TabList.defaultProps = {
  accessibleId: undefined,
  activeIndex: 0,
  children: null,
  className: undefined,
  onActivateTab: () => {},
};
