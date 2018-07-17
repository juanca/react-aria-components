import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import RefType from '../prop-types/ref.js';

import styles from './grid-cell.css';

class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    // This state might have to be hoisted to allow a wrapping cell to force interative state
    // e.g. active input cell should go into interactive mode on a-zA-Z key press.
    this.state = {
      interactive: false,
      tabIndex: -1,
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

    const focusWithinGrid = this.props.gridCellRefs.some(rows => (
      rows.some(cellRef => cellRef.current === event.relatedTarget) // `relatedTarget` is not supported in IE 11 :( https://github.com/facebook/react/issues/3751
    ));
    if (focusWithinGrid) this.setState({ tabIndex: -1 });

    this.setState({ interactive: false });
  }

  onClick() {
    this.setState({ interactive: true });
  }

  onFocus() {
    this.setState({ tabIndex: 0 });
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
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={this.props.className}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        ref={this.props.gridCellRef}
        role={this.props.role}
        tabIndex={this.state.tabIndex}
      >
        {this.props.children(this.state.interactive)}
      </div>
    );
  }
}

GridCell.defaultProps = {
  className: styles.container,
  role: 'gridcell',
};

GridCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.func.isRequired,
  gridCellRef: RefType.isRequired,
  gridCellRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
  role: PropTypes.oneOf(['columnheader', 'gridcell']),
};

export default function FocusableGridCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => <GridCell {...props} gridCellRefs={gridRefs} gridCellRef={gridRefs[idY][idX]} />}
    </GridContext.Consumer>
  );
}

FocusableGridCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
