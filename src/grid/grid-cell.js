import React from 'react';

export default class GridCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  render() {
    const tabIndex = this.props.active ? 0 : -1;

    return (
      <span tabIndex={tabIndex} ref={this.props.cellRef}>
        {this.props.active ? 'cell!' : 'cell'}
      </span>
    );
  }
}
