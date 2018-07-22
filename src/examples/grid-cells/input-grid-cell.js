import PropTypes from 'prop-types';
import React from 'react';

export default class InputGridCell extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      value: props.defaultValue,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    if (this.props.interactive) {
      this.inputRef.current.focus();
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return this.props.interactive
      ? (
        <input
          defaultValue={this.state.value}
          onChange={this.onChange}
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
