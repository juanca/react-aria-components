import PropTypes from 'prop-types';
import React from 'react';

export default class StateDecorator extends React.Component {
  static propTypes = {
    initialState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    storyFn: PropTypes.func.isRequired,
  };

  static defaultProps = {
    initialState: {},
  };

  state = this.props.initialState;

  handleSetState = (...args) => {
    this.setState(...args);
  }

  render() {
    const { storyFn } = this.props;
    return storyFn({
      state: this.state,
      setState: this.handleSetState,
    });
  }
}
