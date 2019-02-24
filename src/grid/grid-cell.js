import React from 'react';

export default class GridCell extends React.Component {
  componentDidMount() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active;
  }

  componentDidUpdate() {
    if (this.props.active) {
      this.props.cellRef.current.focus();
    }
  }

  render() {
    const tabIndex = this.props.active ? 0 : -1;

    return (
      <div tabIndex={tabIndex} ref={this.props.cellRef}>
        {this.props.children(this.props.active)}
      </div>
    );
  }
}
