import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.active) {
      this.nodeRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.nodeRef.current.focus();
    }
  }

  render() {
    const tabIndex = this.props.active ? 0 : -1;

    return (
      <span tabIndex={tabIndex} ref={this.nodeRef}>
        {this.props.active ? 'cell!' : 'cell'}
      </span>
    );
  }
}
