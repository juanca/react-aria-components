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

  componentDidUpdate(prevProps) {
    if (!prevProps.interactive && this.props.interactive) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
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
          className={this.props.cssInteractive}
          defaultValue={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref={this.inputRef}
        />
      )
      : (
        <div className={this.props.cssNonInteractive}>
          {this.state.value}
        </div>
      );
  }
}

InputGridCell.defaultProps = {
  cssNonInteractive: undefined,
  cssInteractive: undefined,
};

InputGridCell.propTypes = {
  cssNonInteractive: PropTypes.string,
  cssInteractive: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};
