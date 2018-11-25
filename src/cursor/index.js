import React from 'react';

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: -1,
      positionY: -1,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  handleKey(event, updater) {
    event.preventDefault();
    this.setState(updater);
  }

  onClick(event) {
    let x, y;
    y = this.props.refs.findIndex(cellRefs => {
      x = cellRefs.findIndex(cellRef => (
        cellRef.current.contains(event.target)
      ))
      return x !== -1;
    });

    if (x !== -1 && y !== -1) {
      this.setState({
        positionX: x,
        positionY: y,
      });
    }
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown': return this.handleKey(event, state => ({
        positionX: state.positionX === -1 ? 0 : state.positionX,
        positionY: Math.min(state.positionY + 1, this.props.refs.length - 1),
      }));
      case 'ArrowLeft': return this.handleKey(event, state => ({
        positionX: Math.max(state.positionX - 1, 0),
        positionY: state.positionY === -1 ? 0 : state.positionY,
      }));
      case 'ArrowRight': return this.handleKey(event, state => ({
        positionX: Math.min(state.positionX + 1, this.props.refs[0].length - 1),
        positionY: state.positionY === -1 ? 0 : state.positionY,
      }));
      case 'ArrowUp': return this.handleKey(event, state => ({
        positionX: state.positionX === -1 ? 0 : state.positionX,
        positionY: Math.max(state.positionY - 1, 0),
      }));
      case 'End': return this.handleKey(event, state => ({
        positionX: this.props.refs[0].length - 1,
        positionY: state.positionY === -1 ? 0 : state.positionY,
      }));
      case 'Home': return this.handleKey(event, state => ({
        positionX: 0,
        positionY: state.positionY === -1 ? 0 : state.positionY,
      }));
      case 'PageDown': return this.handleKey(event, state => ({
        positionX: state.positionX === -1 ? 0 : state.positionX,
        positionY: this.props.refs.length - 1,
      }));
      case 'PageUp': return this.handleKey(event, state => ({
        positionX: state.positionX === -1 ? 0 : state.positionX,
        positionY: 0,
      }));
      default:
    }
  }

  render() {
    const tabIndex = this.state.positionY === -1 ? 0 : -1;

    return (
      <div onClick={this.onClick} onKeyDown={this.onKeyDown} tabIndex={tabIndex}>
        {this.props.children(this.state.positionX, this.state.positionY)}
      </div>
    );
  }
};
