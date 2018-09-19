import PropTypes from 'prop-types';
import React from 'react';

import GridCell from '../../grid/grid-cell.js';
import GridContext from '../../grid/grid-context.js';
import RefType from '../../prop-types/ref.js';

class FancyInputGridCell extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      interactive: false,
      lastValue: props.defaultValue, // eslint-disable-line react/no-unused-state
      value: props.defaultValue,
      wasTabbed: false,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.interactive) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }

    if (prevState.interactive && !this.state.interactive && !this.state.wasTabbed) {
      this.props.gridCellRef.current.focus();
    }

    if (this.state.wasTabbed) {
      // Immediately unset the tab flag to avoid infinite updates.
      // The flag should only ever be set in one place -- interactive mode + tab press.
      this.setState({ wasTabbed: false }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  onBlur(event) {
    const focusWithinCell = this.props.gridCellRef.current === event.relatedTarget
      || this.props.gridCellRef.current.contains(event.relatedTarget);
    if (focusWithinCell) return;

    this.setState({ interactive: false });
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onClick() {
    this.setState({ interactive: true });
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': {
        if (this.state.interactive) {
          this.setState(state => ({
            lastValue: state.value,
            interactive: false,
          }));
        } else {
          this.setState({
            interactive: true,
          });
        }

        break;
      }
      case 'Escape': {
        this.setState(state => ({
          interactive: false,
          value: state.lastValue,
        }));

        break;
      }
      case 'Tab': {
        if (this.state.interactive) {
          const nextCell = event.shiftKey ? this.props.minusX : this.props.plusX;

          if (nextCell === this.props.gridCellRef) {
            this.setState({
              interactive: false,
              wasTabbed: true,
            });
          } else {
            this.setState({
              interactive: false,
              wasTabbed: true,
            });
            nextCell.current.focus();
          }

          event.preventDefault();
        }

        break;
      }
      default: {
        if (this.state.interactive && /Arrow/.test(event.key)) {
          // Do not use grid keyboard navigation while interactive
          event.stopPropagation();
        }

        if (event.key.length === 1) {
          // Seems like the actual key will emitted on the input as well!
          // We only need to wipe it out and enter interactive mode.
          this.setState({
            value: '',
            interactive: true,
          });
        } else if (event.key === 'Backspace') {
          this.setState({
            value: '',
            interactive: true,
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
        onBlur={this.onBlur}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {this.state.interactive
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

FancyInputGridCell.defaultProps = {
};

FancyInputGridCell.propTypes = {
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

export default function FocusableFancyInputGridCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => (
        <FancyInputGridCell
          {...props}
          gridCellRef={gridRefs[idY][idX]}
          minusX={getMinusX(gridRefs, idX, idY)}
          plusX={getPlusX(gridRefs, idX, idY)}
        />
      )}
    </GridContext.Consumer>
  );
}

FocusableFancyInputGridCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
