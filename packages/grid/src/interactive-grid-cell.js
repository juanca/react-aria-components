import PropTypes from 'prop-types';
import React from 'react';
import RefType from '@react-aria-components/core/src/prop-types/ref.js';

import GridCell from './grid-cell.js';
import GridContext from './grid-context.js';

class InteractiveGridCell extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      interactive: false,
    };
  }

  componentDidUpdate(props, state) {
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
        {this.props.children(this.state.interactive)}
      </GridCell>
    );
  }
}

InteractiveGridCell.defaultProps = {
};

InteractiveGridCell.propTypes = {
  children: PropTypes.func.isRequired,
  gridCellRef: RefType.isRequired,
};

export default function FocusableInteractiveGridCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => <InteractiveGridCell {...props} gridCellRef={gridRefs[idY][idX]} />}
    </GridContext.Consumer>
  );
}

FocusableInteractiveGridCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
