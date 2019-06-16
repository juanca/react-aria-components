import PropTypes from 'prop-types';
import React from 'react';

import RefType from '../prop-types/ref.js';

export default class Option extends React.Component {
  componentDidMount() {
    if (this.props.active) {
      this.props.optionRef.current.focus();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active;
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.props.optionRef.current.focus();
    }
  }

  render() {
    return (
      <li
        className={this.props.className}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        tabIndex={this.props.active ? 0 : -1}
        ref={this.props.optionRef}
      >
        {this.props.children}{this.props.active ? '!' : ''}
      </li>
    );
  }
}

Option.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  optionRef: RefType.isRequired,
};

Option.defaultProps = {
  active: false,
  className: undefined,
};
