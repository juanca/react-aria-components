import PropTypes from 'prop-types';
import React from 'react';

import GridCell from '../grid-cell.js';
import RefType from '../../prop-types/ref.js';
import styles from './input-cell.css';

export default class InputCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interactive: false,
      value: this.props.value,
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onClick() {
    this.setState({ interactive: true });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': return this.setState(state => ({ interactive: !state.interactive })); // eslint-disable-line max-len
      case 'Escape': return this.setState({ interactive: false });
      default: {
        if (this.state.interactive) event.stopPropagation();
        return undefined;
      }
    }
  }

  render() {
    return this.state.interactive ? (
      <GridCell active={this.props.active} cellRef={this.props.cellRef} className={this.props.className} interactive>{/* eslint-disable-line max-len */}
        {(active, cellRef) => (
          <input onChange={this.onChange} onKeyDown={this.onKeyDown} tabIndex={active ? 0 : -1} ref={cellRef} value={this.state.value} /> // eslint-disable-line max-len
        )}
      </GridCell>
    ) : (
      <GridCell active={this.props.active} cellRef={this.props.cellRef} className={this.props.className} onClick={this.onClick} onKeyDown={this.onKeyDown}>{/* eslint-disable-line max-len */}
        {() => (
          <React.Fragment>
            <span className={this.props.classNameText}>{this.state.value}</span>
            <svg className={this.props.classNameSVG} x="0px" y="0px" width="23px" height="23px" viewBox="0 0 512 512">{/* eslint-disable-line max-len */}
              <path fill="#333" d="M 422,176 c 0.5,-0.5,1,-1,1.5,-1.5 l 21,-21 c 13,-13,13,-34,0,-46.5 l -40,-40 c -12,-12,-33,-12,-46,0 l -21,21 c -0.5,0.5,-1,1,-1.5,1.5 L 422,176 z" />{/* eslint-disable-line max-len */}
              <polygon fill="#333" points="114,397 157,440 106,448 56,456 63,405 71,354" />{/* eslint-disable-line max-len */}
              <polygon fill="#111" points="349,125 118,355 106,343 336,113 324,100 81,343 168,430 411,187" />{/* eslint-disable-line max-len */}
            </svg>
          </React.Fragment>
        )}
      </GridCell>
    );
  }
}

InputCell.propTypes = {
  active: PropTypes.bool, // Part of implicit GridCell props from React.cloneElement
  cellRef: RefType.isRequired,
  className: PropTypes.string,
  classNameSVG: PropTypes.string,
  classNameText: PropTypes.string,
  value: PropTypes.string,
};

InputCell.defaultProps = {
  active: false,
  className: styles.container,
  classNameSVG: undefined,
  classNameText: undefined,
  value: '',
};
