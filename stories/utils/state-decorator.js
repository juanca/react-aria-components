import PropTypes from 'prop-types';
import React from 'react';

export default class StateDecorator extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState;
    this.handleSetState = this.handleSetState.bind(this);
  }

  handleSetState(...args) {
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

StateDecorator.propTypes = {
  initialState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  storyFn: PropTypes.func.isRequired,
};

StateDecorator.defaultProps = {
  initialState: {},
};
