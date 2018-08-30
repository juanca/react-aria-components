import PropTypes from 'prop-types';
import React from 'react';

export default class SelectablePosition extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.interactive) {
      this.inputRef.current.focus();
    }
  }

  static onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        // event.stopPropagation();
        break;
      default:
    }
  }

  render() {
    const position = (
      <div role="checkbox" aria-checked="false">{this.props.defaultValue}</div>
    );

    const checkbox = (
      <label htmlFor="ham">
        <span>Ham</span>
        <input
          id="ham"
          type="checkbox"
          name="toppings"
          onKeyDown={SelectablePosition.onKeyDown}
          ref={this.inputRef}
          value="ham"
        />
      </label>
    );

    return this.props.interactive ? checkbox : position;
  }
}

SelectablePosition.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};
