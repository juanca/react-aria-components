import PropTypes from 'prop-types';
import React from 'react';

import RefType from '../prop-types/ref.js';

export default class Option extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.active) {
      this.props.optionRef.current.focus();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active || this.props.selected !== nextProps.selected;
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.props.optionRef.current.focus();
    }
  }

  onClick() {
    if (this.props.selected) {
      this.props.onDeselect(this.props.optionRef);
    } else {
      this.props.onSelect(this.props.optionRef);
    }
  }

  onKeyDown(event) {
    if (event.key !== ' ') return;

    event.preventDefault();

    if (this.props.selected) {
      this.props.onDeselect(this.props.optionRef);
    } else {
      this.props.onSelect(this.props.optionRef);
    }
  }

  render() {
    return (
      <li
        aria-selected={this.props.selected}
        className={this.props.className}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        tabIndex={this.props.active ? 0 : -1}
        ref={this.props.optionRef}
        role="option"
      >
        {this.props.children}
      </li>
    );
  }
}

Option.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  optionRef: RefType.isRequired,
  selected: PropTypes.bool,
};

Option.defaultProps = {
  active: false,
  className: undefined,
  selected: false,
};
