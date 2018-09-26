import PropTypes from 'prop-types';
import React from 'react';

import GridCell from '../../grid/grid-cell.js';
import GridContext from '../../grid/grid-context.js';
import RefType from '../../prop-types/ref.js';

class EditableRowInputCell extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      value: props.defaultValue,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.interactive && this.props.interactive) {
      this.inputRef.current.focus();
      setTimeout(() => this.inputRef.current && this.inputRef.current.select(), 0);
    }
  }

  onBlur(event) { // eslint-disable-line
  }

  onChange(event) { // eslint-disable-line
  }

  onClick() { // eslint-disable-line
  }

  onFocus(event) {
    console.log('cell onFocus', 'interactive', this.props.interactive, event.target, event.relatedTarget);
  }

  onKeyDown(event) { // eslint-disable-line
  }

  render() {
    return (
      <GridCell
        {...this.props}
        className={this.props.cssContainer}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
      >
        {this.props.interactive
          ? (
            <input
              className={this.props.cssInteractive}
              defaultValue={this.state.value}
              onChange={this.onChange}
              ref={this.inputRef}
            />
          )
          : (
            <div className={this.props.cssNonInteractive}>
              {this.state.value}
            </div>
          )}
      </GridCell>
    );
  }
}

EditableRowInputCell.defaultProps = {
};

EditableRowInputCell.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  gridCellRef: RefType.isRequired,
  minusX: RefType.isRequired,
  plusX: RefType.isRequired,
};

function getMinusX(refs, x, y) {
  return refs[y][Math.max(x - 1, 0)];
}

function getPlusX(refs, x, y) {
  return refs[y][Math.min(x + 1, refs[0].length - 1)];
}

export default function FocusableEditableRowInputCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => (
        <EditableRowInputCell
          {...props}
          gridCellRefs={gridRefs}
          gridCellRef={gridRefs[idY][idX]}
          minusX={getMinusX(gridRefs, idX, idY)}
          plusX={getPlusX(gridRefs, idX, idY)}
        />
      )}
    </GridContext.Consumer>
  );
}

FocusableEditableRowInputCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
