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

  render() {
    const position = (
      <div className={this.props.cssNonInteractive} role="checkbox" aria-checked="false">{this.props.defaultValue}</div>
    );

    const checkbox = (
      <label className={this.props.cssInteractive} htmlFor="selected">
        <input
          id="selected"
          type="checkbox"
          name="toppings"
          ref={this.inputRef}
          value="selected"
        />
      </label>
    );

    return this.props.interactive ? checkbox : position;
  }
}

SelectablePosition.defaultProps = {
  cssNonInteractive: undefined,
  cssInteractive: undefined,
};

SelectablePosition.propTypes = {
  cssNonInteractive: PropTypes.string,
  cssInteractive: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};
