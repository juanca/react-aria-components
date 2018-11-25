import React from 'react';

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: -1,
      positionY: -1,
    };

    this.keyHandlers = {
      ArrowDown: function(event) {
        event.preventDefault();
        this.setState(state => ({
          positionY: state.positionY + 1,
        }));
      }.bind(this),
      ArrowLeft: function(event) {
        event.preventDefault();
        this.setState(state => ({
          positionX: state.positionX - 1,
        }));
      }.bind(this),
      ArrowRight: function(event) {
        event.preventDefault();
        this.setState(state => ({
          positionX: state.positionX + 1,
        }));
      }.bind(this),
      ArrowUp: function(event) {
        event.preventDefault();
        this.setState(state => ({
          positionY: state.positionY - 1,
        }));
      }.bind(this),
    }

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown': return this.keyHandlers.ArrowDown(event);
      case 'ArrowLeft': return this.keyHandlers.ArrowLeft(event);
      case 'ArrowRight': return this.keyHandlers.ArrowRight(event);
      case 'ArrowUp': return this.keyHandlers.ArrowUp(event);
      default:
    }
  }

  render() {
    const tabIndex = this.state.positionY === -1 ? 0 : -1;

    return (
      <div onKeyDown={this.onKeyDown} tabIndex={tabIndex}>
        {this.props.children(this.state.positionX, this.state.positionY)}
      </div>
    );
  }
};
