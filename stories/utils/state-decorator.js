import PropTypes from 'prop-types';
import React from 'react';

export default class StateDecorator extends React.Component {
  static propTypes = {
    storyFn: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { storyFn } = this.props;
    return storyFn({
      state: this.state,
      setState: this.setState.bind(this),
    });
  }
}
