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
      lastValue: props.defaultValue, // eslint-disable-line react/no-unused-state
      value: props.defaultValue,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.active && !prevProps.interactive && this.props.interactive) {
      this.inputRef.current.focus();
      setTimeout(() => this.inputRef.current && this.inputRef.current.select(), 0);
    }
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': {
        this.setState(state => ({
          lastValue: state.value,
        }));

        break;
      }
      case 'Escape': {
        if (this.props.interactive) {
          this.setState(state => ({
            value: state.lastValue,
          }));
        }

        break;
      }
      default: {
        if (this.props.interactive && /Arrow/.test(event.key)) {
          // Do not use grid keyboard navigation while interactive
          event.stopPropagation();
        }

        if (!this.props.interactive && event.key.length === 1) {
          // Seems like the actual key will emitted on the input as well!
          // We only need to wipe it out and enter interactive mode.
          this.setState({
            value: '',
          });
        } else if (!this.props.interactive && event.key === 'Backspace') {
          this.setState({
            value: '',
          });
        }
      }
    }
  }

  render() {
    return (
      <GridCell
        {...this.props}
        className={this.props.cssContainer}
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
