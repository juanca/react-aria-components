import PropTypes from 'prop-types';
import React from 'react';

let i = 0;
function counter() {
  i += 1;

  return i;
}

export default class EditableRowSelectablePosition extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.onChange = this.onChange.bind(this);

    this.state = {
      checked: false,
      id: `position-${counter()}`,
    };
  }

  onChange() {
    this.setState(state => ({ checked: !state.checked }));
  }

  render() {
    return (
      <React.Fragment>
        <label // eslint-disable-line jsx-a11y/label-has-for
          className={this.props.cssNonInteractive}
          htmlFor={this.state.id}
          style={{ display: this.props.interactive ? 'none' : 'block' }}
        >
          {this.props.defaultValue}
        </label>
        <input
          checked={this.state.checked}
          className={this.props.cssInteractive}
          hidden={!this.props.interactive}
          id={this.state.id}
          onChange={this.onChange}
          ref={this.inputRef}
          type="checkbox"
        />
      </React.Fragment>
    );
  }
}

EditableRowSelectablePosition.defaultProps = {
  cssNonInteractive: undefined,
  cssInteractive: undefined,
};

EditableRowSelectablePosition.propTypes = {
  cssNonInteractive: PropTypes.string,
  cssInteractive: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  interactive: PropTypes.bool.isRequired,
};
