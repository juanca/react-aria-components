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
      value: props.defaultValue,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate(props, state) {
    if (this.state.interactive) {
      this.inputRef.current.focus();
    }

    if (state.interactive && !this.state.interactive) {
      this.props.gridCellRef.current.focus();
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
        this.setState(state => ({ interactive: !state.interactive }));
        break;
      }
      case 'Escape': {
        this.setState({ interactive: false });
        break;
      }
      default: {
        // Do not use keyboard navigation while interactive
        if (this.state.interactive) {
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
        onBlur={this.onBlur}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {this.state.interactive
          ? (
            <input
              defaultValue={this.state.value}
              onChange={this.onChange}
              ref={this.inputRef}
            />
          )
          : this.state.value}
      </GridCell>
    );
  }
}

FancyInputGridCell.defaultProps = {
};

FancyInputGridCell.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  gridCellRef: RefType.isRequired,
};

export default function FocusableFancyInputGridCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => <FancyInputGridCell {...props} gridCellRef={gridRefs[idY][idX]} />}
    </GridContext.Consumer>
  );
}

FocusableFancyInputGridCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
