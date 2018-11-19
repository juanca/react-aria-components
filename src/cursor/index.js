import React from 'react';

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: -1,
      positionY: -1,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown': return this.setState(state => ({
        positionY: state.positionY + 1,
      }));
      case 'ArrowLeft': return this.setState(state => ({
        positionX: state.positionX - 1,
      }));
      case 'ArrowRight': return this.setState(state => ({
        positionX: state.positionX + 1,
      }));
      case 'ArrowUp': return this.setState(state => ({
        positionY: state.positionY - 1,
      }));
      default:
    }
  }

  render() {
    return (
      <div onKeyDown={this.onKeyDown} tabIndex="0">
        {this.props.children(this.state.positionX, this.state.positionY)}
      </div>
    );
  }
};
