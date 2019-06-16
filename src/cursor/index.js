import PropTypes from 'prop-types';
import React from 'react';

import RefType from '../prop-types/ref.js';

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

  onClick(event) {
    let x;

    const y = this.props.refs.findIndex((cellRefs) => {
      x = cellRefs.findIndex(cellRef => (
        cellRef.current.contains(event.target)
      ));

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

    return undefined;
  }

  handleKey(event, updater) {
    event.preventDefault();
    this.setState(updater);
  }

  render() {
    const tabIndex = this.state.positionY === -1 ? 0 : -1;
    const ElementType = this.props.dimensions === 1 ? 'ul' : 'div';

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <ElementType
        className={this.props.className}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        ref={this.props.containerRef}
        role={this.props.role}
        tabIndex={tabIndex}
      >
        {this.props.children(this.state.positionX, this.state.positionY)}
      </ElementType>
    );
  }
}

Cursor.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  containerRef: RefType,
  dimensions: PropTypes.number,
  refs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
  role: PropTypes.string,
};

Cursor.defaultProps = {
  className: undefined,
  containerRef: undefined,
  dimensions: 2,
  role: 'presentation',
};
