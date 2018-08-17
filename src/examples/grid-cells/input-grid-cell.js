import PropTypes from 'prop-types';
import React from 'react';

export default class InputGridCell extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      lastValue: props.defaultValue, // eslint-disable-line react/no-unused-state
      value: props.defaultValue,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {
    if (this.props.interactive) {
      this.inputRef.current.focus();
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': {
        this.setState(state => ({
          lastValue: state.value,
        }));

        break;
      }
      case 'Escape': {
        this.setState(state => ({
          value: state.lastValue,
        }));

        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return this.props.interactive
      ? (
        <input
          defaultValue={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref={this.inputRef}
        />
      )
      : this.state.value;
  }
}

InputGridCell.defaultProps = {};

InputGridCell.propTypes = {
  interactive: PropTypes.bool.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
