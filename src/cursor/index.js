import React from 'react';

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: -1,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft': return this.setState(state => ({
        position: state.position - 1,
      }));
      case 'ArrowRight': return this.setState(state => ({
        position: state.position + 1,
      }));
      default:
    }
  }

  render() {
    return (
      <div onKeyDown={this.onKeyDown} tabIndex="0">
        {this.props.children(this.state.position)}
      </div>
    );
  }
};
