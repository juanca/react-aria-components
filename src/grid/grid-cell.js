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
    return (
      <span ref={this.nodeRef}>
        {this.props.active ? 'cell!' : 'cell'}
      </span>
    );
  }
}
